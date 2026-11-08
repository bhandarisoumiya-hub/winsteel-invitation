# Winsteel – Bhoomipujan & Shilanyas Invitation

Animated digital invitation for the Bhoomipujan & Shilanyas Ceremony (Foundation Stone Laying) of
**Winsteel Engineering Works Pvt Ltd**, Wednesday 25th November 2026, 8:30 AM onwards, followed by Lunch.

Plain HTML, CSS and JavaScript. No build step.

## Features
- Temple-door opening intro with a burst of flower petals
- Falling petals and gold sparkles
- Kalash, Namokar Mantra, Ganeshji / Mahavir Swami / Laxmiji blessings
- Live countdown to the muhurat
- Add to Google Calendar and download an `.ics` file
- Embedded Google Map, a Get Directions button and Copy Address
- Share on WhatsApp, with a preview image (`assets/og-image.png`)
- Personalised greeting: `https://your-site.vercel.app/?to=Rameshbhai` shows "Dear Rameshbhai"
- Background music: put `assets/music.mp3` in the folder to use it, otherwise a soft bell and drone sound is generated in the browser

## Run locally
Open `index.html` in a browser, or run:
```
npx serve .
```

## Deploy to Vercel
**Option A – GitHub:** push this repo to GitHub, then on vercel.com go to Add New → Project, import the repo, keep Framework Preset = **Other**, and click Deploy.

**Option B – CLI:**
```
npm i -g vercel
vercel          # first deploy (preview)
vercel --prod   # production
```

## Customise
- **Logo:** `assets/logo.png` is a cropped copy of `winsteel-logo.png`. The favicon and app icons (`favicon-32.png`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`) and the button seal (`emblem.png`) use the W emblem from the logo.
- **Text, date and time:** edit `index.html`. The countdown and calendar times are in the `EVENT` object at the top of `js/main.js`.
