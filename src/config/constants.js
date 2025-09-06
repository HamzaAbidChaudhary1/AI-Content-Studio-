export const N8N_WEBHOOKS = {
  BASE_URL: import.meta.env.VITE_N8N_WEBHOOK_BASE || 'https://fkfnahmad.app.n8n.cloud/webhook',
  ENDPOINTS: {
    TEST: '/test-generation',
    GENERATE: '/generate-content',
    APPROVAL: '/content-approval'
  }
};

export const INDUSTRIES = [
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance & Banking' },
  { value: 'marketing', label: 'Marketing & Advertising' },
  { value: 'saas', label: 'SaaS & Software' }
];
