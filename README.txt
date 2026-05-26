Masjid Sound Solutions - React + Vite Website

Updated in this version:
- New gold logo integrated
- All visible terminology updated to use 'masjid'
- Email address set to contact@azaudios.com
- Real backend form submission added with Express
- WhatsApp buttons added for:
  +1 724 831 0196
  +1 724 427 5661

How to run locally:
1. Extract the ZIP.
2. Open a terminal inside the project folder.
3. Run:
   npm install
   npm run dev

What happens:
- The React frontend runs with Vite.
- The backend API runs on port 3001.
- The frontend sends quote requests to /api/quote.
- Requests are stored in:
  server/submissions/quote-requests.json

Production note:
- This backend stores submissions locally in JSON.
- For public deployment, you may later want to connect it to email, MongoDB, or another database.


Latest update:
- Kept the 4-division website architecture.
- Updated only the Masjid Sound Solutions page with a premium black/gold landing-page experience.
- Added Imam & Masjid Team control section near the top.
- Added mobile/tablet zone volume control concept.
- Added USB recording concept for salat, khutba, lessons, and events.
- Removed public pricing from the Masjid division.
- Preserved homepage division structure and navigation.
