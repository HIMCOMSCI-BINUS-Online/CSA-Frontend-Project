# Module Map — CSA Frontend Project ↔ materi CSA FE

Use this file when mentoring: open the linked code while following each `Panduan-Sesi.md`.

## Advance Fase 1

| Module | Materi | Code anchors |
|--------|--------|--------------|
| Bridging | [Bridging Pengenalan React](../materi%20CSA%20FE/materi%20CSA/Bridging-Pengenalan-React/Materi-Lengkap.md) | `src/main.tsx`, `src/components/ui/` |
| 01 Komponen | [01-Komponen-Reusable](../materi%20CSA%20FE/materi%20CSA/Advance%20Fase%201/01-Komponen-Reusable/Materi-Lengkap.md) | `src/components/ui/*`, `src/features/todos/components/*` |
| 02 Hooks | [02-Hooks](../materi%20CSA%20FE/materi%20CSA/Advance%20Fase%201/02-Hooks/Materi-Lengkap.md) | `src/features/todos/components/todo-filters.tsx` |
| 03 State | [03-Manajemen-State](../materi%20CSA%20FE/materi%20CSA/Advance%20Fase%201/03-Manajemen-State/Materi-Lengkap.md) | Zustand: `src/features/auth/api/auth-store.ts`; server state: React Query in `src/features/todos/api/` |
| 04 Arsitektur | [04-Arsitektur-Proyek](../materi%20CSA%20FE/materi%20CSA/Advance%20Fase%201/04-Arsitektur-Proyek/Materi-Lengkap.md) | entire `src/` tree, `vite.config.ts`, `src/config/env.ts` |
| 05 Routing | [05-Routing](../materi%20CSA%20FE/materi%20CSA/Advance%20Fase%201/05-Routing/Materi-Lengkap.md) | `src/app/router.tsx`, `src/features/auth/components/auth-guard.tsx` |
| 07 Forms | [07-Forms-Validasi](../materi%20CSA%20FE/materi%20CSA/Advance%20Fase%201/07-Forms-Validasi/Materi-Lengkap.md) | `src/features/auth/components/*-form.tsx`, `src/features/todos/components/todo-form.tsx` |

## Advance Fase 2

| Module | Materi | Code anchors |
|--------|--------|--------------|
| 01 REST | [01-REST-dan-HTTP-Client](../materi%20CSA%20FE/materi%20CSA/Advance%20Fase%202/01-REST-dan-HTTP-Client/Materi-Lengkap.md) | `src/lib/api-client.ts` |
| 02 Queries | [02-React-Query-Setup-dan-Queries](../materi%20CSA%20FE/materi%20CSA/Advance%20Fase%202/02-React-Query-Setup-dan-Queries/Materi-Lengkap.md) | `src/lib/react-query.ts`, `useTodos`, `useDashboardSummary` |
| 03 Mutations | [03-React-Query-Mutations](../materi%20CSA%20FE/materi%20CSA/Advance%20Fase%202/03-React-Query-Mutations/Materi-Lengkap.md) | `useCreateTodo`, `useUpdateTodo`, `useDeleteTodo`, `useRestoreTodo` |
| 04 Auth | [04-Autentikasi-dan-Request](../materi%20CSA%20FE/materi%20CSA/Advance%20Fase%202/04-Autentikasi-dan-Request/Materi-Lengkap.md) | `src/features/auth/services/authService.ts`, JWT in `api-client.ts` |
| 05 Error UX | [05-Error-Retry-UX](../materi%20CSA%20FE/materi%20CSA/Advance%20Fase%202/05-Error-Retry-UX/Materi-Lengkap.md) | `src/components/ui/notifications`, query error states, 401 redirect |

## Suggested teaching order

1. Run app end-to-end (register → create task → list → edit → delete → restore)
2. Walk `src/app/router.tsx` (routing + protected routes)
3. Walk `src/lib/api-client.ts` + auth service (REST + JWT)
4. Walk one query (`useTodos`) and one mutation (`useCreateTodo`)
5. Walk UI composition: layout → page → feature components
6. Compare live UI with `design/stitch/*/screenshot.png`

## Optional later

- [06-Testing](../materi%20CSA%20FE/materi%20CSA/Advance%20Fase%201/06-Testing/Materi-Lengkap.md)
- [08-Kualitas-Debugging](../materi%20CSA%20FE/materi%20CSA/Advance%20Fase%201/08-Kualitas-Debugging/Materi-Lengkap.md)
