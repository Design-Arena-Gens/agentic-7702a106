# MoxyAI Trade Mirroring Agent

This project provides a Next.js control center and serverless API for mirroring trade signals from MoxyAI into your connected trading platform. It monitors for new trades, replicates them with matching parameters, and exposes a dashboard for observability and manual control.

## Features

- Polls the MoxyAI API (or uses generated mock trades when the API is not configured)
- Mirrors trades into a downstream trading platform API with matching pair, direction, lot, SL/TP, and timeframe
- Maintains in-memory state for mirrored trades, execution logs, and runtime settings
- Dashboard with trade/ log tables, mirroring status, and manual sync trigger
- REST endpoints for sync orchestration, settings management, and audit retrieval
- Type-safe validation using Zod and responsive UI built with Tailwind CSS

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set environment variables (optional for live integrations):
   ```bash
   cp .env.example .env.local
   # update values with your credentials
   ```

   - `MOXYAI_API_URL` and `MOXYAI_API_KEY` authenticate the upstream trade feed
   - `TRADING_PLATFORM_API_URL` and `TRADING_PLATFORM_API_KEY` point to the downstream order API

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000` to access the dashboard. Click **Run Sync** to trigger the replication cycle.

## Deployment

The project is ready for Vercel deployment:

```bash
npm run build
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-7702a106
```

After deployment, verify the production instance:

```bash
curl https://agentic-7702a106.vercel.app
```

## Architecture Overview

- **Next.js App Router** serves both the web UI (`app/page.tsx`) and API routes (`app/api/*`).
- **`lib/moxyClient.ts`** fetches upstream trade signals and falls back to deterministic mock data for local testing.
- **`lib/tradingPlatform.ts`** encapsulates downstream order placement with a remote API call and a deterministic simulator.
- **`lib/state.ts`** stores mirrored trades, logs, and runtime settings in a global in-memory store suitable for serverless execution contexts.
- **`lib/replicator.ts`** orchestrates sync cycles, ensuring trades are mirrored exactly once and logging failures.

## API Endpoints

- `POST /api/sync` — Executes a mirroring cycle immediately.
- `GET /api/trades` — Returns the most recent mirrored trades.
- `GET /api/logs` — Returns execution logs.
- `GET /api/settings` — Returns mirroring settings and status.
- `PATCH /api/settings` — Toggles mirroring on/off.

## Testing & Linting

- `npm run lint` — Runs ESLint with Next.js defaults.
- `npm run build` — Type-checks and produces a production build.

## Notes

- When no upstream credentials are provided, the sync endpoint generates deterministic mock trades to keep the UI functional.
- For production, configure a scheduled trigger (e.g., Vercel Cron) to call `/api/sync` at your desired polling interval.
- Integrate platform-specific adapters in `lib/tradingPlatform.ts` if you require MetaTrader, TradingView, or other APIs.
