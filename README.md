# Team VeGu: Home & Clinic Hub (`team-vegu-hub`)

A multi-role, offline-capable and Vercel/GitHub-deployable web application for **VeGu**'s care team (`VaGu & ShGu`, All Kids First ABA [`StMa`, `VyNg`, `WiCo`, `MaGa`], Building Bridges SLP/OT, IvyBrook Preschool [`AmSo`, `YaNe`], and District IEP reviewers [`JuWi`, `JeFa`, `DaHa`]).

## Included Printable Full-Color PDFs
1. **`Vedant_ABA_Focused_Worksheets.pdf` (6 Pages)** — Built from actual `11/23` (`VyNg`), `11/24` (`WiCo`), and `11/25` (`MaGa`) ABA sessions.
2. **`Vedant_4Week_Speech_Plan_Worksheets.pdf` (6 Pages)** — 4-Week Parent-Led Home Speech & Language Curriculum with illustrated worksheets.
3. **`Vedant_Module0_Baseline_Worksheets.pdf` (6 Pages)** — Illustrated IEP Module 0 Baseline Probes, First–Then Board, 3-Option Coping Menu, 25 Vocabulary Cards, Pre-Writing Stroke Mat with Blue Helper-Hand Anchor, and 6-Step Bathroom Routine.
4. **`Vedant_Provider_Progress_Report_Sample.pdf` (2 Pages)** — 3-RBT Clinical Analytics Charts & 15-Row Integrated ABA/IEP Alignment Matrix.
5. **`Team_Vedant_Partnership_Deck.html` (16 Slides)** — Companion presentation deck.

---

## Deploying to GitHub & Vercel

### Option 1: Push to GitHub + Import in Vercel (Recommended)
1. Create a new private or public repository on GitHub (e.g., `team-vegu-hub`).
2. Run inside this `team-vegu-hub` folder:
   ```bash
   git remote add origin https://github.com/<your-username>/team-vegu-hub.git
   git branch -M main
   git push -u origin main
   ```
3. Go to [vercel.com/new](https://vercel.com/new) and import `team-vegu-hub`.
4. *(Optional for permanent multi-device cloud database sync)*: In your Vercel project dashboard, go to **Storage → Connect Store → Upstash Redis / Vercel KV**. The included `/api/sync.js` serverless endpoint automatically detects `KV_REST_API_URL` and `KV_REST_API_TOKEN` so every trial log, speech check-off, and team note syncs live across every provider's phone and laptop.

### Option 2: Direct Vercel CLI Deploy
```bash
npx vercel --prod
```

### Running Offline Locally
Double-click `index.html` in any browser, or run:
```bash
npx serve .
```
