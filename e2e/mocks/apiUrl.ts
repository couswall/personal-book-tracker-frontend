// Playwright tests run in Node, not through Vite, so source files that read
// `import.meta.env` (like src/helpers/getEnvVariables.ts) can't be imported here.
// This mirrors src/constants/apiEndpoints.ts and must stay in sync with the
// VITE_API_URL the dev server loads from .env.development.
//
// Kept in its own file with no imports: playwright.config.ts imports it, and that config is
// type-checked by tsconfig.node.json, which doesn't know the app's path aliases (@pages, ...).
export const API_URL = 'http://localhost:3000/api/';
