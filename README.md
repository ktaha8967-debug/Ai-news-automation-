# 🌐 Worldwide AI News Automation System

An enterprise-grade, fully automated **Worldwide AI News Platform** engineered with handcrafted modern UI/UX, multi-source fact-verification pipelines, Groq AI / free model content generation, 1200px+ image automation, advanced Google News / Discover SEO, and an interactive Admin Control Panel with **zero mandatory paid API dependencies**.

---

## 🌟 Key System Capabilities

- **🔍 Automated AI News Research**: Aggregates trending AI topics daily from TechCrunch AI, VentureBeat, MIT Technology Review, ArXiv preprints, and IEEE archives.
- **🛡️ Fact Verification & Fake News Shield**: Cross-references factual assertions across independent sources to compute a **0–100% Trust Score**. Stories scoring below 80% are automatically held in the Admin Review Queue.
- **🤖 Groq & Zero-Cost AI Content Engine**: Integrates with Groq API (`llama-3.3-70b-versatile` / `mixtral-8x7b-32768`). Automatically switches to a built-in intelligent multi-stage synthesizer if no API key is provided.
- **🖼️ 1200px+ Image Automation**: Selects high-definition, copyright-safe visual assets formatted specifically for **Google Discover** card feeds.
- **📈 Advanced SEO & E-E-A-T Compliance**: Auto-generates `NewsArticle` and `Breadcrumb` JSON-LD schemas, Google News XML sitemaps (`/google-news-sitemap.xml`), standard sitemaps (`/sitemap.xml`), `robots.txt`, and verified Author Profile pages.
- **🎛️ Admin Control Suite**: Real-time pipeline controller, article review queue, fact-checking audit logs, and execution retry logs.

---

## 📄 Complete Page & Route Guide

### 🌐 Public News Portal Pages

#### 1. 🏠 Homepage (`/`)
- **File**: `src/app/page.tsx`
- **Features**:
  - **Live Breaking Ticker**: Animated marquee broadcasting breaking verified AI intelligence.
  - **Hero Featured Story**: Large visual feature box highlighting the top story of the day.
  - **Coverage Hubs**: Quick filter pills for AI sub-fields (LLMs, Autonomous Agents, AI Chips, Governance, Robotics).
  - **Verified AI News Feed**: Responsive grid displaying article cards with trust badges, read times, and category tags.
  - **High Search Demand Keywords**: Sidebar displaying trending global search topics.
  - **Fact-Verification Guarantee**: Summary of the 80% trust score threshold.

#### 2. 📰 Article Reader View (`/news/[slug]`)
- **File**: `src/app/news/[slug]/page.tsx`
- **Features**:
  - **Structured NewsArticle Schema**: Injects Google-compliant JSON-LD markup.
  - **Fact Verification Badge**: Displays 0–100% Trust Rating with an expandable drawer listing checked primary sources.
  - **1200px+ Featured Hero Image**: HD photo with descriptive caption.
  - **Full Article Content**: Clean typography with H2/H3 headers, bulleted key takeaways, and deep dive sections.
  - **FAQ Section**: Frequently asked questions and verification audit details.
  - **E-E-A-T Author Card**: Verified author profile card with credentials and social links.
  - **Related Cluster Stories**: Related articles grouped by topic cluster.

#### 3. 🎯 Topic Coverage Hubs (`/topics/[slug]`)
- **File**: `src/app/topics/[slug]/page.tsx`
- **Features**:
  - Dedicated landing pages for specific AI topics:
    - `llm-foundation-models` (LLMs & Foundation Models)
    - `autonomous-ai-agents` (Autonomous AI Agents)
    - `ai-chips-infrastructure` (AI Chips & Infrastructure)
    - `ai-safety-governance` (AI Safety & Governance)
    - `computer-vision-robotics` (Computer Vision & Robotics)
  - Topic description, global search demand index, and filtered article feed.

#### 4. 👤 E-E-A-T Author Profile (`/authors/[slug]`)
- **File**: `src/app/authors/[slug]/page.tsx`
- **Features**:
  - Author bio, professional credentials (e.g. Ph.D. Oxford, IEEE Board Member), social links, and count of verified articles published.
  - Complete list of articles authored by the specialist.

#### 5. 📜 Editorial & Verification Policy (`/editorial-standards`)
- **File**: `src/app/editorial-standards/page.tsx`
- **Features**:
  - Transparent documentation explaining multi-source cross-verification rules, the 80% trust score threshold, Groq AI model integration, and Google Discover schema compliance.

---

### 🎛️ Admin Panel Suite (`/admin`)

#### 6. 📊 Admin Dashboard Overview (`/admin`)
- **File**: `src/app/admin/page.tsx`
- **Features**:
  - System telemetry: Total published articles, 100% verified count, trust score average, review queue count, and total organic views.
  - Quick article queue preview and recent automation execution logs.

#### 7. ⚡ Automation Pipeline Controller (`/admin/automation`)
- **File**: `src/app/admin/automation/page.tsx`
- **Features**:
  - Interactive "Run Pipeline Now" trigger button.
  - Live terminal TTY console logging real-time steps: RSS scanning, fact verification, Groq/Fallback synthesis, image selection, and sitemap updates.

#### 8. 📝 Article Review & Queue Manager (`/admin/articles`)
- **File**: `src/app/admin/articles/page.tsx`
- **Features**:
  - Table of all articles in the database.
  - Status pills (`VERIFIED` vs `NEEDS_REVIEW`), trust score badges, and direct links to live pages.

#### 9. 🛡️ Fact-Verification Audit Logs (`/admin/verification-logs`)
- **File**: `src/app/admin/verification-logs/page.tsx`
- **Features**:
  - Detailed audit logs for every factual claim evaluated across academic databases, hallucination risk rating, and checked references.

#### 10. 📋 System Execution Logs & Retries (`/admin/logs`)
- **File**: `src/app/admin/logs/page.tsx`
- **Features**:
  - Audit trail of task names, execution durations (ms), timestamps, and success/failure status.

---

### 📡 SEO & XML Sitemap Feeds

#### 11. 📰 Google News XML Sitemap (`/google-news-sitemap.xml`)
- **File**: `src/app/api/sitemaps/google-news/route.ts` (via `next.config.mjs` rewrite)
- **Format**: XML formatted according to Google News sitemap guidelines (`<news:news>`, `<news:publication>`, `<news:publication_date>`).

#### 12. 🗺️ Standard XML Sitemap (`/sitemap.xml`)
- **File**: `src/app/api/sitemaps/standard/route.ts` (via `next.config.mjs` rewrite)
- **Format**: Standard sitemap protocol listing home, editorial standards, topic hubs, and article URLs.

#### 13. 🤖 Robots Configuration (`/robots.txt`)
- **File**: `src/app/api/robots/route.ts` (via `next.config.mjs` rewrite)
- **Format**: Crawler directives for Googlebot and Googlebot-News pointing to XML sitemaps.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router, Server Actions, TypeScript)
- **Styling**: Tailwind CSS + Custom CSS tokens (glassmorphism, dark theme, responsive grids)
- **Database**: Zero-configuration, file-backed atomic JSON database (`data/db.json`)
- **Icons**: `lucide-react`
- **RSS Parser**: `rss-parser`
- **AI Integration**: Groq API (`llama-3.3-70b-versatile`) + Zero-Cost Rule-Based Offline Synthesizer

---

## 🚀 How to Run the Platform

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser.

### 3. Optional Environment Variables (`.env.local`)
```env
# Optional: Set your Groq API key for live LLM completions.
# If omitted, the system seamlessly uses the zero-cost offline synthesis engine.
GROQ_API_KEY=your_groq_api_key_here
```

### 4. Build for Production
```bash
npm run build
npm start
```
