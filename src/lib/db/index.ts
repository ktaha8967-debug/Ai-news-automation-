import fs from 'fs';
import path from 'path';
import { Article, Author, TopicCluster, VerificationLog, AutomationLog, SystemStats } from '@/types';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

interface DatabaseSchema {
  articles: Article[];
  authors: Author[];
  topics: TopicCluster[];
  verificationLogs: VerificationLog[];
  automationLogs: AutomationLog[];
  stats: SystemStats;
}

const DEFAULT_AUTHORS: Author[] = [
  {
    id: 'auth-1',
    name: 'Dr. Elena Rostova',
    slug: 'elena-rostova',
    role: 'Chief AI Research Analyst & Verification Lead',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Former DeepMind Fellow & Oxford AI Ethics researcher specializing in large language model verification, alignment, and hallucination benchmarks.',
    credentials: ['Ph.D. Computer Science (Oxford)', 'Member of IEEE AI Governance Board', '10+ Years LLM Evaluation'],
    verifiedCount: 142,
    twitter: 'https://twitter.com/elena_ai_news',
    linkedin: 'https://linkedin.com/in/elena-rostova-ai'
  },
  {
    id: 'auth-2',
    name: 'Marcus Vance',
    slug: 'marcus-vance',
    role: 'Senior Technology Correspondent',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Tech journalist covering silicon architectures, GPU clusters, enterprise AI infrastructure, and autonomous agent systems.',
    credentials: ['B.S. Electrical Engineering (MIT)', 'Former TechCrunch Senior Writer', 'Author of "The Compute Frontier"'],
    verifiedCount: 98,
    twitter: 'https://twitter.com/mvance_tech',
    linkedin: 'https://linkedin.com/in/marcus-vance'
  }
];

const DEFAULT_TOPICS: TopicCluster[] = [
  {
    id: 'topic-llm',
    name: 'LLMs & Foundation Models',
    slug: 'llm-foundation-models',
    description: 'Breakthroughs in large language models, reasoning architectures, context windows, and multimodal AI systems.',
    iconName: 'Cpu',
    searchDemand: 'VERY HIGH',
    articleCount: 18
  },
  {
    id: 'topic-agents',
    name: 'Autonomous AI Agents',
    slug: 'autonomous-ai-agents',
    description: 'Self-improving AI workflows, agentic coding tools, tool use, and multi-agent coordination frameworks.',
    iconName: 'Bot',
    searchDemand: 'VERY HIGH',
    articleCount: 12
  },
  {
    id: 'topic-silicon',
    name: 'AI Chips & Infrastructure',
    slug: 'ai-chips-infrastructure',
    description: 'NVIDIA, AMD, custom ASICs, quantum compute, and next-generation datacenter power systems.',
    iconName: 'Zap',
    searchDemand: 'HIGH',
    articleCount: 9
  },
  {
    id: 'topic-ethics',
    name: 'AI Safety & Governance',
    slug: 'ai-safety-governance',
    description: 'Global regulations, copyright policy, alignment research, and enterprise compliance standards.',
    iconName: 'ShieldCheck',
    searchDemand: 'HIGH',
    articleCount: 7
  },
  {
    id: 'topic-vision',
    name: 'Computer Vision & Robotics',
    slug: 'computer-vision-robotics',
    description: 'Humanoid robotics, spatial intelligence, video generation models, and autonomous transport.',
    iconName: 'Eye',
    searchDemand: 'TRENDING',
    articleCount: 6
  }
];

const DEFAULT_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Breakthrough Reasoning Model Benchmarks Show 94% Accuracy on Complex Quantum Physics Problems',
    slug: 'breakthrough-reasoning-model-benchmarks-quantum-physics',
    summary: 'A multi-institution study verifies that novel chain-of-thought verification architectures can solve previously intractable theoretical physics equations with sub-second latency.',
    content: `<h2>Executive Summary</h2>
<p>In a major milestone for computational science, top AI research labs have released empirical benchmark results showing that specialized reasoning foundation models have reached a 94.2% accuracy threshold on complex quantum mechanical wave equations. Unlike traditional transformer architectures, these new models utilize dynamic self-correction loops during inference to detect and rectify mathematical hallucinations in real time.</p>

<h3>Key Takeaways</h3>
<ul>
  <li><strong>94.2% Accuracy Rate:</strong> Tested against 1,200 peer-reviewed physics problems from MIT and CERN benchmark suites.</li>
  <li><strong>Zero-Shot Proof Synthesis:</strong> Model generates step-by-step mathematical proofs with verified formal logic checks.</li>
  <li><strong>Energy Efficiency:</strong> Reduced inference compute cost by 40% compared to standard chain-of-thought methods.</li>
</ul>

<h2>Multi-Source Fact Verification Report</h2>
<p>Our automated research engine cross-referenced empirical paper claims across ArXiv preprints, MIT CSAIL announcements, and independent GitHub benchmark repositories. All core assertions regarding model evaluation protocols were independently validated with a <strong>98% Trust Index Score</strong>.</p>

<h2>Architecture & Technical Deep Dive</h2>
<p>The breakthrough relies on a novel hybrid architecture combining Monte Carlo Tree Search (MCTS) with formal logic theorem provers. During generation, the model executes lightweight internal simulations before outputting token streams, virtually eliminating symbolic reasoning drift.</p>

<blockquote><p>"This isn't merely text prediction; it's formal mathematical deduction running at enterprise scale." — Dr. Elena Rostova, Lead Fact Verification Officer</p></blockquote>

<h2>Industry Impact & Future Outlook</h2>
<p>Pharmaceutical discovery teams, semiconductor design firms, and material science research centers are already piloting the technology to accelerate material synthesis simulations. Enterprise deployments are expected to begin in early Q4.</p>`,
    metaDescription: 'Discover how novel AI reasoning models achieved 94% accuracy on complex quantum physics benchmarks with verified multi-source reporting.',
    category: 'LLMs & Foundation Models',
    topicSlug: 'llm-foundation-models',
    trustScore: 98,
    verificationStatus: 'VERIFIED',
    featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Neural network weight visualization depicting dynamic reasoning graph branches during quantum problem solving.',
    author: DEFAULT_AUTHORS[0],
    sources: [
      {
        id: 'src-1',
        sourceName: 'ArXiv Preprints (cs.AI)',
        sourceUrl: 'https://arxiv.org/abs/2405.00001',
        claim: 'Model achieved 94.2% accuracy on quantum mechanics benchmark suite.',
        verified: true,
        publishedDate: '2026-07-26'
      },
      {
        id: 'src-2',
        sourceName: 'MIT CSAIL Official Bulletin',
        sourceUrl: 'https://csail.mit.edu/news/ai-quantum-benchmarks',
        claim: 'Self-correcting inference loop reduces mathematical hallucination by 88%.',
        verified: true,
        publishedDate: '2026-07-26'
      },
      {
        id: 'src-3',
        sourceName: 'IEEE Spectrum Research',
        sourceUrl: 'https://spectrum.ieee.org/ai-physics-breakthrough',
        claim: 'Independent verification confirmed sub-second proof generation latency.',
        verified: true,
        publishedDate: '2026-07-27'
      }
    ],
    publishedAt: '2026-07-27T08:30:00Z',
    updatedAt: '2026-07-27T09:15:00Z',
    readTimeMinutes: 5,
    views: 3420,
    isFeatured: true,
    keywords: ['AI Quantum Physics', 'Reasoning Models', 'LLM Benchmarks', 'Self-Correcting AI', 'Formal Logic'],
    faq: [
      {
        question: 'How was this article verified?',
        answer: 'This story was cross-referenced across 3 independent scientific sources including ArXiv preprints and MIT CSAIL official releases, achieving a 98% Trust Score.'
      },
      {
        question: 'Can this model be used for commercial research?',
        answer: 'Yes, open-weights releases with permissive licensing are scheduled for distribution through verified researcher access portals.'
      }
    ]
  },
  {
    id: 'art-2',
    title: 'Next-Gen 3nm AI Accelerators Promise 4x Performance Per Watt for Datacenter Inference',
    slug: 'next-gen-3nm-ai-accelerators-4x-performance-watt-datacenter',
    summary: 'Leading semiconductor foundries announce mass production of dedicated tensor processing units tailored specifically for long-context transformer architectures.',
    content: `<h2>Introduction</h2>
<p>Data center energy consumption has emerged as the primary bottleneck for scaling frontier AI models. Today's announcement of next-generation 3-nanometer specialized silicon marks a pivotal shift toward ultra-efficient inference hardware.</p>

<h2>Empirical Performance Claims Verified</h2>
<p>According to verified technical whitepapers and foundry yield reports, the new architecture delivers <strong>4.2x higher throughput per watt</strong> compared to existing 5nm chips when running 100k+ token context workloads.</p>

<h3>Key Architectural Improvements</h3>
<ul>
  <li><strong>On-Chip High Bandwidth Memory (HBM4):</strong> 3.2 Terabytes/sec memory bandwidth directly stacked over execution tiles.</li>
  <li><strong>Sparse Tensor Engine:</strong> Hardware-level acceleration for dynamic zero-weight skipping.</li>
  <li><strong>Liquid Cooling Ready:</strong> Designed natively for direct-to-chip liquid cooling loops.</li>
</ul>

<h2>Verification Audit</h2>
<p>Our fact-verification system authenticated test metrics across IEEE Semiconductor standards publications, foundry investor filings, and independent benchmarking labs.</p>`,
    metaDescription: 'New 3nm AI silicon accelerators deliver 4x throughput per watt for enterprise datacenter inference workloads.',
    category: 'AI Chips & Infrastructure',
    topicSlug: 'ai-chips-infrastructure',
    trustScore: 95,
    verificationStatus: 'VERIFIED',
    featuredImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Extreme ultraviolet lithography wafer used in manufacturing 3nm AI tensor accelerators.',
    author: DEFAULT_AUTHORS[1],
    sources: [
      {
        id: 'src-4',
        sourceName: 'IEEE Micro Journal',
        sourceUrl: 'https://computer.org/micro/3nm-ai-chips',
        claim: '4.2x efficiency gain verified on 100k token inference tests.',
        verified: true
      },
      {
        id: 'src-5',
        sourceName: 'Semiconductor Engineering Tech Wire',
        sourceUrl: 'https://semiengineering.com/hbm4-3nm-silicon',
        claim: 'Mass production yields exceeded 82% in initial wafer runs.',
        verified: true
      }
    ],
    publishedAt: '2026-07-27T06:15:00Z',
    updatedAt: '2026-07-27T06:15:00Z',
    readTimeMinutes: 4,
    views: 2150,
    isFeatured: false,
    keywords: ['3nm AI Chips', 'Datacenter Efficiency', 'HBM4 Memory', 'Tensor Processing', 'AI Hardware'],
    faq: [
      {
        question: 'When will these chips be available for cloud providers?',
        answer: 'Major hyperscalers are slated to begin deploying server racks powered by the 3nm chips in early Q1 2027.'
      }
    ]
  },
  {
    id: 'art-3',
    title: 'Autonomous Coding Agents Achieved 89% Pass Rate on Real-World GitHub Issue Resolution',
    slug: 'autonomous-coding-agents-achieved-89-pass-rate-github-issues',
    summary: 'Multi-agent developer frameworks are now autonomously identifying bugs, writing regression unit tests, and submitting verified pull requests in production repositories.',
    content: `<h2>The Rise of Production-Grade Autonomous Developers</h2>
<p>Software engineering is undergoing a fundamental transformation. Recent benchmark datasets evaluating autonomous agents against real-world open-source repositories demonstrate an 89.4% resolution rate without human intervention.</p>

<h2>Fact Verification & Testing Methodology</h2>
<p>Our automation engine verified these results across SWE-bench Leaderboard logs, GitHub public pull request audits, and independent security vulnerability scans. No hallucinations or unverified claims were detected.</p>`,
    metaDescription: 'Autonomous AI software engineering agents achieve 89% success on real GitHub issues with verified multi-agent orchestration.',
    category: 'Autonomous AI Agents',
    topicSlug: 'autonomous-ai-agents',
    trustScore: 96,
    verificationStatus: 'VERIFIED',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Real-time multi-agent code syntax tree generation and unit test execution terminal.',
    author: DEFAULT_AUTHORS[0],
    sources: [
      {
        id: 'src-6',
        sourceName: 'SWE-bench Official Leaderboard',
        sourceUrl: 'https://swebench.com/results-2026',
        claim: '89.4% issue resolution on 500 benchmarked Python and TypeScript repos.',
        verified: true
      }
    ],
    publishedAt: '2026-07-26T18:00:00Z',
    updatedAt: '2026-07-26T18:00:00Z',
    readTimeMinutes: 6,
    views: 4890,
    isFeatured: false,
    keywords: ['AI Software Engineering', 'Autonomous Agents', 'SWE-bench', 'Code Generation', 'Automated Testing'],
    faq: []
  }
];

const DEFAULT_VERIFICATION_LOGS: VerificationLog[] = [
  {
    id: 'vlog-1',
    articleId: 'art-1',
    claim: 'Model achieved 94.2% accuracy on quantum mechanics benchmark suite.',
    status: 'VERIFIED',
    score: 98,
    sourcesChecked: 3,
    matchingSources: 3,
    hallucinationRisk: 'LOW',
    notes: 'Cross-verified across ArXiv preprints, MIT CSAIL, and IEEE Spectrum.',
    checkedAt: '2026-07-27T08:25:00Z'
  },
  {
    id: 'vlog-2',
    articleId: 'art-2',
    claim: '4.2x efficiency gain verified on 100k token inference tests.',
    status: 'VERIFIED',
    score: 95,
    sourcesChecked: 2,
    matchingSources: 2,
    hallucinationRisk: 'LOW',
    notes: 'Validated against official whitepaper data and IEEE Micro publication.',
    checkedAt: '2026-07-27T06:10:00Z'
  }
];

const DEFAULT_AUTOMATION_LOGS: AutomationLog[] = [
  {
    id: 'log-1',
    taskName: 'Daily Trending AI News Research',
    status: 'SUCCESS',
    durationMs: 1420,
    details: 'Scanned 14 RSS feeds (TechCrunch, VentureBeat, ArXiv). Identified 5 high-demand topics.',
    timestamp: '2026-07-27T08:00:00Z'
  },
  {
    id: 'log-2',
    taskName: 'Fact Verification & Fake News Shield',
    status: 'SUCCESS',
    durationMs: 2310,
    details: 'Verified 8 core claims across 12 distinct sources. Trust Score average: 96.5%.',
    timestamp: '2026-07-27T08:05:00Z'
  },
  {
    id: 'log-3',
    taskName: 'AI Content Generation & Image Automation',
    status: 'SUCCESS',
    durationMs: 3890,
    details: 'Generated SEO-structured article with Groq/Fallback AI model. Selected 1200px+ Unsplash image.',
    timestamp: '2026-07-27T08:28:00Z'
  }
];

function ensureDbExists(): DatabaseSchema {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DB_PATH)) {
    const initialData: DatabaseSchema = {
      articles: DEFAULT_ARTICLES,
      authors: DEFAULT_AUTHORS,
      topics: DEFAULT_TOPICS,
      verificationLogs: DEFAULT_VERIFICATION_LOGS,
      automationLogs: DEFAULT_AUTOMATION_LOGS,
      stats: {
        totalArticles: DEFAULT_ARTICLES.length,
        verifiedArticles: DEFAULT_ARTICLES.filter(a => a.verificationStatus === 'VERIFIED').length,
        needsReviewArticles: 0,
        avgTrustScore: 96,
        dailyAutomations: 12,
        totalViews: 10460,
        lastRunTimestamp: new Date().toISOString(),
        groqApiStatus: process.env.GROQ_API_KEY ? 'CONNECTED' : 'FALLBACK_ACTIVE'
      }
    };
    writeDb(initialData);
    return initialData;
  }

  try {
    const fileContent = fs.readFileSync(DB_PATH, 'utf-8');
    const parsed = JSON.parse(fileContent) as DatabaseSchema;
    if (!parsed.articles) parsed.articles = DEFAULT_ARTICLES;
    if (!parsed.authors) parsed.authors = DEFAULT_AUTHORS;
    if (!parsed.topics) parsed.topics = DEFAULT_TOPICS;
    if (!parsed.verificationLogs) parsed.verificationLogs = DEFAULT_VERIFICATION_LOGS;
    if (!parsed.automationLogs) parsed.automationLogs = DEFAULT_AUTOMATION_LOGS;
    return parsed;
  } catch (err) {
    console.error('Error reading db.json, re-initializing', err);
    const fallbackData: DatabaseSchema = {
      articles: DEFAULT_ARTICLES,
      authors: DEFAULT_AUTHORS,
      topics: DEFAULT_TOPICS,
      verificationLogs: DEFAULT_VERIFICATION_LOGS,
      automationLogs: DEFAULT_AUTOMATION_LOGS,
      stats: {
        totalArticles: DEFAULT_ARTICLES.length,
        verifiedArticles: DEFAULT_ARTICLES.length,
        needsReviewArticles: 0,
        avgTrustScore: 96,
        dailyAutomations: 12,
        totalViews: 10460,
        lastRunTimestamp: new Date().toISOString(),
        groqApiStatus: 'FALLBACK_ACTIVE'
      }
    };
    writeDb(fallbackData);
    return fallbackData;
  }
}

// Atomic File Writer to prevent partial writes & race conditions
function writeDb(data: DatabaseSchema) {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const tempPath = `${DB_PATH}.tmp.${Date.now()}.${Math.random().toString(36).slice(2, 6)}`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
  try {
    fs.renameSync(tempPath, DB_PATH);
  } catch {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
}

export const db = {
  getArticles: (category?: string, topicSlug?: string): Article[] => {
    const data = ensureDbExists();
    let res = data.articles;
    if (category) res = res.filter(a => a.category.toLowerCase() === category.toLowerCase());
    if (topicSlug) res = res.filter(a => a.topicSlug.toLowerCase() === topicSlug.toLowerCase());
    return res.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  },

  getArticleBySlug: (slug: string): Article | undefined => {
    const data = ensureDbExists();
    const cleanSlug = decodeURIComponent(slug).toLowerCase();
    return data.articles.find(a => a.slug.toLowerCase() === cleanSlug);
  },

  getArticleById: (id: string): Article | undefined => {
    const data = ensureDbExists();
    return data.articles.find(a => a.id === id);
  },

  saveArticle: (article: Article): Article => {
    const data = ensureDbExists();
    const index = data.articles.findIndex(a => a.id === article.id);
    if (index >= 0) {
      data.articles[index] = article;
    } else {
      data.articles.unshift(article);
    }
    data.stats.totalArticles = data.articles.length;
    data.stats.verifiedArticles = data.articles.filter(a => a.verificationStatus === 'VERIFIED').length;
    data.stats.needsReviewArticles = data.articles.filter(a => a.verificationStatus === 'NEEDS_REVIEW').length;
    writeDb(data);
    return article;
  },

  deleteArticle: (id: string): boolean => {
    const data = ensureDbExists();
    data.articles = data.articles.filter(a => a.id !== id);
    data.stats.totalArticles = data.articles.length;
    data.stats.verifiedArticles = data.articles.filter(a => a.verificationStatus === 'VERIFIED').length;
    writeDb(data);
    return true;
  },

  getAuthors: (): Author[] => {
    const data = ensureDbExists();
    return data.authors;
  },

  getAuthorBySlug: (slug: string): Author | undefined => {
    const data = ensureDbExists();
    const cleanSlug = decodeURIComponent(slug).toLowerCase();
    return data.authors.find(a => a.slug.toLowerCase() === cleanSlug);
  },

  getTopics: (): TopicCluster[] => {
    const data = ensureDbExists();
    return data.topics;
  },

  getTopicBySlug: (slug: string): TopicCluster | undefined => {
    const data = ensureDbExists();
    const cleanSlug = decodeURIComponent(slug).toLowerCase();
    return data.topics.find(t => t.slug.toLowerCase() === cleanSlug);
  },

  getVerificationLogs: (): VerificationLog[] => {
    const data = ensureDbExists();
    return data.verificationLogs;
  },

  addVerificationLog: (log: VerificationLog) => {
    const data = ensureDbExists();
    data.verificationLogs.unshift(log);
    writeDb(data);
  },

  getAutomationLogs: (): AutomationLog[] => {
    const data = ensureDbExists();
    return data.automationLogs;
  },

  addAutomationLog: (log: AutomationLog) => {
    const data = ensureDbExists();
    data.automationLogs.unshift(log);
    data.stats.lastRunTimestamp = new Date().toISOString();
    data.stats.dailyAutomations += 1;
    writeDb(data);
  },

  getStats: (): SystemStats => {
    const data = ensureDbExists();
    data.stats.groqApiStatus = process.env.GROQ_API_KEY ? 'CONNECTED' : 'FALLBACK_ACTIVE';
    return data.stats;
  }
};
