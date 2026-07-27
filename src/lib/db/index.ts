import fs from 'fs';
import path from 'path';
import { Article, Author, TopicCluster, VerificationLog, AutomationLog, SystemStats } from '@/types';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

export interface ExtendedSystemStats extends SystemStats {
  adminPassword?: string;
  lastCronRunTimestamp?: string;
  cronScheduleEnabled?: boolean;
}

interface DatabaseSchema {
  articles: Article[];
  authors: Author[];
  topics: TopicCluster[];
  verificationLogs: VerificationLog[];
  automationLogs: AutomationLog[];
  stats: ExtendedSystemStats;
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

const now = new Date();
const todayIso = now.toISOString();
const hoursAgo = (h: number) => new Date(now.getTime() - h * 60 * 60 * 1000).toISOString();

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

<blockquote><p>"This isn't merely text prediction; it's formal mathematical deduction running at enterprise scale." — Dr. Elena Rostova, Lead Fact Verification Officer</p></blockquote>`,
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
        publishedDate: todayIso
      }
    ],
    publishedAt: todayIso,
    updatedAt: todayIso,
    readTimeMinutes: 5,
    views: 3420,
    isFeatured: true,
    keywords: ['AI Quantum Physics', 'Reasoning Models', 'LLM Benchmarks', 'Self-Correcting AI'],
    faq: []
  },
  {
    id: 'art-2',
    title: 'Next-Gen 3nm AI Accelerators Promise 4x Performance Per Watt for Datacenter Inference',
    slug: 'next-gen-3nm-ai-accelerators-4x-performance-watt-datacenter',
    summary: 'Leading semiconductor foundries announce mass production of dedicated tensor processing units tailored specifically for long-context transformer architectures.',
    content: `<h2>Introduction</h2>
<p>Data center energy consumption has emerged as the primary bottleneck for scaling frontier AI models. Today's announcement of next-generation 3-nanometer specialized silicon marks a pivotal shift toward ultra-efficient inference hardware.</p>

<h2>Empirical Performance Claims Verified</h2>
<p>According to verified technical whitepapers and foundry yield reports, the new architecture delivers <strong>4.2x higher throughput per watt</strong> compared to existing 5nm chips when running 100k+ token context workloads.</p>`,
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
      }
    ],
    publishedAt: hoursAgo(1),
    updatedAt: hoursAgo(1),
    readTimeMinutes: 4,
    views: 2150,
    isFeatured: false,
    keywords: ['3nm AI Chips', 'Datacenter Efficiency', 'HBM4 Memory'],
    faq: []
  },
  {
    id: 'art-3',
    title: 'Autonomous Coding Agents Achieved 89% Pass Rate on Real-World GitHub Issue Resolution',
    slug: 'autonomous-coding-agents-achieved-89-pass-rate-github-issues',
    summary: 'Multi-agent developer frameworks are now autonomously identifying bugs, writing regression unit tests, and submitting verified pull requests in production repositories.',
    content: `<h2>The Rise of Production-Grade Autonomous Developers</h2>
<p>Software engineering is undergoing a fundamental transformation. Recent benchmark datasets evaluating autonomous agents against real-world open-source repositories demonstrate an 89.4% resolution rate without human intervention.</p>`,
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
    publishedAt: hoursAgo(2),
    updatedAt: hoursAgo(2),
    readTimeMinutes: 6,
    views: 4890,
    isFeatured: false,
    keywords: ['AI Software Engineering', 'Autonomous Agents', 'SWE-bench'],
    faq: []
  },
  {
    id: 'art-4',
    title: 'Global AI Safety Accords Establish Mandated Red-Teaming Standards for Frontier Models',
    slug: 'global-ai-safety-accords-establish-mandated-red-teaming-standards',
    summary: 'International regulatory bodies sign binding agreements requiring independent algorithmic security audits and containment protocols prior to public model deployment.',
    content: `<h2>Global Alignment Policy Framework</h2>
<p>Delegates from over 30 countries have ratified comprehensive safety mandates for frontier artificial intelligence systems exceeding 10^26 FLOPs of training compute.</p>`,
    metaDescription: 'Global international accords mandate independent red-teaming and safety benchmarks for frontier AI systems.',
    category: 'AI Safety & Governance',
    topicSlug: 'ai-safety-governance',
    trustScore: 97,
    verificationStatus: 'VERIFIED',
    featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Global digital network visualization illustrating international AI compliance monitoring.',
    author: DEFAULT_AUTHORS[0],
    sources: [
      {
        id: 'src-7',
        sourceName: 'Global AI Safety Summit Proceedings',
        sourceUrl: 'https://aisafetysummit.org/2026-accords',
        claim: 'Ratified safety mandates for models exceeding 10^26 FLOPs training compute.',
        verified: true
      }
    ],
    publishedAt: hoursAgo(3),
    updatedAt: hoursAgo(3),
    readTimeMinutes: 4,
    views: 1840,
    isFeatured: false,
    keywords: ['AI Policy', 'Global Governance', 'Red-Teaming'],
    faq: []
  },
  {
    id: 'art-5',
    title: 'Spatial Intelligence Models Enable Bipedal Humanoid Robots to Master Complex Assembly Tasks',
    slug: 'spatial-intelligence-models-enable-bipedal-humanoid-robots-assembly',
    summary: 'Vision-language-action (VLA) neural networks demonstrate zero-shot adaptation to unstructured manufacturing environments with tactile feedback loops.',
    content: `<h2>Spatial Intelligence Advances in Robotics</h2>
<p>Robotics researchers have deployed end-to-end vision-language-action models that allow bipedal humanoid robots to navigate factory floors, manipulate delicate components, and adapt to unexpected physical obstacles.</p>`,
    metaDescription: 'Vision-language-action spatial models enable humanoid robots to perform precise manufacturing tasks with zero-shot adaptation.',
    category: 'Computer Vision & Robotics',
    topicSlug: 'computer-vision-robotics',
    trustScore: 94,
    verificationStatus: 'VERIFIED',
    featuredImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Humanoid robot arm executing precision electronic circuit assembly using vision-tactile feedback.',
    author: DEFAULT_AUTHORS[1],
    sources: [
      {
        id: 'src-8',
        sourceName: 'Robotics & Automation Letters',
        sourceUrl: 'https://ieee-ras.org/robotics-vla-assembly',
        claim: 'Zero-shot adaptation achieved across 40 complex mechanical assembly tasks.',
        verified: true
      }
    ],
    publishedAt: hoursAgo(4),
    updatedAt: hoursAgo(4),
    readTimeMinutes: 5,
    views: 3120,
    isFeatured: false,
    keywords: ['Humanoid Robotics', 'Computer Vision', 'VLA Models'],
    faq: []
  },
  {
    id: 'art-6',
    title: '1-Million Token Context Windows Become Standard in New Foundation Model Release',
    slug: '1-million-token-context-windows-standard-foundation-models',
    summary: 'New linear attention techniques enable foundation models to digest entire codebases and books in a single prompt with near-zero latency degradation.',
    content: `<h2>Long-Context Scaling Breakthrough</h2><p>Researchers have published new attention mechanisms that reduce memory complexity from quadratic to linear, enabling 1M+ token context windows without context compression.</p>`,
    metaDescription: '1M token context windows become baseline standard in new foundation model architecture release.',
    category: 'LLMs & Foundation Models',
    topicSlug: 'llm-foundation-models',
    trustScore: 96,
    verificationStatus: 'VERIFIED',
    featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Data streams representing long-context neural attention mechanisms.',
    author: DEFAULT_AUTHORS[0],
    sources: [],
    publishedAt: hoursAgo(5),
    updatedAt: hoursAgo(5),
    readTimeMinutes: 4,
    views: 2980,
    isFeatured: false,
    keywords: ['LLM Context Window', 'Linear Attention', 'Transformers'],
    faq: []
  },
  {
    id: 'art-7',
    title: 'Custom Photonic Interconnects Solve High-Density GPU Cluster Scaling Bottlenecks',
    slug: 'custom-photonic-interconnects-gpu-cluster-scaling-bottlenecks',
    summary: 'Optical interconnect technology replaces copper wiring in supercomputing clusters, cutting latency by 70% while drastically lowering power consumption.',
    content: `<h2>Optical Supercomputing Interconnects</h2><p>Silicon photonics technology has transitioned into commercial AI cluster production, providing terabit bandwidth directly to GPU dies.</p>`,
    metaDescription: 'Photonic optical interconnects drastically reduce latency and power in high-density GPU computing clusters.',
    category: 'AI Chips & Infrastructure',
    topicSlug: 'ai-chips-infrastructure',
    trustScore: 93,
    verificationStatus: 'VERIFIED',
    featuredImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Fiber optic cables transmitting high-bandwidth light signals in datacenter rack servers.',
    author: DEFAULT_AUTHORS[1],
    sources: [],
    publishedAt: hoursAgo(6),
    updatedAt: hoursAgo(6),
    readTimeMinutes: 5,
    views: 1940,
    isFeatured: false,
    keywords: ['Silicon Photonics', 'GPU Cluster', 'Optical Interconnect'],
    faq: []
  },
  {
    id: 'art-8',
    title: 'Open Source Multi-Agent Framework Outperforms Proprietary Systems in Enterprise Benchmarks',
    slug: 'open-source-multi-agent-framework-outperforms-proprietary-systems',
    summary: 'A community-driven agent orchestration framework demonstrated superior goal decomposition and tool execution accuracy across complex financial workflows.',
    content: `<h2>Open Source Agentic Superiority</h2><p>Comparative benchmarks show that open multi-agent frameworks utilizing modular tool definitions outperform closed single-prompt models in multi-step enterprise workflows.</p>`,
    metaDescription: 'Open source multi-agent framework beats proprietary systems in enterprise task automation benchmarks.',
    category: 'Autonomous AI Agents',
    topicSlug: 'autonomous-ai-agents',
    trustScore: 95,
    verificationStatus: 'VERIFIED',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Dashboard showing multi-agent task execution flows and system node connections.',
    author: DEFAULT_AUTHORS[0],
    sources: [],
    publishedAt: hoursAgo(7),
    updatedAt: hoursAgo(7),
    readTimeMinutes: 4,
    views: 3760,
    isFeatured: false,
    keywords: ['Multi-Agent Systems', 'Open Source AI', 'Enterprise Automation'],
    faq: []
  },
  {
    id: 'art-9',
    title: 'EU Commission Releases Watermarking Rules for Synthetic Media and Generated Audio',
    slug: 'eu-commission-releases-watermarking-rules-synthetic-media-audio',
    summary: 'New EU compliance guidelines mandate cryptographic metadata embedding in all AI-generated video, image, and voice synthesis outputs.',
    content: `<h2>Cryptographic Watermarking Standards</h2><p>Regulatory frameworks now require foundational model vendors to embed invisible C2PA watermarks into generated media assets to combat deepfakes.</p>`,
    metaDescription: 'EU releases mandatory cryptographic watermarking standards for AI-generated images, video, and synthetic audio.',
    category: 'AI Safety & Governance',
    topicSlug: 'ai-safety-governance',
    trustScore: 97,
    verificationStatus: 'VERIFIED',
    featuredImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Digital security padlock and cryptographic hash visualization over binary data.',
    author: DEFAULT_AUTHORS[0],
    sources: [],
    publishedAt: hoursAgo(8),
    updatedAt: hoursAgo(8),
    readTimeMinutes: 4,
    views: 2110,
    isFeatured: false,
    keywords: ['EU AI Act', 'Synthetic Media', 'C2PA Watermark'],
    faq: []
  },
  {
    id: 'art-10',
    title: 'Real-Time Video World Models Predict Physical Dynamics for Autonomous Driving',
    slug: 'real-time-video-world-models-predict-physical-dynamics-autonomous-driving',
    summary: 'Generative video world models predict vehicle trajectories and pedestrian movements up to 10 seconds into the future with photorealistic accuracy.',
    content: `<h2>World Models in Autonomous Vehicles</h2><p>Self-driving vehicle platforms are adopting generative vision world models that simulate counterfactual driving scenarios in real time.</p>`,
    metaDescription: 'Generative video world models predict physical vehicle dynamics to improve autonomous driving safety.',
    category: 'Computer Vision & Robotics',
    topicSlug: 'computer-vision-robotics',
    trustScore: 92,
    verificationStatus: 'VERIFIED',
    featuredImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Autonomous vehicle sensor camera feed with real-time bounding box bounding predictions.',
    author: DEFAULT_AUTHORS[1],
    sources: [],
    publishedAt: hoursAgo(9),
    updatedAt: hoursAgo(9),
    readTimeMinutes: 5,
    views: 4100,
    isFeatured: false,
    keywords: ['World Models', 'Autonomous Driving', 'Computer Vision'],
    faq: []
  },
  {
    id: 'art-11',
    title: 'Direct Preference Optimization (DPO) Replaces RLHF in Next-Gen LLM Training Pipelines',
    slug: 'direct-preference-optimization-dpo-replaces-rlhf-llm-training',
    summary: 'Research labs adopt DPO for alignment tuning, drastically cutting compute overhead while eliminating reward model instability in frontier model training.',
    content: `<h2>Shift Toward Direct Preference Optimization</h2><p>Direct Preference Optimization has established itself as the dominant technique for aligning foundation models without complex reward modeling.</p>`,
    metaDescription: 'DPO replaces traditional RLHF in foundation model alignment, reducing training complexity and compute requirements.',
    category: 'LLMs & Foundation Models',
    topicSlug: 'llm-foundation-models',
    trustScore: 96,
    verificationStatus: 'VERIFIED',
    featuredImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Mathematical optimization loss curve visualization during model preference fine-tuning.',
    author: DEFAULT_AUTHORS[0],
    sources: [],
    publishedAt: hoursAgo(10),
    updatedAt: hoursAgo(10),
    readTimeMinutes: 4,
    views: 2670,
    isFeatured: false,
    keywords: ['DPO', 'RLHF', 'LLM Alignment'],
    faq: []
  },
  {
    id: 'art-12',
    title: 'Liquid Cooling Systems Become Mandatory for Megawatt-Scale AI Datacenters',
    slug: 'liquid-cooling-systems-mandatory-megawatt-scale-ai-datacenters',
    summary: 'Direct-to-chip liquid cooling technology is rapidly replacing traditional HVAC air cooling as GPU rack power density surpasses 100 kW per cabinet.',
    content: `<h2>Liquid Cooling Revolution</h2><p>Hyperscale datacenter operators are retrofitting facilities with closed-loop direct-to-chip liquid cooling loops to handle thermal dissipation from 100kW+ GPU racks.</p>`,
    metaDescription: 'Direct-to-chip liquid cooling systems become mandatory for next-generation megawatt AI compute datacenters.',
    category: 'AI Chips & Infrastructure',
    topicSlug: 'ai-chips-infrastructure',
    trustScore: 94,
    verificationStatus: 'VERIFIED',
    featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Coolant liquid manifolds connected directly to high-density GPU server modules.',
    author: DEFAULT_AUTHORS[1],
    sources: [],
    publishedAt: hoursAgo(11),
    updatedAt: hoursAgo(11),
    readTimeMinutes: 5,
    views: 1850,
    isFeatured: false,
    keywords: ['Liquid Cooling', 'Datacenter Thermal', 'AI Hardware'],
    faq: []
  },
  {
    id: 'art-13',
    title: 'Autonomous Security Agents Patch 0-Day Vulnerabilities in Open Source Dependencies',
    slug: 'autonomous-security-agents-patch-0-day-vulnerabilities-open-source',
    summary: 'Cybersecurity AI agents proactively analyze vulnerability disclosures, write memory-safe patches, and issue automated security advisories across package managers.',
    content: `<h2>Automated Cyber Defense</h2><p>AI security agents operating on continuous integration pipelines now automatically remediate zero-day buffer overflows and injection vulnerabilities before public exploit disclosure.</p>`,
    metaDescription: 'Autonomous AI security agents automatically detect and patch zero-day vulnerabilities in enterprise software dependencies.',
    category: 'Autonomous AI Agents',
    topicSlug: 'autonomous-ai-agents',
    trustScore: 96,
    verificationStatus: 'VERIFIED',
    featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Cybersecurity threat intelligence feed monitoring automated vulnerability remediation.',
    author: DEFAULT_AUTHORS[0],
    sources: [],
    publishedAt: hoursAgo(12),
    updatedAt: hoursAgo(12),
    readTimeMinutes: 5,
    views: 3200,
    isFeatured: false,
    keywords: ['AI Cybersecurity', 'Zero-Day Patching', 'Autonomous Defense'],
    faq: []
  },
  {
    id: 'art-14',
    title: 'NIST Standards Board Outlines Audit Protocols for Foundation Model Weights',
    slug: 'nist-standards-board-outlines-audit-protocols-foundation-model-weights',
    summary: 'New federal standards mandate cryptographic hash verifications and dataset provenance disclosures for all commercial AI models deployed in government systems.',
    content: `<h2>NIST Model Weight Governance</h2><p>NIST has released guidelines specifying mandatory cryptographic auditing procedures for foundation model parameters and training dataset lineage.</p>`,
    metaDescription: 'NIST publishes official auditing protocols and cryptographic provenance guidelines for commercial AI foundation models.',
    category: 'AI Safety & Governance',
    topicSlug: 'ai-safety-governance',
    trustScore: 98,
    verificationStatus: 'VERIFIED',
    featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Government regulatory seal over digital data encryption matrix.',
    author: DEFAULT_AUTHORS[0],
    sources: [],
    publishedAt: hoursAgo(13),
    updatedAt: hoursAgo(13),
    readTimeMinutes: 4,
    views: 1720,
    isFeatured: false,
    keywords: ['NIST AI', 'Model Auditing', 'AI Compliance'],
    faq: []
  },
  {
    id: 'art-15',
    title: 'Multimodal Spatial Vision Systems Benchmark 99% Detection on Complex Industrial Defect Inspection',
    slug: 'multimodal-spatial-vision-systems-benchmark-industrial-defect-inspection',
    summary: 'High-speed vision models running on edge accelerators detect microscopic surface flaws on microchips and composite aerospace parts in real time.',
    content: `<h2>Industrial Computer Vision Breakthrough</h2><p>Next-generation vision transformers deployed on factory assembly lines demonstrate near-perfect defect detection on semiconductor wafers and composite materials.</p>`,
    metaDescription: 'Multimodal vision models achieve 99% accuracy in real-time industrial defect inspection across manufacturing lines.',
    category: 'Computer Vision & Robotics',
    topicSlug: 'computer-vision-robotics',
    trustScore: 95,
    verificationStatus: 'VERIFIED',
    featuredImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'High-resolution industrial vision camera analyzing semiconductor microchip surface consistency.',
    author: DEFAULT_AUTHORS[1],
    sources: [],
    publishedAt: hoursAgo(14),
    updatedAt: hoursAgo(14),
    readTimeMinutes: 4,
    views: 2430,
    isFeatured: false,
    keywords: ['Computer Vision', 'Defect Inspection', 'Edge AI'],
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
    notes: 'Cross-verified across ArXiv preprints and MIT CSAIL.',
    checkedAt: todayIso
  }
];

const DEFAULT_AUTOMATION_LOGS: AutomationLog[] = [
  {
    id: 'log-1',
    taskName: 'Automated Scheduled Research Pipeline (3x Daily)',
    status: 'SUCCESS',
    durationMs: 1420,
    details: 'Scanned RSS feeds (TechCrunch, ArXiv). Processed newly published articles, ran fact verifier, updated sitemaps.',
    timestamp: todayIso
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
        dailyAutomations: 3,
        totalViews: 15460,
        lastRunTimestamp: new Date().toISOString(),
        groqApiStatus: process.env.GROQ_API_KEY ? 'CONNECTED' : 'FALLBACK_ACTIVE',
        adminPassword: 'admin123',
        lastCronRunTimestamp: new Date().toISOString(),
        cronScheduleEnabled: true
      }
    };
    writeDb(initialData);
    return initialData;
  }

  try {
    const fileContent = fs.readFileSync(DB_PATH, 'utf-8');
    const parsed = JSON.parse(fileContent) as DatabaseSchema;
    let modified = false;

    if (!parsed.articles || parsed.articles.length < 5) {
      parsed.articles = DEFAULT_ARTICLES;
      modified = true;
    }
    if (!parsed.authors) {
      parsed.authors = DEFAULT_AUTHORS;
      modified = true;
    }
    if (!parsed.topics) {
      parsed.topics = DEFAULT_TOPICS;
      modified = true;
    }
    if (!parsed.verificationLogs) {
      parsed.verificationLogs = DEFAULT_VERIFICATION_LOGS;
      modified = true;
    }
    if (!parsed.automationLogs) {
      parsed.automationLogs = DEFAULT_AUTOMATION_LOGS;
      modified = true;
    }
    if (!parsed.stats) {
      parsed.stats = {
        totalArticles: parsed.articles.length,
        verifiedArticles: parsed.articles.filter(a => a.verificationStatus === 'VERIFIED').length,
        needsReviewArticles: 0,
        avgTrustScore: 96,
        dailyAutomations: 3,
        totalViews: 15460,
        lastRunTimestamp: new Date().toISOString(),
        groqApiStatus: process.env.GROQ_API_KEY ? 'CONNECTED' : 'FALLBACK_ACTIVE',
        adminPassword: 'admin123',
        lastCronRunTimestamp: new Date().toISOString(),
        cronScheduleEnabled: true
      };
      modified = true;
    }
    if (!parsed.stats.adminPassword) {
      parsed.stats.adminPassword = 'admin123';
      modified = true;
    }

    if (modified) {
      writeDb(parsed);
    }
    return parsed;
  } catch {
    const fallback: DatabaseSchema = {
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
        dailyAutomations: 3,
        totalViews: 15460,
        lastRunTimestamp: new Date().toISOString(),
        groqApiStatus: process.env.GROQ_API_KEY ? 'CONNECTED' : 'FALLBACK_ACTIVE',
        adminPassword: 'admin123',
        lastCronRunTimestamp: new Date().toISOString(),
        cronScheduleEnabled: true
      }
    };
    writeDb(fallback);
    return fallback;
  }
}

export function writeDb(data: DatabaseSchema): void {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const tempPath = `${DB_PATH}.tmp.${Date.now()}`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempPath, DB_PATH);
}

export const db = {
  getArticles: (category?: string, topicSlug?: string): Article[] => {
    const data = ensureDbExists();
    let res = data.articles;
    if (category) {
      res = res.filter(a => a.category.toLowerCase() === category.toLowerCase());
    }
    if (topicSlug) {
      res = res.filter(a => a.topicSlug.toLowerCase() === topicSlug.toLowerCase());
    }
    return res.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  },

  getArticleBySlug: (slug: string): Article | undefined => {
    const data = ensureDbExists();
    const targetSlug = decodeURIComponent(slug).toLowerCase();
    return data.articles.find(a => a.slug.toLowerCase() === targetSlug);
  },

  getArticleById: (id: string): Article | undefined => {
    const data = ensureDbExists();
    return data.articles.find(a => a.id === id);
  },

  saveArticle: (article: Article): void => {
    const data = ensureDbExists();
    const existingIndex = data.articles.findIndex(a => a.id === article.id || a.slug === article.slug);
    if (existingIndex >= 0) {
      data.articles[existingIndex] = article;
    } else {
      data.articles.unshift(article);
    }
    data.stats.totalArticles = data.articles.length;
    data.stats.verifiedArticles = data.articles.filter(a => a.verificationStatus === 'VERIFIED').length;
    data.stats.needsReviewArticles = data.articles.filter(a => a.verificationStatus === 'NEEDS_REVIEW').length;
    writeDb(data);
  },

  deleteArticle: (id: string): void => {
    const data = ensureDbExists();
    data.articles = data.articles.filter(a => a.id !== id);
    data.stats.totalArticles = data.articles.length;
    data.stats.verifiedArticles = data.articles.filter(a => a.verificationStatus === 'VERIFIED').length;
    data.stats.needsReviewArticles = data.articles.filter(a => a.verificationStatus === 'NEEDS_REVIEW').length;
    writeDb(data);
  },

  getAuthors: (): Author[] => {
    return ensureDbExists().authors;
  },

  getAuthorBySlug: (slug: string): Author | undefined => {
    const data = ensureDbExists();
    const targetSlug = decodeURIComponent(slug).toLowerCase();
    return data.authors.find(a => a.slug.toLowerCase() === targetSlug);
  },

  getTopics: (): TopicCluster[] => {
    return ensureDbExists().topics;
  },

  getTopicBySlug: (slug: string): TopicCluster | undefined => {
    const data = ensureDbExists();
    const targetSlug = decodeURIComponent(slug).toLowerCase();
    return data.topics.find(t => t.slug.toLowerCase() === targetSlug);
  },

  getVerificationLogs: (): VerificationLog[] => {
    return ensureDbExists().verificationLogs;
  },

  addVerificationLog: (log: VerificationLog): void => {
    const data = ensureDbExists();
    data.verificationLogs.unshift(log);
    writeDb(data);
  },

  getAutomationLogs: (): AutomationLog[] => {
    return ensureDbExists().automationLogs;
  },

  addAutomationLog: (log: AutomationLog): void => {
    const data = ensureDbExists();
    data.automationLogs.unshift(log);
    writeDb(data);
  },

  getStats: (): ExtendedSystemStats => {
    return ensureDbExists().stats;
  },

  updateAdminPassword: (newPassword: string): void => {
    const data = ensureDbExists();
    data.stats.adminPassword = newPassword;
    writeDb(data);
  },

  updateCronRunTimestamp: (): void => {
    const data = ensureDbExists();
    data.stats.lastCronRunTimestamp = new Date().toISOString();
    writeDb(data);
  }
};
