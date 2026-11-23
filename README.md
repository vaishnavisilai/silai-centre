# Jhusi Silai Centre – Website

## Run & test now
```bash
./run.sh          # starts a local server: http://localhost:8000
./run.sh 9000     # use another port
```
Edit any file, refresh the browser. (Needs only Python 3; no packages, no extra server code.)

## Add / change information – only edit `content.js`
Promises & top headline bar, services & prices, design gallery, reviews, FAQ, areas, address, map.
- **Add a design photo:** put the image in `images/`, then add `image: "images/photo1.jpg"` to that design.
- **Change delivery promise:** edit `announce` and `promises` (English + Hindi).

## Ratings & reviews (JSON file, no server)
- Reviews live in **`data/reviews.json`**. The website reads that file and shows every review plus the average star rating.
- **Add / edit / delete reviews:** open **`admin.html`** (e.g. `http://localhost:8000/admin.html`), press *Open data/reviews.json*, make your changes, press *Save*. In Chrome/Edge on a computer it saves straight into the file; in other browsers it downloads `reviews.json` which you put in the `data` folder. Then upload the folder again if your site is online.
- **Customer reviews:** the form on the site sends the review to you on WhatsApp (or email, if Formspree is set up). The message contains a line like `{"name":"Meena","rating":5,"text":"..."}`. Paste the whole message into **admin.html -> Add a review** and it fills the form for you; press *Add review* and *Save*. Reviews only appear on the site after you do this, so you check everything first.
- `admin.html` only changes the file on your own computer. Visitors cannot change your site with it (it is also hidden from Google).
- You can also edit `data/reviews.json` in any text editor. `text` can be one string, or `{ "en": "...", "hi": "..." }`.
- The three starting reviews are samples (`"reviewsAreSamples": true`). Adding your first real review in admin.html turns the sample note off; delete the sample rows there.
- Note: browsers cannot read `data/reviews.json` when `index.html` is opened by double-click. Use `./run.sh` to test locally, or upload to hosting.

## Protect your phone number from bots
Never type the number in plain text. Encode it:
```bash
python3 encode.py 919876543210     # -> paste into phoneEnc
python3 encode.py you@gmail.com    # -> paste into emailEnc
```
Also set `phoneMask` (what people see before tapping). The number is decoded only when a real person taps WhatsApp/Call/"Tap to reveal", so it is not in the page source, links or Google data. Forms also have a honeypot and speed check. Note: this stops scrapers and AI crawlers reading raw HTML; a determined bot that runs a full browser and clicks could still get it.

## Get found on Google (Jhusi level)
1. Host on HTTPS (Netlify Drop / GitHub Pages / Cloudflare Pages) – ideally with your own domain.
2. Replace `https://YOUR-SITE.example` with your real address in `index.html` (canonical, hreflang, og:url, JSON-LD), `robots.txt`, `sitemap.xml`. Fix the address/coordinates in the JSON-LD (get lat/lng from Google Maps → right-click your shop).
3. **Create a Google Business Profile** (business.google.com): category "Tailor", exact Jhusi address, hours, phone, photos, link to this site. This is what shows you in "tailor near me" and on Maps – the single most important step.
4. Add the site to **Google Search Console**, verify, submit `sitemap.xml`.
5. Ask happy customers for Google reviews; add real reviews here too.
6. Keep the words "Jhusi", "Prayagraj", "blouse", "petticoat" in headings (already done).
Ranking can't be guaranteed and takes days to weeks.
The JSON-LD intentionally has no phone number and no star rating (add `aggregateRating` only once you have real reviews).

## Email enquiries
Create a free form at formspree.io and paste its URL into `formspree` in `content.js`.

## Deploy
Upload the whole folder to Netlify Drop, GitHub Pages or Cloudflare Pages.
