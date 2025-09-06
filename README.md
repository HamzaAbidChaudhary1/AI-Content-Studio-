# AI Content Studio 🚀

An AI-powered content generation platform that creates engaging social media content with automated research, writing, and image selection.

## Features

- 🤖 AI-powered content generation using GPT-4
- 🔍 Web research with Apify integration
- 🖼️ Smart image selection from Unsplash and AI generation
- 📝 Content optimization for LinkedIn and Twitter
- ✏️ Edit and approve content before publishing
- 🔄 n8n workflow automation backend

## Tech Stack

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: n8n workflows
- **AI**: OpenAI GPT-4, Google Imagen
- **APIs**: Apify, Unsplash
- **Deployment**: Netlify
- **Future**: Firebase (for auth & storage)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- n8n instance running (cloud or self-hosted)
- API keys for OpenAI, Apify, Unsplash, Google AI

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/ai-content-studio.git
cd ai-content-studio
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a `.env` file from the example:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Add your configuration to `.env`:
\`\`\`
VITE_N8N_WEBHOOK_BASE=https://fkfnahmad.app.n8n.cloud/webhook
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

## Deployment

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables in Netlify dashboard
6. Deploy!

## n8n Workflows

This app requires three n8n workflows:
1. **Content Generation**: `/webhook/generate-content`
2. **Content Approval**: `/webhook/content-approval`
3. **Test Endpoint**: `/webhook/test-generation`

Import the workflow JSONs from the `/n8n-workflows` directory.

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

## License

MIT
