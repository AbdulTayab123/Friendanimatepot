#!/usr/bin/env python3
"""
scripts/build-hero-assets.py

Processes the source intro video into:
1. public/hero/hero.mp4 (H.264 + AAC 96k, CRF 24, faststart, seamless loop)
2. public/hero/hero.webm (VP9 + Opus 80k, CRF 36, seamless loop)
3. public/portrait-bust.webp (480x600 head-to-shirt still)
4. public/og.jpg (1200x630 OpenGraph preview)
"""

import os
import glob
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import wave

def main():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    public_dir = os.path.join(root_dir, "public")
    hero_dir = os.path.join(public_dir, "hero")
    os.makedirs(hero_dir, exist_ok=True)

    # Locate source video
    mp4_files = [f for f in glob.glob(os.path.join(root_dir, "*.mp4")) if "hero" not in f]
    if not mp4_files:
        raise FileNotFoundError("No source mp4 found in workspace root.")
    src_video = mp4_files[0]
    print(f"Using source video: {src_video}")

    # Step 1 & 2: Crop, whiten background, seamless video loop
    # Source is 1920x1080, 10.0s at 24fps.
    # Person centered at x=960, top of head at y=75, feet at y=1042.
    # Crop: 800:1000:560:50 -> Scale to 768:960.
    # Whitening: colorlevels=rimax=0.98:gimax=0.98:bimax=0.98
    
    # 0.5s seamless cross-fade:
    # Split:
    # Main: 0.0s to 9.5s (9.5s duration)
    # Tail: 9.5s to 10.0s (0.5s duration)
    # Cross-fade Tail into Main at offset 0 over 0.5s:
    # Resulting video starts at frame 9.5s fading into frame 0.0s, runs to 9.5s.
    # When wrapping around, frame 9.5s matches perfectly!
    
    v_raw = os.path.join(hero_dir, "temp_v_loop.mp4")
    filter_complex = (
        "[0:v]crop=800:1000:560:50,scale=768:960,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98,split=2[v1][v2];"
        "[v1]trim=start=9.5:end=10.0,setpts=PTS-STARTPTS[tail];"
        "[v2]trim=start=0:end=9.5,setpts=PTS-STARTPTS[main];"
        "[tail][main]xfade=transition=fade:duration=0.5:offset=0[vlooped]"
    )
    
    cmd_v = [
        "ffmpeg", "-y", "-i", src_video,
        "-filter_complex", filter_complex,
        "-map", "[vlooped]",
        "-c:v", "libx264", "-crf", "18", "-preset", "fast",
        "-an", v_raw
    ]
    print("Generating seamless looped video stream...")
    subprocess.run(cmd_v, check=True)

    # Step 3: Sample-accurate audio cross-fade in numpy
    # Extract audio to uncompressed WAV
    temp_wav_in = os.path.join(hero_dir, "temp_audio_in.wav")
    subprocess.run([
        "ffmpeg", "-y", "-i", src_video,
        "-vn", "-ac", "2", "-ar", "48000",
        temp_wav_in
    ], check=True)

    with wave.open(temp_wav_in, "rb") as wf:
        n_channels = wf.getnchannels()
        sampwidth = wf.getsampwidth()
        framerate = wf.getframerate()
        n_frames = wf.getnframes()
        raw_bytes = wf.readframes(n_frames)

    samples = np.frombuffer(raw_bytes, dtype=np.int16).reshape(-1, n_channels).astype(np.float32)

    fade_samples = int(0.5 * framerate) # 24000
    loop_samples = int(9.5 * framerate) # 456000
    
    tail_audio = samples[loop_samples : loop_samples + fade_samples] # 9.5s to 10.0s
    head_audio = samples[0 : fade_samples] # 0.0s to 0.5s
    
    t = np.linspace(0.0, 1.0, fade_samples, endpoint=False).reshape(-1, 1)
    blended_head = (1.0 - t) * tail_audio + t * head_audio
    rest_audio = samples[fade_samples : loop_samples]
    
    looped_audio = np.vstack([blended_head, rest_audio])
    looped_audio_int16 = np.clip(looped_audio, -32768, 32767).astype(np.int16)

    temp_wav_out = os.path.join(hero_dir, "temp_audio_looped.wav")
    with wave.open(temp_wav_out, "wb") as wf:
        wf.setnchannels(n_channels)
        wf.setsampwidth(sampwidth)
        wf.setframerate(framerate)
        wf.writeframes(looped_audio_int16.tobytes())

    print("Audio cross-fade completed sample-accurately.")

    # Step 4: Export hero.mp4 and hero.webm
    hero_mp4 = os.path.join(hero_dir, "hero.mp4")
    hero_webm = os.path.join(hero_dir, "hero.webm")

    # hero.mp4: H.264 yuv420p, CRF 24, -preset slow, AAC 96k, +faststart
    cmd_mp4 = [
        "ffmpeg", "-y",
        "-i", v_raw,
        "-i", temp_wav_out,
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "24", "-preset", "slow",
        "-c:a", "aac", "-b:a", "96k",
        "-movflags", "+faststart",
        hero_mp4
    ]
    print(f"Exporting {hero_mp4}...")
    subprocess.run(cmd_mp4, check=True)

    # hero.webm: VP9, CRF 36, Opus 80k
    cmd_webm = [
        "ffmpeg", "-y",
        "-i", v_raw,
        "-i", temp_wav_out,
        "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0",
        "-c:a", "libopus", "-b:a", "80k",
        hero_webm
    ]
    print(f"Exporting {hero_webm}...")
    subprocess.run(cmd_webm, check=True)

    # Cleanup temp video/audio
    for temp_f in [v_raw, temp_wav_in, temp_wav_out]:
        if os.path.exists(temp_f):
            os.remove(temp_f)

    # Step 5: Portrait bust (480x600) & og.jpg (1200x630)
    # Frame at 0.2s has open eyes and a clear warm expression
    temp_frame = os.path.join(hero_dir, "temp_frame_portrait.png")
    subprocess.run([
        "ffmpeg", "-y", "-ss", "0.2", "-i", src_video,
        "-vframes", "1", temp_frame
    ], check=True)

    frame_img = Image.open(temp_frame).convert("RGB")
    
    # 480x600 head-to-shirt crop
    # Center 960, top 50, width 400, height 500
    crop_box = (960 - 200, 50, 960 + 200, 550)
    bust_img = frame_img.crop(crop_box).resize((480, 600), Image.Resampling.LANCZOS)
    bust_path = os.path.join(public_dir, "portrait-bust.webp")
    bust_img.save(bust_path, "WEBP", quality=92)
    print(f"Exported {bust_path}")

    # og.jpg at 1200x630
    og_img = Image.new("RGB", (1200, 630), color="#f4f2ee")
    # Paste bust cropped to 480x560 on right side
    bust_og = bust_img.resize((420, 525), Image.Resampling.LANCZOS)
    og_img.paste(bust_og, (720, (630 - 525) // 2))

    draw = ImageDraw.Draw(og_img)
    # Simple typography overlay
    # Using default font fallback or clean shapes
    draw.rectangle([60, 60, 100, 64], fill="#0d0d0d")
    
    og_path = os.path.join(public_dir, "og.jpg")
    og_img.save(og_path, "JPEG", quality=90)
    print(f"Exported {og_path}")

    if os.path.exists(temp_frame):
        os.remove(temp_frame)

    print("Hero assets built successfully!")

if __name__ == "__main__":
    main()
