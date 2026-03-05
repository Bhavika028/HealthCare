# 🧠 CogniScreen — AI-Powered Early Dementia Screening

> Free, vernacular-first cognitive screening with longitudinal drift tracking.

---

## 🚀 Step-by-Step Setup & Deployment Guide

### Prerequisites
- Node.js v18+ installed → [nodejs.org](https://nodejs.org)
- A code editor (VS Code recommended)
- A GitHub account
- Free API keys (see Step 3)

---

## STEP 1 — Clone & Install

```bash
# Clone the repo (after pushing to GitHub)
git clone https://github.com/YOUR_USERNAME/cogniscreen.git
cd cogniscreen

# Install dependencies
npm install
```

---

## STEP 2 — Get Your API Keys (both free)

### A) Gemini API Key (Google AI Studio)
1. Go to → https://aistudio.google.com/app/apikey
2. Click **"Create API Key"**
3. Copy the key

### B) Sarvam AI API Key (Indian language STT + Translation)
1. Go to → https://dashboard.sarvam.ai
2. Sign up with email
3. Go to **API Keys** → **Create Key**
4. Copy the key

---

## STEP 3 — Configure Environment

```bash
# Copy the example env file
cp .env.example .env

# Open .env and add your keys
VITE_GEMINI_API_KEY=your_actual_gemini_key_here
VITE_SARVAM_API_KEY=your_actual_sarvam_key_here
```

> ⚠️ Never commit the `.env` file — it's already in `.gitignore`

---

## STEP 4 — Run Locally

```bash
npm run dev
```

Open → http://localhost:3000

The app should be running! Test the full flow:
1. Enter profile
2. Complete Task 1 (Verbal Fluency — try typing mode first)
3. Complete Task 2 (Story Recall)
4. Complete Task 3 (Speech Sample)
5. View the AI report

---

## STEP 5 — Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# First commit
git commit -m "feat: initial CogniScreen prototype"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/cogniscreen.git
git branch -M main
git push -u origin main
```

---

## STEP 6 — Deploy to Vercel (Free, 2 minutes)

### Option A: Vercel CLI
```bash
npm install -g vercel
vercel

# Follow prompts. When asked about environment variables,
# add VITE_GEMINI_API_KEY and VITE_SARVAM_API_KEY
```

### Option B: Vercel Dashboard (Easier)
1. Go to → https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your `cogniscreen` repo
4. Under **Environment Variables**, add:
   - `VITE_GEMINI_API_KEY` = your key
   - `VITE_SARVAM_API_KEY` = your key
5. Click **Deploy**

Your app will be live at: `https://cogniscreen-xxx.vercel.app`

### Option C: Netlify
1. Go to → https://app.netlify.com
2. Drag and drop the `dist/` folder (after `npm run build`)
3. Or connect GitHub repo and configure env vars

---

## STEP 7 — Build for Production

```bash
npm run build
# Creates optimized files in /dist folder
```

---

## 🛠 Project Structure

```
cogniscreen/
├── src/
│   ├── App.jsx              # Main app — screen state machine
│   ├── main.jsx             # React entry point
│   ├── index.css            # Global design system
│   ├── components/
│   │   ├── Header.jsx       # Sticky nav header
│   │   ├── RiskBadge.jsx    # Low/Moderate/High badge
│   │   └── TrendChart.jsx   # Multi-session trend chart (Recharts)
│   ├── pages/
│   │   ├── Welcome.jsx      # Landing page
│   │   ├── Profile.jsx      # Patient info form
│   │   ├── Task1.jsx        # Verbal Fluency task
│   │   ├── Task2.jsx        # Story Recall task
│   │   ├── Task3.jsx        # Speech Sample task
│   │   └── Report.jsx       # AI report + trend chart
│   ├── hooks/
│   │   └── useAudioRecorder.js  # MediaRecorder hook
│   └── utils/
│       ├── sarvam.js        # Sarvam STT + Translate API
│       ├── gemini.js        # Gemini scoring + report generation
│       └── storage.js       # localStorage session management
├── .env.example             # Template for API keys
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 🔑 API Reference

### Sarvam AI
- **STT**: `POST https://api.sarvam.ai/speech-to-text`
- **Translate**: `POST https://api.sarvam.ai/translate`
- **Auth**: Header `api-subscription-key: YOUR_KEY`
- **Supported languages**: Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, Marathi, Gujarati, Odia, Punjabi

### Gemini
- **Endpoint**: `POST https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_KEY`
- **Model**: `gemini-1.5-flash` (free tier: 15 requests/min, 1M tokens/day)

---

## 🧪 Testing Without API Keys

The app works without API keys in a degraded mode:
- Voice tasks fall back to typing
- Scoring uses simple rule-based fallbacks (word count, etc.)
- Report generates with basic risk assessment

For demo purposes, set fake keys or leave blank and use typing mode.

---

## ⚠️ Known Browser Limitations

| Feature | Chrome | Firefox | Safari |
|---------|--------|---------|--------|
| MediaRecorder (voice) | ✅ | ✅ | ⚠️ Limited |
| Web Audio (recording) | ✅ | ✅ | ⚠️ Needs HTTPS |
| localStorage | ✅ | ✅ | ✅ |

**For voice recording to work on Safari/iOS**, the app must be served over HTTPS (Vercel deployment handles this automatically).

---

## 🔮 Extending the Prototype

### Add a new language
Edit `src/utils/sarvam.js` → add to the `LANGUAGES` array:
```js
{ label: 'Assamese', code: 'as-IN' }
```

### Add a new task
1. Create `src/pages/Task4.jsx`
2. Add scoring function to `src/utils/gemini.js`
3. Register the screen in `src/App.jsx`

### Add backend storage (post-hackathon)
Replace `localStorage` calls in `src/utils/storage.js` with Supabase/Firebase API calls.

---

## 🏆 Hackathon Demo Tips

1. **Pre-fill the profile** — hardcode a default profile so judges don't type it
2. **Demo in English first** — easier for judges to verify AI is working
3. **Have 2 saved sessions** — so trend chart appears in the report
4. **Show the print view** — `window.print()` produces a clean A4 report
5. **Mention the drift engine** — this is your unique technical differentiator

---

## Medical Disclaimer

CogniScreen is a research/screening prototype. It is NOT a medical device and does NOT diagnose dementia or any other medical condition. All results should be reviewed by a qualified healthcare professional.

---

Built with ❤️ for early dementia detection in India.
