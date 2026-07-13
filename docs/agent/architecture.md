# Architecture

- `app/` owns Next.js routes and thin page composition.
- `src/lib/circuit` and `src/lib/gates` own circuit/gate behavior; keep it independent from presentation where practical.
- `src/lib/quiz` owns quiz evaluation and is covered by colocated Vitest tests.
- `src/components/content` contains learning content; `src/components/global` contains site-wide composition.
- Client-persisted guide, consent, and theme state should stay behind the existing stores/hooks.

Avoid moving domain logic into route components or duplicating gate/quiz rules in UI code.
