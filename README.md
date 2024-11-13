<a href="https://withcortex.com">
  <h1 align="center">Cortex</h1>
</a>

<p align="center">
  The nerve center for your digital life
</p>

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Cortex.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various OpenAI and authentication provider accounts.

```bash
pnpm install
pnpm dev
```

Cortex should now be running on [localhost:3000](http://localhost:3000/).


---
<p>Originally foked from this <a href="https://github.com/vercel/ai-chatbot">Next.js AI Chatbot Starter Template</a></p>