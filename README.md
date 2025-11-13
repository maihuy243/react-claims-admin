
# React Claims Admin Starter

React + Vite + TypeScript + Tailwind + shadcn-style UI + TanStack Table.
Ready for building an admin for claims management (users, contracts, claims).

## Quickstart
```bash
pnpm i   # or npm i / yarn
pnpm dev
```

## Scripts
- `dev` - start Vite dev server
- `build` - type-check and build
- `preview` - preview production build

## Stack
- React 18, React Router
- TailwindCSS
- shadcn-style UI primitives (no CLI required in this template)
- TanStack Table
- RHF + Zod (ready to add in forms)

## Structure
- `src/components/ui/*` - basic UI (Button, Input, Table, Badge)
- `src/components/layout/*` - Sidebar, Topbar
- `src/pages/*` - Dashboard, Users, Contracts, Claims
- `src/components/DataTable.tsx` - generic table wrapper

## Next steps
- Wire real API under `src/services`
- Add form pages with `react-hook-form` + `zod`
- Replace sample data with server data
- Add auth/guarded routes
```
