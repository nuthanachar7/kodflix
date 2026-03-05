# TMDB Netflix-Style React Frontend

A React app that fetches movie data from [The Movie Database (TMDB)](https://www.themoviedb.org/) API and displays it in a Netflix-style landing page with a hero banner and horizontal content rows.

## Setup

1. Get a free API key from [TMDB API Settings](https://www.themoviedb.org/settings/api).

2. Create a `.env` file in the project root (or edit the existing one) and set your key:

   ```
   VITE_TMDB_API_KEY=your_actual_tmdb_api_key_here
   ```

   Replace `your_actual_tmdb_api_key_here` with your TMDB API key.

## Commands to Run the App

**Install dependencies** (if not already done):

```bash
cd "c:\Users\Dell\OneDrive\Desktop\FEB-26Batch KodNest\TMDB"
npm install
```

**Start the development server:**

```bash
npm run dev
```

Then open **http://localhost:5173/** in your browser.

**Build for production:**

```bash
npm run build
npm run preview
```

`npm run preview` serves the built app (e.g. http://localhost:4173) so you can check the production build.

## Verifying TMDB Data

- With a valid `VITE_TMDB_API_KEY` in `.env`, the app will show a hero banner (featured movie backdrop) and several rows: **Trending Now**, **Popular**, **Top Rated**, **Discover**.
- Open DevTools → Network and filter by "Fetch/XHR" to see requests to `api.themoviedb.org` returning 200 and JSON with `results`.
- If you see "Missing or invalid VITE_TMDB_API_KEY", add your key to `.env` and **restart the dev server** (`Ctrl+C` then `npm run dev` again), because Vite reads env only at startup.

## Deploying (e.g. Vercel)

For the app to work on Vercel (or any host), set the API key in the host’s environment:

**Fix "Failed to fetch" or API key errors on Vercel:**

1. Open [Vercel Dashboard](https://vercel.com/dashboard) → your project → **Settings** → **Environment Variables**.
2. Click **Add**. Name: `VITE_TMDB_API_KEY`. Value: your TMDB API key (v3 from [TMDB API Settings](https://www.themoviedb.org/settings/api)). Save.
3. Go to **Deployments** → **⋮** on the latest deployment → **Redeploy**. (Vite reads env at build time.)
4. After the deploy finishes, reload your app URL; movies should load.

## Project Structure

- `src/api/tmdb.js` – TMDB API client and image URL helper
- `src/hooks/useTmdb.js` – Fetches hero + row data for the landing page
- `src/components/` – Navbar, Hero, Row, PosterCard
- `src/App.jsx` – Composes the Netflix-style layout
- `src/App.css` – Dark theme and row/hero styles
