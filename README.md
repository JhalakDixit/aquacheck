# AQUACHECK – Beginner Website

## Files
- `index.html` – homepage
- `location.html` – shared page for Mess, Hostel and Library
- `css/style.css` – website appearance
- `js/location.js` – JavaScript that loads and displays water points
- `data/points.json` – the 14 point records

## Run it
The site uses `fetch()` to load the JSON file. Open the folder in Visual Studio Code and use the Live Server extension:
1. Open the `AquaCheck_Beginner_Website` folder in VS Code.
2. Install the extension named **Live Server** if it is not already installed.
3. Right-click `index.html` and choose **Open with Live Server**.

Do not simply double-click `index.html`; browsers may block loading the JSON file from a local file path.

## QR link pattern
After hosting the website, the three location links will be:
- `https://YOUR-SITE-URL/location.html?place=mess`
- `https://YOUR-SITE-URL/location.html?place=hostel`
- `https://YOUR-SITE-URL/location.html?place=library`

Generate the three QR codes only after replacing `YOUR-SITE-URL` with the real hosted website address.

## Updating data
Edit `data/points.json` to change point names or areas. Do not add water-quality readings until they come from an actual report. When adding results, include the test date, units, method if available, and report source. Keep missing information labelled as unavailable.

## Important
This is a prototype. The status “Verified report awaited” is intentional. The site does not claim that any campus water point is safe or unsafe.
