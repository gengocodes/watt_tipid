# WattTipid Frontend

WattTipid Frontend is a Next.js App Router application designed to help Filipino households monitor, analyze, and optimize electricity consumption using Generative AI.

---

## Overview

WattTipid provides an interactive dashboard, appliance inventory manager, dynamic monthly energy trends, personalized AI-generated energy saving recommendations with financial impact breakdowns, and an AI energy advisor (`Gorlock`) capable of real-time tool execution, web search, and Server-Sent Events (SSE) streaming.

---

## Technology Stack

- **Framework**: Next.js 16 (App Router with React 19 & TypeScript 5)
- **Styling**: Tailwind CSS v4, OKLCH CSS Variable Design System, `tw-animate-css`
- **UI Components**: `shadcn/ui` (Maia base style), Lucide React Icons, `@base-ui/react` primitives
- **State Management**:
  - **Server State**: `@tanstack/react-query` v5 (`staleTime: 5 min`, `gcTime: 10 min`, query invalidation)
  - **Client & Auth State**: `zustand` v5 (Auth state, Chat store, UI state)
- **Form Management**: `react-hook-form` with `@hookform/resolvers` & `zod` validation
- **HTTP & SSE Client**: `axios` (with HttpOnly cookie credentials & automated token refresh interceptors), Native `fetch` + `ReadableStream` for SSE streaming
- **Data Visualization**: `recharts` v3 (Area charts, Bar charts, Pie charts)
- **Markdown & Notifications**: `react-markdown` + `remark-gfm`, `react-toastify`
- **Guided Onboarding**: `@oqlet/react-driver` interactive tour

---

## Architecture

The codebase follows a strict **Feature-Based Architecture**:

```
watt_tipid/
├── src/
│   ├── app/                  # Next.js App Router pages and layouts
│   │   ├── (protected)/      # Authenticated layout & sub-pages
│   │   │   ├── appliances/   # Appliance management page
│   │   │   ├── chat/         # AI chat page
│   │   │   ├── dashboard/    # Energy dashboard page
│   │   │   ├── savings-tips/ # Saving recommendations page
│   │   │   ├── settings/     # Account & rate settings page
│   │   │   └── layout.tsx    # Auth guard & protected app shell
│   │   ├── globals.css       # Tailwind v4 import & OKLCH variables
│   │   ├── layout.tsx        # Root provider wrapper (Query, Auth, Toast)
│   │   └── page.tsx          # Root page (auth split view & landing)
│   ├── features/             # Business domain feature modules
│   │   ├── agents/           # AI Advisor UI, SSE stream parser, timeline
│   │   ├── authentication/   # Auth store, forms, login/register logic
│   │   ├── energy/           # Appliance inventory, dashboard metrics, charts
│   │   ├── landing/          # Public marketing & feature landing UI
│   │   ├── saving_tips/      # Tip cards, summary header, re-analysis timer
│   │   ├── settings/         # Profile management & electricity rate updates
│   │   └── tour/             # Guided interactive walkthrough driver
│   ├── shared/               # Cross-cutting utilities & infrastructure
│   │   ├── api/              # Axios instance, interceptors, SSE stream client
│   │   ├── config/           # Validated environment variables
│   │   ├── layout/           # AppHeader, AppSidebar navigation
│   │   ├── ui/               # Reusable primitives (FormInput, Select, Loaders)
│   │   └── utils/            # Helper functions (currency formatters, dates)
│   ├── providers/            # React context providers (AuthProvider, QueryProvider)
│   └── components/ui/        # shadcn/ui primitives
```

### Feature Module Structure

Every feature under `src/features/*` is self-contained and organized by concern:

- **`components/`**: Presentational UI components (receives props, renders UI, invokes hooks).
- **`hooks/`**: Custom hooks encapsulating business logic, TanStack Query mutations, and state mappings.
- **`services/`**: Backend communication layer using Axios or native streaming clients.
- **`schemas/`**: Zod schemas for form validation and data parsing.
- **`store/`**: Feature-scoped Zustand state stores.
- **`types/`**: TypeScript interfaces and API DTO definitions.

---

## Features

### 1. Authentication & Onboarding
- **Split Auth Flow**: Login, multi-step registration with 6-digit numeric email OTP verification.
- **Auth Guard**: Protected layout (`/(protected)/layout.tsx`) verifies authentication state via `GET /auth/me` on app mount.
- **Interactive Tour**: Guided walkthrough powered by `@oqlet/react-driver`.

### 2. Energy Dashboard & Analytics
- **Projected Monthly Cost & kWh**: Real-time calculated monthly electricity bill projections based on user appliances and custom tariff rates (`₱/kWh`).
- **Energy Saving Score**: Visual gauge displaying efficiency score (0–100) and status rating (`Excellent`, `Good`, `Fair`, `Needs Improvement`).
- **Consumption & Cost Trends**: Interactive Recharts area and bar charts showing historical month-over-month usage.
- **Appliance Category Breakdown**: Recharts pie chart displaying consumption distribution across categories (Cooling, Laundry, Refrigeration, etc.).

### 3. Appliance Management
- **Appliance Inventory**: Add, update, toggle active status, or delete household appliances.
- **Consumption Calculations**: Computes individual appliance monthly kWh (`(wattage * hours * 30) / 1000`) and monthly cost (`kWh * rate`).
- **Efficiency Badges**: Visual indicator of appliance status (`EFFICIENT`, `HAS_RECOMMENDATIONS`, `NOT_ANALYZED`).

### 4. Saving Tips & Household AI Analysis
- **AI Analysis Engine**: Requests complete AI household evaluation (`POST /saving-tips/generate`) with async status polling and 24-hour cooldown enforcement (`useCooldownTimer`).
- **Financial Impact Breakdown**: Calculates specific monthly and annual PHP savings for actionable tips, along with easy-win badges and priority filters (`all`, `active`, `completed`, `stale`).
- **Appliance Requirement Guard**: Requires at least 5 active appliances before enabling tips generation.

### 5. AI Advisor (`Gorlock`) & Real-Time Tool Timeline
- **SSE Event Streaming**: Consumes backend `POST /agents/chat/stream` Server-Sent Events via `ReadableStreamDefaultReader`.
- **Stream Event Types**:
  - `token`: Appends live LLM text output token-by-token.
  - `tool_start` / `tool_end`: Displays active tool invocations (e.g., `add_user_appliance`, `get_user_appliances`, `web_search`) inside `AgentExecutionTimeline`. Automatically invalidates TanStack Query cache upon mutation tool completion.
  - `activity`: Shows status indicators ("Analyzing request...", "Searching web...").
  - `complete`: Emits execution time duration badge and finalizes chat interaction.

---

## Data Fetching & State Management

- **TanStack Query (Server State)**:
  - Cache default `staleTime`: 5 minutes, `gcTime`: 10 minutes.
  - Automatic query invalidation for `['appliances']`, `['dashboardSummary']`, `['savingTips']`, and `['savingTipsSummary']` after AI agent tool execution.
- **Zustand (Client State)**:
  - `auth.store.ts`: Stores active user session, authentication status, and auth view state (`login` | `register` | `verify_register`).
- **Axios & Interceptors**:
  - `withCredentials: true` enables HttpOnly cookie transmission.
  - Automatic 401 response interceptor triggers `POST /auth/refresh` using a shared promise deduplicator to handle simultaneous requests seamlessly.

---

## Authentication & Security

- **Token Storage**: Relies on secure, HTTP-only `access_token` and `refresh_token` cookies managed by the backend.
- **Route Guarding**: Client-side layout checks authentication state and automatically redirects unauthenticated requests to `/`.
- **In-App Browser Detection**: Includes `InAppBrowserBlocker` component to ensure optimal browser compatibility.

---

## Environment Variables

Configuration is validated via `@/shared/config/env.ts`:

| Variable Name | Description | Example / Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the FastAPI backend API | `http://localhost:8005` |

> **Note**: Never expose secrets or private keys in `NEXT_PUBLIC_` variables.

---

## Development Setup

### Prerequisites
- Node.js (v18.x or later)
- npm or pnpm

### Installation & Run

1. Clone the repository and navigate to the frontend directory:
   ```bash
   cd watt_tipid
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8005
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Build & Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts Next.js development server |
| `npm run build` | Builds production bundle |
| `npm run start` | Starts Next.js production server |
| `npm run lint` | Runs ESLint check |
