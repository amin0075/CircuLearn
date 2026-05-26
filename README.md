# CircuLearn

## Project Overview

**CircuLearn** is an interactive web application designed to teach and demonstrate the fundamentals of simple logic circuits. Built with **Next.js (App Router)** and **React**, the app lets users explore logic gates, Boolean algebra, and hands-on simulations, then check understanding with quizzes.

## Features

- **Learning sections**: Introduction, Basic Concepts, Gates, Boolean Algebra, and Additional Resources (FAQ, Glossary, References).
- **Gate simulations**: Toggle inputs and see outputs on individual gate lessons.
- **Course quiz**: Final quiz with instant on-page scoring and question-by-question review (graded locally in the browser).
- **Circuit simulator**: Build and experiment with logic circuits on the dedicated Simulator route (React Flow, lazy-loaded).
- **Customization**: Dark/light theme via system preference; cookie consent and first-visit guide state persisted in the browser.

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd CircuLearn
   ```

2. **Install dependencies** (Node.js and [pnpm](https://pnpm.io/) required):

   ```bash
   pnpm install
   ```

3. **Environment variables** — create `.env` in the project root:

   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server:**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Development

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `pnpm dev`     | Start Next.js dev server             |
| `pnpm build`   | Production build                     |
| `pnpm start`   | Serve production build               |
| `pnpm lint`    | ESLint                               |
| `pnpm test`    | Vitest unit tests (`src/**/*.test.*`) |
| `pnpm test:watch` | Vitest watch mode                 |

Tests use **Vitest** and **happy-dom**. Behavior-focused tests live next to the modules they cover (e.g. `evaluateCircuit.test.ts`, `src/lib/quiz/*.test.ts`).

## Project Structure

```text
├── app/                          # Next.js App Router (routes + thin page shells)
│   ├── additional-resources/     # FAQ, glossary, references
│   ├── api/                      # Route handlers
│   ├── basic-concepts/
│   ├── boolean-algebra/
│   ├── contact/
│   ├── final-step/               # Quiz and feedback
│   ├── gates/
│   ├── introduction/
│   ├── privacy/
│   ├── simulator/
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── public/
├── src/
│   ├── components/
│   │   ├── content/              # Lesson layout primitives
│   │   ├── global/               # Simulations, modals, shared UI
│   │   └── ui/                   # shadcn-style primitives
│   ├── hooks/
│   ├── layout/                   # Site shell, navbar, footer
│   ├── lib/
│   │   ├── circuit/              # Circuit node/snapshot types
│   │   ├── gates/                # Gate registry, metadata, icons
│   │   └── quiz/                 # Client-side grading & validation
│   ├── routes/                   # Route URL constants
│   ├── stores/
│   │   └── user-preferences.ts   # Cookie consent & user guide (Zustand persist)
│   ├── styles/                   # Global CSS and design tokens
│   └── utils/                    # gateLogic and shared helpers
├── next.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vitest.config.ts
```

## Architecture

- **Routes**: App Router under `app/`. Most pages delegate to `*-content.tsx` client components; shared chrome comes from `src/layout` via `app/providers.tsx`.
- **Gate logic**: `src/utils/gateLogic.ts` is the single evaluation path for gate truth tables. `src/lib/gates/` provides the registry, lesson URLs, quiz key conversion, and icons—used by lessons, drag-and-drop quizzes, and the simulator.
- **Circuit simulator**: `src/components/global/Simulations/LogicCircuitSimulator/` wraps React Flow. Graph state and evaluation live in hooks (`useCircuitGraph`, `useCircuitSnapshotExport`, `evaluateCircuit.ts`). Import **`LogicCircuitSimulatorLazy`** (not the bare `index` module) so `@xyflow` loads only on simulator and embedded law pages.
- **Quiz**: `src/lib/quiz/grade-quiz.ts` and `validate-quiz-answers.ts` run entirely in the browser; nothing is uploaded on submit.
- **Theme**: `@wrksz/themes` (`ThemeProvider` in root layout, theme toggle)—not stored in Zustand.
- **Client preferences**: `useUserPreferencesStore` in `src/stores/user-preferences.ts` persists cookie acceptance and whether the user guide was dismissed (`localStorage` key: `circulearn-preferences`).

## Usage

- **Explore sections**: Use the sidebar or top navigation for Basic Concepts, Gates, Boolean Algebra, and Final Step.
- **Take the quiz**: Under Final Step → Quiz; review your score and each question on the same page after submit.
- **Use the simulator**: Open **Simulator** to build circuits; embedded read-only simulators appear on some Boolean algebra law pages.

## Tech Stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, `@wrksz/themes`, Zustand (persisted preferences), `@xyflow/react` (simulator), Vitest.
