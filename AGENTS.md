# Repository guidance

Read `docs/agent/index.md`, then only the page relevant to the task.

- Use `pnpm` and existing `package.json` scripts.
- Keep App Router pages thin; reusable learning, quiz, gate, and simulator logic belongs in `src/`.
- Reuse `src/components/ui` and tokens in `src/styles/tokens` before adding UI primitives.
- For Next.js runtime behavior, inspect the installed version and its bundled docs.
- Run focused tests plus lint; run a production build for routing or bundling changes.
