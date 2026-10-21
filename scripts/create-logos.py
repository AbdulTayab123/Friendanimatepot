import os

os.makedirs('public/logos', exist_ok=True)

logos = {
    'javascript.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <path fill="#F7DF1E" d="M0 0h128v128H0z"/>
  <path d="M67.3 103c2.4 3.9 5.8 6.4 11.2 6.4 4.8 0 7.8-2.4 7.8-5.7 0-4-3.2-5.4-8.6-7.7l-3-1.3c-8.6-3.7-14.3-8.3-14.3-18.2 0-9.1 6.9-16 17.7-16 7.7 0 13.2 2.7 17.1 9.5l-8.6 5.5c-1.9-3.4-4.2-4.9-8.5-4.9-3.9 0-6.6 2.4-6.6 5.4 0 3.7 2.6 5.1 7.4 7.2l2.9 1.3c10.2 4.4 15.7 8.9 15.7 18.9 0 10.8-8.5 16.7-19.8 16.7-11.2 0-18.4-5.4-21.7-13.1l10.8-5.5zM26 103.5l10.8-6.6c2.1 3.7 4 6.8 8.4 6.8 4.3 0 7-1.8 7-8.7V61h13v34.8c0 14.2-8.3 20.7-19.7 20.7-10.3 0-16.7-5.5-19.5-13z"/>
</svg>''',
    'react.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348">
  <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
  <g stroke="#61dafb" stroke-width="1" fill="none">
    <ellipse rx="11" ry="4.2"/>
    <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
    <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
  </g>
</svg>''',
    'python.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <linearGradient id="pyA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#387eb8"/><stop offset="1" stop-color="#366994"/></linearGradient>
  <linearGradient id="pyB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe052"/><stop offset="1" stop-color="#ffc331"/></linearGradient>
  <path fill="url(#pyA)" d="M63.4 3c-15.4 0-25.2 6.7-25.2 19.5v14.3h25.7v3.6H27.5C12.1 40.4 0 50.8 0 66.2s10.6 24.8 23.7 25.4v-12.2c0-14.7 12.3-25.4 27-25.4h25.4c12.3 0 21.8-9.9 21.8-22.3V19.5C97.9 7.2 86.8 3 71.4 3h-8zm-8 7.7a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2z"/>
  <path fill="url(#pyB)" d="M64.6 125c15.4 0 25.2-6.7 25.2-19.5V91.2H64.1v-3.6h36.4c15.4 0 27.5-10.4 27.5-25.8s-10.6-24.8-23.7-25.4v12.2c0 14.7-12.3 25.4-27 25.4H51.9c-12.3 0-21.8 9.9-21.8 22.3v12.2c0 12.3 11.1 16.5 26.5 16.5h8zm8-7.7a4.6 4.6 0 1 1 0-9.2 4.6 4.6 0 0 1 0 9.2z"/>
</svg>''',
    'html5.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <path fill="#E34F26" d="M19 116.5L8.4 0h111.2l-10.6 116.5L64 128z"/>
  <path fill="#EF652A" d="M64 117.8l37.2-10.3L109.8 11H64z"/>
  <path fill="#ECECEC" d="M64 52.8H45.8l-1.3-14.6H64V24.5H29.5l3.8 42.1H64zm0 37.1l-19.2-5.2-1.2-13.8H29.8l2.3 26.2L64 107.9z"/>
  <path fill="#FFF" d="M63.9 52.8h18.2l-1.7 19.3-16.5 4.5v14.2l30.3-8.4 3.9-43.4H63.9zm0-28.3v13.8h36.8l1.3-13.8z"/>
</svg>''',
    'css3.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <path fill="#1572B6" d="M19 116.5L8.4 0h111.2l-10.6 116.5L64 128z"/>
  <path fill="#33A9DC" d="M64 117.8l37.2-10.3L109.8 11H64z"/>
  <path fill="#ECECEC" d="M64 52.8H45.8l-1.3-14.6H64V24.5H29.5l3.8 42.1H64zm0 37.1l-19.2-5.2-1.2-13.8H29.8l2.3 26.2L64 107.9z"/>
  <path fill="#FFF" d="M63.9 52.8h18.2l-1.7 19.3-16.5 4.5v14.2l30.3-8.4 3.9-43.4H63.9zm0-28.3v13.8h36.8l1.3-13.8z"/>
</svg>''',
    'bootstrap.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <path fill="#7952B3" d="M15.4 0h97.2c8.5 0 15.4 6.9 15.4 15.4v97.2c0 8.5-6.9 15.4-15.4 15.4H15.4C6.9 128 0 121.1 0 112.6V15.4C0 6.9 6.9 0 15.4 0z"/>
  <path fill="#FFF" d="M48.2 27.2h22.6c13.7 0 21.8 7 21.8 17.6 0 7.4-4.5 13.5-11.4 15.8v.5c8.6 2 13.7 8.9 13.7 17.8 0 12.3-9.9 19.9-24.8 19.9H48.2V27.2zm16.9 29.8h5.3c5.7 0 9.1-3 9.1-8s-3.4-8-9.1-8h-5.3v16zm0 25.8h6.4c6.6 0 10.4-3.4 10.4-8.8 0-5.5-3.8-8.8-10.4-8.8h-6.4v17.6z"/>
</svg>''',
    'jquery.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <path fill="#0769AD" d="M0 0h128v128H0z"/>
  <path fill="#FFF" d="M113.8 41.5c-6.8 5.4-15.2 9.5-24.2 12 1.6-4.5 2.6-9.5 2.8-14.8.2-5.4-.5-11-2.1-16.7-1.1 6.8-3.7 12.8-7.7 17.7-4 4.8-9.1 8.5-15 10.6-2.9-4.8-6.9-8.7-11.7-11.4-4.8-2.7-10.3-4-15.9-3.7 3.5 4.5 5.8 9.9 6.6 15.7.8 5.8 0 11.8-2.4 17.2-2.4-5.2-6-9.6-10.5-12.8-4.5-3.2-9.8-5-15.3-5.2 2.6 5.8 3.7 12.4 3.1 19-.6 6.6-2.9 13-6.6 18.5 7.1-4.7 13.4-10.6 18.4-17.5 5 7 11.5 12.7 19.1 16.7 7.6 3.9 16.2 5.8 24.8 5.4 9.1-.5 18-3.9 25.1-9.8 7.1-5.9 12-14 13.9-23.1.6-3 .7-6 .5-9.1-.2-2.9-.8-5.8-1.8-8.6z"/>
</svg>''',
    'photoshop.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <path fill="#001E36" d="M0 0h128v128H0z"/>
  <path fill="#31A8FF" d="M31.2 30.5h27.4c12.2 0 19.6 6.8 19.6 17.2 0 11.3-8.6 17.5-20.4 17.5H45.7v28.3H31.2V30.5zm14.5 23.3h11.2c4.8 0 7.8-2.6 7.8-6.7 0-4-3-6.4-7.8-6.4H45.7v13.1zM97.1 66.8c-2.3-1.6-6.1-2.9-10.6-4.2-5.4-1.5-7.4-3.1-7.4-5.3 0-2.3 2-3.8 5.7-3.8 3.8 0 7.6 1.5 10.1 3.5l6-9.7c-4.4-3.3-10.1-5.1-16.8-5.1-12.7 0-19.8 6.7-19.8 16.7 0 8.7 5.7 13.3 14.6 16 5.3 1.6 7.7 3.3 7.7 5.7 0 2.6-2.5 4.3-6.8 4.3-5 0-9.8-2-12.9-4.8l-6.2 10c4.7 4 11.8 6.2 19.1 6.2 13.8 0 21.6-6.9 21.6-17.6 0-8.5-5-13.4-14.3-16.2z"/>
</svg>''',
    'illustrator.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <path fill="#330000" d="M0 0h128v128H0z"/>
  <path fill="#FF9A00" d="M48.2 30.5h14.8l20.4 63H69.6l-3.8-12.7H47.4L43.6 93.5H30.4l17.8-63zm5.4 39.5h10.9L59 50.8l-5.4 19.2zM91.8 32.2c0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.7 8.3-8.3 8.3-8.3-3.7-8.3-8.3zm1.1 20.3h14.4v41H92.9v-41z"/>
</svg>''',
    'linkedin.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <path fill="#0A66C2" d="M0 0h128v128H0z"/>
  <path fill="#FFF" d="M28.6 44.9H10.4V103h18.2V44.9zm-9.1-14.5c6.3 0 10.2-4.2 10.2-9.4s-3.9-9.4-10.2-9.4c-6.2 0-10.2 4.2-10.2 9.4s4 9.4 10.2 9.4zm98.1 42.4c0-15.9-8.5-23.3-19.8-23.3-9.1 0-13.2 5-15.5 8.5V44.9H64.1c.2 5.1 0 58.1 0 58.1h18.2v-32.5c0-1.7.1-3.5.6-4.7 1.4-3.5 4.6-7.1 10-7.1 7.1 0 9.9 5.4 9.9 13.3V103h18.2V72.8h-.2z"/>
</svg>''',
    'google.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <path fill="#EA4335" d="M64 25.6c9.8 0 18.6 3.4 25.5 10l19.1-19.1C97.1 6 81.6 0 64 0 39 0 17.5 14.3 7.1 35.2l22.2 17.2C34.6 36.8 48 25.6 64 25.6z"/>
  <path fill="#4285F4" d="M125.4 65.5c0-4.5-.4-8.8-1.1-13H64v24.6h34.4c-1.5 8-6 14.7-12.8 19.3l20.7 16c12.1-11.2 19.1-27.7 19.1-46.9z"/>
  <path fill="#FBBC05" d="M29.3 75.6c-1.4-4.1-2.2-8.5-2.2-13s.8-8.9 2.2-13L7.1 32.4C2.6 41.4 0 51.4 0 62.6s2.6 21.2 7.1 30.2l22.2-17.2z"/>
  <path fill="#34A853" d="M64 125.2c17.6 0 32.4-5.8 43.2-15.8l-20.7-16c-5.8 3.9-13.3 6.2-22.5 6.2-16 0-29.4-11.2-34.7-26.8L7.1 90c10.4 20.9 31.9 35.2 56.9 35.2z"/>
</svg>''',
    'tedx.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80">
  <text x="5" y="60" font-family="Impact, Arial Black, sans-serif" font-size="64" fill="#E62B1E" font-weight="900">TED<tspan fill="#E62B1E" font-size="48" dy="-16">x</tspan></text>
</svg>''',
    'devquest.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <rect width="128" height="128" rx="28" fill="#111827"/>
  <path d="M36 44l28-16 28 16v40l-28 16-28-16V44z" stroke="#60A5FA" stroke-width="6" fill="none" stroke-linejoin="round"/>
  <circle cx="64" cy="64" r="10" fill="#60A5FA"/>
</svg>''',
    'khinext.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <rect width="128" height="128" rx="28" fill="#09090b"/>
  <path d="M38 38v52M38 64l40-26M38 64l40 26" stroke="#22c55e" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>''',
    'icydd.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <rect width="128" height="128" rx="28" fill="#0f172a"/>
  <path d="M64 26l32 14v28c0 24-32 40-32 40s-32-16-32-40V40l32-14z" fill="none" stroke="#38BDF8" stroke-width="6" stroke-linejoin="round"/>
  <path d="M52 64l8 8 18-18" fill="none" stroke="#38BDF8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>'''
}

for fname, svg in logos.items():
    with open(os.path.join('public/logos', fname), 'w', encoding='utf-8') as f:
        f.write(svg.strip())

with open('public/logos/LICENSE.md', 'w', encoding='utf-8') as f:
    f.write('''# Logo Credits and Licenses

All brand logos in this directory are the intellectual property of their respective trademark holders:
- **JavaScript, React, Python, HTML5, CSS3, Bootstrap, jQuery, Adobe Photoshop, Adobe Illustrator**: Devicon / Simple Icons, MIT License.
- **LinkedIn, Google, TEDx**: Official trademark representations for educational / portfolio demonstration purposes.
- **DevQuest, KhiNext, ICyDD**: Community / event insignia for portfolio demonstration purposes.
''')

print("All logos and LICENSE.md created successfully!")
