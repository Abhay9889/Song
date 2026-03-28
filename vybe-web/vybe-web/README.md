# 🎵 VYBE Web — 3D Music Streaming App

**A fully free, privacy-first music web app** built with Next.js 14, Three.js, and Framer Motion.
Streams 600K+ Creative Commons tracks from the Jamendo API. Zero ads, zero tracking.

## 🚀 Deploy to Vercel in 3 Steps

### 1. Get Your FREE Jamendo API Key
→ https://devportal.jamendo.com/  
Sign up → Create App → Copy **Client ID**

### 2. Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or via CLI:
```bash
npm i -g vercel
cd vybe-web
vercel
# When prompted, add env var: JAMENDO_CLIENT_ID=your_key_here
```

### 3. Set Environment Variable
In Vercel dashboard → Project → Settings → Environment Variables:
```
JAMENDO_CLIENT_ID = your_jamendo_client_id
```

## 💻 Local Development
```bash
npm install
cp .env.example .env.local
# Edit .env.local with your Jamendo key
npm run dev
# → http://localhost:3000
```

## 🎨 Features
| Feature | Details |
|---|---|
| **3D Hero** | Three.js vinyl record + 64-bar audio visualizer + particle field |
| **Live Streaming** | Jamendo API — 600K+ CC tracks |
| **Global Player** | Persistent mini-player, seek, shuffle, repeat, volume |
| **Search** | Real-time debounced search across all tracks |
| **Discover** | Filter by 10 genres × 7 moods |
| **Animations** | Framer Motion page transitions + micro-interactions |
| **Dark Theme** | Deep void black + neon purple/cyan/pink palette |
| **Fonts** | Orbitron (display) + Outfit (body) |
| **State** | Zustand global player store |
| **Performance** | ISR (1hr revalidate), dynamic imports, Next/Image |

## 🗂️ Project Structure
```
vybe-web/
├── app/
│   ├── api/
│   │   ├── tracks/route.ts       ← GET trending + new releases
│   │   ├── search/route.ts       ← GET /api/search?q=...
│   │   └── genre/[tag]/route.ts  ← GET /api/genre/electronic
│   ├── discover/
│   │   └── page.tsx              ← Genre + mood explorer
│   ├── layout.tsx                ← Root layout + AudioEngine
│   └── page.tsx                  ← Home page (SSR)
├── components/
│   ├── three/
│   │   ├── HeroScene.tsx         ← R3F Canvas wrapper
│   │   ├── VinylRecord.tsx       ← 3D spinning vinyl
│   │   ├── AudioVisualizer.tsx   ← 64-bar circular visualizer
│   │   └── ParticleField.tsx     ← 1800-particle star field
│   ├── player/
│   │   ├── AudioEngine.tsx       ← HTML5 Audio controller
│   │   ├── MiniPlayer.tsx        ← Bottom persistent player
│   │   └── PlayerStore.ts        ← Zustand state
│   ├── ui/
│   │   ├── HeroSection.tsx       ← Full hero with 3D scene
│   │   ├── TrackCard.tsx         ← Reusable track row
│   │   ├── GenreCard.tsx         ← Gradient genre tile
│   │   ├── SearchBar.tsx         ← Live search dropdown
│   │   ├── TrendingSection.tsx
│   │   ├── NewReleasesSection.tsx
│   │   ├── GenresSection.tsx
│   │   └── StatsBar.tsx
│   └── layout/
│       └── Navbar.tsx
└── lib/
    ├── types.ts                  ← Track, Genre, GENRES[]
    └── jamendo.ts                ← API fetch helpers
```

## 🎯 Tech Stack
| | |
|---|---|
| **Framework** | Next.js 14 App Router |
| **3D** | Three.js + @react-three/fiber + @react-three/drei |
| **Animation** | Framer Motion |
| **State** | Zustand |
| **Styling** | Tailwind CSS |
| **Music API** | Jamendo (free, Creative Commons) |
| **Audio** | HTML5 Audio API |
| **Fonts** | Orbitron + Outfit (Google Fonts) |

---
*Built with 💜 zero budget. Unlimited vision.*
