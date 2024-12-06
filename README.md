<a href="https://withcortex.com">
  <h1 align="center">Cortex</h1>
</a>

<p align="center">
  The nerve center for your digital life
</p>

Cortex is an AI assistant for your life that can connect to the web, social platforms like Farcaster, and (soon) your apps to make it easier to get things done quickly online.

Built by [Dylan Steck](https://dylansteck.com)

## Tools
Cortex currently uses:
- [Next.js](https://nextjs.org)
- [shadcn UI](https://ui.shadcn.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Postgres](https://www.postgresql.org)
- [Vercel AI SDK](https://sdk.vercel.ai)
- [OpenAI models(currently GPT-4o and 4o mini)](https://platform.openai.com/docs/concepts)
- [Upstash Redis](https://upstash.com)
- [Neynar](https://neynar.com)
- [Events.xyz](https://events.xyz)
- [Tavily](https://tavily.com)
- [Open-Meteo](https://open-meteo.com)
- [NextAuth](https://next-auth.js.org)

For a further understanding of how the assistant tools are defined, check out [tools.ts](/lib/tools.ts)

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