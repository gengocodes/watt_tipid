# WattTipid Frontend

WattTipid is a Next.js App Router-based web application that helps Filipino households monitor, analyze, and reduce electricity consumption using Generative AI.

---

## Technical Stack

- **Framework**: Next.js 16 (App Router)
- **UI & Logic**: React 19, TypeScript
- **Styling**: TailwindCSS, shadcn/ui
- **State Management**: TanStack Query (server state), Zustand (client UI/auth state)
- **Form Management**: React Hook Form
- **Validation**: Zod
- **HTTP Client**: Axios

---

## Architectural Principles

### 1. Directory Structure

```
src/
├── app/             # Routing, layouts, and page entrypoints
├── features/        # Business feature modules (grouped by feature/domain)
│   ├── authentication/
│   ├── chat/
│   ├── energy/
│   └── recommendations/
├── shared/          # Reusable shared infrastructure
│   ├── api/         # Axios API clients and configurations
│   ├── ui/          # Generic presentation components (e.g. inputs, buttons, loaders)
│   ├── hooks/       # Global utilities hooks
│   └── utils/       # Shared pure utility helper functions
└── providers/       # Global state and utility providers
```

### 2. Feature Folder Design

Each feature inside `src/features/*` acts as an isolated domain containing all related logic. Business code is never organized by file type, but by the features that own them:

- **`components/`**: Presentation layer only (receives props, renders UI, invokes hooks). No inline API calls.
- **`hooks/`**: Handles business logic, query mutations, and state mapping.
- **`services/`**: Communication layer (communicates with FastAPI backend).
- **`schemas/`**: Zod validation rules (particularly for forms).
- **`store/`**: Local Zustand store for UI or feature-scoped state.
- **`types/`**: Interface declarations and DTOs.
- **`constants/`**: Static parameters and endpoint paths.

---

## Coding Guidelines

- **API Layer**: React components must never import or call Axios directly. Always communicate through services (e.g. `LoginForm -> useAuth() -> authService -> Axios`).
- **State Management**:
  - Use **TanStack Query** for backend communication (fetching, mutations, loading states, cache management).
  - Use **Zustand** only for client state (active sidebar state, user authentication, current views). Never duplicate server states in Zustand.
- **Form Validation**: Always validate forms using React Hook Form combined with Zod schemas. Manual field validation is prohibited.
- **TypeScript Rules**:
  - Explicit return types are required on all exported functions.
  - The `any` type is strictly forbidden (use `unknown` or proper types).
  - Avoid type assertions (`as Type`) wherever possible.
- **Styling**: Never write inline CSS. Use TailwindCSS classes and standard shadcn UI primitives.

---

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
