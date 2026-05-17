# AGENTS.md - Guidelines for Agentic Coding Agents

This document provides essential information for AI agents working in this repository.

## Project Overview

SolvePc is an Astro-based web application that provides technical troubleshooting guides for PC issues. The project uses React components within Astro, TypeScript, and a monorepo structure with a backend.

**Stack:** Astro 6, React 19, TypeScript, Express (backend), pnpm

---

## Build & Development Commands

All commands are run from the project root (`/home/neiderunix/projects/pages/SolvePc`):

| Command | Action |
|---------|--------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start local dev server at `localhost:4321` |
| `pnpm build` | Build production site to `./dist/` |
| `pnpm preview` | Preview build locally before deploying |
| `pnpm astro` | Run Astro CLI commands |
| `pnpm astro check` | Type-check the project |

**Running a single test:** This project currently has no test framework configured. The backend `package.json` contains a placeholder test script. To add testing, consider Vitest (recommended for Astro) or Playwright for E2E.

**Backend:** The backend folder (`/backend`) is a separate Express project. Run `cd backend && node index.js` to start.

---

## Code Style Guidelines

### Imports

- Use absolute imports with path aliases defined in `tsconfig.json`:
  - `@components/*` → `./src/components/*`
  - `@assets/*` → `./src/assets/*`
  - `@layouts/*` → `./src/layouts/*`
  - `@pages/*` → `./src/pages/*`
  - `@styles/*` → `./src/styles/*`
  - `@mockup/*` → `./src/mockup/*`
  - `@store/*` → `./src/store/*`
- React imports: Import from `"react"` (not `@types/react`)
- Keep imports sorted; group React hooks first, then components, then types

### File Naming & Structure

- **Components:** PascalCase (e.g., `SearchProblem.tsx`, `Hero.astro`)
- **Files:** Match component name (e.g., `SearchProblem.tsx`)
- **Astro pages:** lowercase with hyphens (e.g., `index.astro`, `404.astro`)
- **TypeScript files:** `.ts` for modules, `.tsx` for React components
- **CSS:** Co-located with components or in `@styles/global.css`

### TypeScript Conventions

- Use strict mode (`astro/tsconfigs/strict`)
- Define interfaces in `@interfaces/*` or locally in component files
- Use union types for fixed sets: `"OS" | "Red" | "Rendimiento" | "Virus" | "Hardware" | "Software"`
- Use `type` for simple aliases, `interface` for objects with methods or when extending
- Avoid `any`; use `unknown` or proper typing
- Event types: `ChangeEvent<HTMLInputElement>`, `KeyboardEvent<HTMLInputElement>`, `MouseEvent`

### Naming Conventions

- **Variables:** camelCase (`terminoBusqueda`, `handleSearch`)
- **Functions:** camelCase, descriptive names (`ejecutarBusqueda`, `seleccionarSugerencia`)
- **Constants:** UPPERCASE for true constants
- **Types/Interfaces:** PascalCase (`Solutions`, `CommonErrors`, `Explain`)
- **CSS classes:** kebab-case (`card-info`, `wrapper-items-card`)

### React Component Patterns

- Use functional components with destructured props
- Type props with interfaces (e.g., `interface SearchProblemProps { ... }`)
- Use `client:load` directive for interactive Astro components
- Centralize event handlers; avoid inline arrow functions in JSX
- Use `useRef` for DOM access, `useState` for local state, nanostores for global state

### Astro Conventions

- Use frontmatter (`---`) for imports and component logic
- Use `<slot />` for layout content injection
- Scoped styles with `<style>` tag
- Use `transition:persist` and `transition:name` for view transitions
- Client directives: `client:load`, `client:visible`, etc.

### Error Handling

- No global error handling framework currently in place
- Use TypeScript strict mode to catch errors at compile time
- Backend should use Express error-handling middleware
- Validate user input in event handlers before processing

### CSS & Styling

- Global styles in `src/styles/global.css`
- Component styles in co-located `.css` files
- Use CSS custom properties (variables) for theme colors:
  - `--color-hard`, `--color-white`, `--background`, `--gray-border`, `--gray-letter`
- Use `filter: drop-shadow()` for glow effects
- Use `will-change` for animated elements

### State Management

- Use nanostores for global state (`@store/searchStore.ts`)
- Use `useStore` hook to consume stores in React
- Keep local component state with `useState` when appropriate

### Comments & Documentation

- Comments are in Spanish (matching project convention)
- JSDoc comments for exported functions/types
- Inline comments for complex logic
- Avoid redundant comments that restate the code

### Git & Version Control

- Node version: `>=22.12.0` (specified in `package.json`)
- Use pnpm (lockfile: `pnpm-lock.yaml`)
- Do not commit: `dist/`, `node_modules/`, `.astro/`, `.env`, `.DS_Store`

---

## Project Structure

```
/
├── public/           # Static assets
├── src/
│   ├── assets/       # Astro assets, buttons
│   ├── components/   # React & Astro components
│   │   ├── ui/       # Reusable UI components
│   │   ├── layout/   # Layout components (Header, Footer)
│   │   ├── index/    # Homepage components
│   │   └── solutions/ # Solution-related components
│   ├── interfaces/   # TypeScript interfaces
│   ├── layouts/      # Astro layout templates
│   ├── mockup/       # Mock data
│   ├── pages/        # Astro pages (file-based routing)
│   ├── store/        # nanostores state management
│   └── styles/       # Global CSS
├── backend/          # Express backend (separate project)
├── dist/             # Build output (gitignored)
├── node_modules/     # Dependencies (gitignored)
└── package.json
```

---

## Cursor/Copilot Rules

No custom Cursor rules (`.cursor/rules/` or `.cursorrules`) or Copilot rules (`.github/copilot-instructions.md`) are present in this repository.

---

## Recommended VS Code Extensions

- `astro-build.astro-vscode` (required)

---

## Notes for Agents

- This is a bilingual project (Spanish/English). Comments and strings are in Spanish.
- The backend is minimal and separate from the frontend.
- No test framework is currently configured.
- Follow existing patterns when adding new components or pages.
