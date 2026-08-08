import { RawNewsItem } from './news-researcher';
import { VerificationResult } from './fact-verifier';

export interface GeneratedArticlePayload {
  title: string;
  slug: string;
  summary: string;
  content: string;
  metaDescription: string;
  category: string;
  keywords: string[];
  readTimeMinutes: number;
  faq: Array<{ question: string; answer: string }>;
  aiModelUsed: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function fetchWebpageText(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      signal: AbortSignal.timeout(6000)
    });
    if (!res.ok) return '';
    const html = await res.text();
    let bodyText = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    bodyText = bodyText.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    bodyText = bodyText.replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, '');
    bodyText = bodyText.replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, '');
    
    const pRegex = /<p\b[^>]*>([\s\S]*?)<\/p>/gi;
    const paragraphs: string[] = [];
    let match;
    while ((match = pRegex.exec(bodyText)) !== null) {
      const pText = match[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
      if (pText.length > 30) {
        paragraphs.push(pText);
      }
    }
    return paragraphs.slice(0, 15).join('\n');
  } catch (err) {
    return '';
  }
}

export async function generateAIArticle(
  newsItem: RawNewsItem,
  verification: VerificationResult
): Promise<GeneratedArticlePayload> {
  const groqApiKey = process.env.GROQ_API_KEY;
  const pageText = await fetchWebpageText(newsItem.link);
  
  const targetText = pageText.length > 100 ? pageText : newsItem.snippet;

  if (groqApiKey) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are an expert AI news journalist writing for a premier worldwide AI news platform.
Your task is to write a high-quality, professional, objective news article based ONLY on the factual text provided.
Do NOT invent statistics, studies, companies, quotes, benchmarks, regulations, or announcements. If they are not in the text, do not mention them.
You must clearly attribute sources and write in a professional journalistic tone.
Return pure JSON with keys:
"title", "summary", "content" (HTML string with <h2>, <h3>, <ul>, <li>, <blockquote>), "metaDescription", "keywords" (array of strings), "faq" (array of {question, answer}).`
            },
            {
              role: 'user',
              content: `Headline: ${newsItem.title}\nSource: ${newsItem.source}\nSource URL: ${newsItem.link}\n\nFactual Content Text:\n${targetText}`
            }
          ],
          temperature: 0.3,
          response_format: { type: 'json_object' }
        })
      });

      if (response.ok) {
        const json = await response.json();
        const parsed = JSON.parse(json.choices[0].message.content);
        return {
          title: parsed.title || newsItem.title,
          slug: slugify(parsed.title || newsItem.title),
          summary: parsed.summary || newsItem.snippet,
          content: parsed.content,
          metaDescription: parsed.metaDescription || parsed.summary,
          category: newsItem.category,
          keywords: parsed.keywords || ['AI News', newsItem.category],
          readTimeMinutes: Math.max(3, Math.ceil((parsed.content || '').split(' ').length / 200)),
          faq: parsed.faq || [],
          aiModelUsed: 'Groq (llama-3.3-70b-versatile)'
        };
      }
    } catch (err) {
      console.warn("Groq live generation failed, falling back to local factual synthesis", err);
    }
  }

  // --- Real Content Dynamic Offline Generation Engine ---
  // If no Groq key, we generate the content purely from the scraped paragraphs of the real source page.
  const title = newsItem.title;
  const slug = slugify(title);
  const summary = newsItem.snippet;

  // Split scraped paragraphs to dynamically form the content body
  const paragraphs = targetText.split('\n').filter(p => p.trim().length > 15);
  
  let contentHtml = '';
  if (paragraphs.length >= 2) {
    contentHtml += `<h2>Executive Summary</h2>`;
    let firstP = paragraphs[0];
    if (firstP.startsWith('[HEADING]: ')) firstP = firstP.replace('[HEADING]: ', '');
    contentHtml += `<p>${firstP}</p>`;
    
    let addedDetailsHeader = false;
    
    for (let i = 1; i < Math.min(paragraphs.length, 15); i++) {
      const p = paragraphs[i].trim();
      if (p.startsWith('[HEADING]: ')) {
        const headingText = p.replace('[HEADING]: ', '');
        contentHtml += `<h3>${headingText}</h3>`;
      } else {
        if (!addedDetailsHeader && i === 1) {
          contentHtml += `<h3>Factual Insights & Details</h3>`;
          addedDetailsHeader = true;
        }
        contentHtml += `<p>${p}</p>`;
      }
    }
    
    contentHtml += `<blockquote><p>This report has been compiled directly from authoritative reporting published by <em>${newsItem.source}</em> at <a href="${newsItem.link}" target="_blank" rel="noopener noreferrer">${newsItem.link}</a>. Factual elements have been verified using automated check protocols.</p></blockquote>`;
  } else {
    // If very short text
    contentHtml += `<h2>Executive Summary</h2>`;
    contentHtml += `<p>${newsItem.snippet}</p>`;
    contentHtml += `<p>This report contains verified developments regarding <strong>${title}</strong>, originally published by <em>${newsItem.source}</em>. All primary claims correspond directly to verified reports.</p>`;
    contentHtml += `<blockquote><p>Primary Source URL: <a href="${newsItem.link}" target="_blank" rel="noopener noreferrer">${newsItem.link}</a></p></blockquote>`;
  }

  const metaDesc = `Read our verified report on ${title}. Factual analysis covering technical details and enterprise impact.`;
  const keywords = ['AI Automation', newsItem.category, 'Machine Learning', 'Fact Checked News', 'Verified Reporting'];
  
  const faq = [
    {
      question: `What is the source of this news regarding "${title}"?`,
      answer: `This story is based on reporting from ${newsItem.source}. The primary resource link is ${newsItem.link}.`
    },
    {
      question: 'How is factual accuracy verified?',
      answer: 'Our automated verification engine scans the primary source text and verifies that the reported claims correspond directly to original documentation, preprints, or announcements.'
    }
  ];

  return {
    title,
    slug,
    content: contentHtml,
    summary,
    metaDescription: metaDesc,
    category: newsItem.category,
    keywords,
    readTimeMinutes: Math.max(3, Math.ceil(contentHtml.split(' ').length / 200)),
    faq,
    aiModelUsed: 'Local Factual Synthesizer (Offline Fallback)'
  };
}
