export const N8N_WEBHOOKS = {
  BASE_URL: import.meta.env.VITE_N8N_WEBHOOK_BASE || 'https://fkfnahmad.app.n8n.cloud/webhook',
  ENDPOINTS: {
    TEST: '/test-generation',
    GENERATE: '/generate-content',
    REFINE: '/refine-content',  // New endpoint for refinements
    APPROVAL: '/content-approval'
  }
};

export const INDUSTRIES = [
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance & Banking' },
  { value: 'marketing', label: 'Marketing & Advertising' },
  { value: 'saas', label: 'SaaS & Software' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'education', label: 'Education' },
  { value: 'realestate', label: 'Real Estate' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'retail', label: 'Retail' }
];

export const REFINEMENT_SUGGESTIONS = [
  'Make it more conversational',
  'Add statistics and data',
  'Shorten the content',
  'Make it more professional',
  'Add stronger CTA',
  'Focus on ROI',
  'Add storytelling',
  'Include emojis',
  'Make it more technical',
  'Simplify the language'
];
