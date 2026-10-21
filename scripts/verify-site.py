import os
from playwright.sync_api import sync_playwright

def main():
    os.makedirs('screenshots', exist_ok=True)
    
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        
        # 1. Desktop Test: 1440x900
        print("Testing Desktop 1440x900...")
        context_desktop = browser.new_context(viewport={'width': 1440, 'height': 900})
        page_desktop = context_desktop.new_page()
        page_desktop.goto('http://localhost:3000', wait_until='networkidle')
        page_desktop.wait_for_timeout(2000)
        
        # Check horizontal overflow
        scroll_w = page_desktop.evaluate("document.documentElement.scrollWidth")
        inner_w = page_desktop.evaluate("window.innerWidth")
        print(f"Desktop 1440x900: scrollWidth={scroll_w}, innerWidth={inner_w}")
        assert scroll_w <= inner_w, f"Horizontal overflow on desktop: {scroll_w} > {inner_w}"
        
        # Take full page screenshot and hero screenshot
        page_desktop.screenshot(path='screenshots/desktop_1440x900_hero.png')
        print("Saved screenshots/desktop_1440x900_hero.png")
        
        # Scroll down to About section to test ID card
        page_desktop.evaluate("window.scrollTo(0, 1000)")
        page_desktop.wait_for_timeout(1000)
        page_desktop.screenshot(path='screenshots/desktop_about.png')
        print("Saved screenshots/desktop_about.png")

        # Scroll to Skills section
        page_desktop.evaluate("document.getElementById('skills').scrollIntoView()")
        page_desktop.wait_for_timeout(1000)
        page_desktop.screenshot(path='screenshots/desktop_skills.png')
        print("Saved screenshots/desktop_skills.png")

        # Scroll to Work section
        page_desktop.evaluate("document.getElementById('work').scrollIntoView()")
        page_desktop.wait_for_timeout(1000)
        page_desktop.screenshot(path='screenshots/desktop_work.png')
        print("Saved screenshots/desktop_work.png")

        # Scroll to Achievements section
        page_desktop.evaluate("document.getElementById('achievements').scrollIntoView()")
        page_desktop.wait_for_timeout(1500)
        page_desktop.screenshot(path='screenshots/desktop_achievements.png')
        print("Saved screenshots/desktop_achievements.png")

        # Scroll to Contact section
        page_desktop.evaluate("document.getElementById('contact').scrollIntoView()")
        page_desktop.wait_for_timeout(1000)
        page_desktop.screenshot(path='screenshots/desktop_contact.png')
        print("Saved screenshots/desktop_contact.png")

        context_desktop.close()

        # 2. Mobile Test: 390x844 (iPhone 12/13/14 viewport)
        print("\nTesting Mobile 390x844...")
        context_mobile = browser.new_context(viewport={'width': 390, 'height': 844}, is_mobile=True)
        page_mobile = context_mobile.new_page()
        page_mobile.goto('http://localhost:3000', wait_until='networkidle')
        page_mobile.wait_for_timeout(2000)

        # Check horizontal overflow
        m_scroll_w = page_mobile.evaluate("document.documentElement.scrollWidth")
        m_inner_w = page_mobile.evaluate("window.innerWidth")
        print(f"Mobile 390x844: scrollWidth={m_scroll_w}, innerWidth={m_inner_w}")
        assert m_scroll_w <= m_inner_w, f"Horizontal overflow on mobile: {m_scroll_w} > {m_inner_w}"

        page_mobile.screenshot(path='screenshots/mobile_390x844_hero.png')
        print("Saved screenshots/mobile_390x844_hero.png")

        # Scroll down and capture mobile About and Work
        page_mobile.evaluate("document.getElementById('about').scrollIntoView()")
        page_mobile.wait_for_timeout(1000)
        page_mobile.screenshot(path='screenshots/mobile_about.png')

        page_mobile.evaluate("document.getElementById('work').scrollIntoView()")
        page_mobile.wait_for_timeout(1000)
        page_mobile.screenshot(path='screenshots/mobile_work.png')

        context_mobile.close()
        browser.close()
        print("\nAll quality checks and screenshots passed successfully with 0 horizontal overflow!")

if __name__ == "__main__":
    main()
