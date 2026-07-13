# Workflows

- Package manager: `pnpm` (`packageManager` is pinned in `package.json`).
- Development: `pnpm dev`.
- Unit tests: `pnpm test`; tests use Vitest and happy-dom and are normally colocated.
- Static checks: `pnpm lint`.
- Production verification: `pnpm build` when routes, rendering, configuration, or bundles change.

Do not commit generated `.next/` output or local environment files.
