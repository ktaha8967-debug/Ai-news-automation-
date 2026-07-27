const HD_AI_IMAGE_LIBRARY: Record<string, Array<{ url: string; caption: string }>> = {
  'LLMs & Foundation Models': [
    {
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      caption: '3D neural network topology displaying weighted attention nodes during model evaluation.'
    },
    {
      url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
      caption: 'Abstract digital data streams representing transformer context window tokens.'
    }
  ],
  'Autonomous AI Agents': [
    {
      url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      caption: 'Multi-agent orchestration interface executing parallel automated code synthesis.'
    },
    {
      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      caption: 'Encrypted agentic tool execution pipeline with real-time feedback loops.'
    }
  ],
  'AI Chips & Infrastructure': [
    {
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      caption: 'Advanced silicon substrate featuring integrated high-bandwidth memory dies.'
    },
    {
      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      caption: 'Liquid-cooled enterprise server rack optimized for high-density neural network training.'
    }
  ],
  'AI Safety & Governance': [
    {
      url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
      caption: 'Digital governance shield symbolizing verified compliance and cryptographic watermarking.'
    }
  ],
  'Computer Vision & Robotics': [
    {
      url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
      caption: 'Precision humanoid robotic limb undergoing sensor calibration in automated facility.'
    }
  ]
};

export function fetchFeaturedImage(category: string): { imageUrl: string; caption: string } {
  const options = HD_AI_IMAGE_LIBRARY[category] || HD_AI_IMAGE_LIBRARY['LLMs & Foundation Models'];
  const choice = options[Math.floor(Math.random() * options.length)];
  return {
    imageUrl: choice.url,
    caption: choice.caption
  };
}
