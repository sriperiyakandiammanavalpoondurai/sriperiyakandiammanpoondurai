# ஸ்ரீ பெரியகாண்டியம்மன் கோவில் — Premium Devotional 3D Website (Pure HTML/CSS/JS)

No framework. No build step. Just open `index.html` or host this folder.

## Pages (same navbar + same contents as old site, nothing changed)
- `index.html` — முகப்பு (hero + கோயில் நடை நேரம் + தினசரி பூஜை நேரங்கள்)
- `history.html` — வரலாறு (தல வரலாறு + 7 மைல்கற்கள்)
- `timings.html` — பூஜை நேரங்கள் (8 பூஜை tabs + அமாவாசை 13 + பௌர்ணமி 12 + திருவிழா 1)
- `admin.html` — நிர்வாகம் (3 + 2 + 2 + 4 + 1 members with photos)
- `countries.html` — கோவில் வீடு (37 rows)
- `gallery.html` — புகைப்படங்கள் (11 images + 3D lightbox)
- `contact.html` — தொடர்புக்கு (7 services + address + phone + map)

## Assets
- `assets/temple-*.jpg/png` — 11 temple photos (copied as-is from old `public/assets`)
- `assets/admin/*.jpg` — 12 admin photos
- `css/style.css` — full premium theme (maroon + gold, 3D tilt, parallax, reveal)
- `js/main.js` — marquee (next 2 upcoming events, same logic), mobile menu, 3D tilt (desktop only), scroll reveal, hero diya particles (capped, pausable), pooja tabs, gallery lightbox, back-to-top

## Image efficiency (3D but fast)
- `loading="lazy" decoding="async"` on all below-fold images
- `fetchpriority="high"` + preload only on hero (`temple-2.jpg`)
- `width/height` on gallery + admin photos (no layout shift)
- All 3D uses GPU-only `transform/opacity`, `content-visibility:auto`, tilt disabled on touch, particles pause when tab hidden + respect `prefers-reduced-motion`

## Run
Double-click `index.html`, or serve: `python -m http.server` inside this folder, or upload to any static host.
