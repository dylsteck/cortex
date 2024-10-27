<a href="https://withcortex.com">
  <!-- <img alt="Cortex screenshot" src="LINK_TO_SCREENSHOT"> -->
  <h1 align="center">Cortex</h1>
</a>

<p align="center">
  The nerve center for your onchain life
</p>

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Next.js AI Chatbot. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various OpenAI and authentication provider accounts.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000/).


## Notes
<p>Originally foked from this <a href="https://github.com/vercel/ai-chatbot">Next.js AI Chatbot Starter Template</a></p>