# Personal Book Tracker — Frontend

A web app for keeping track of your reading: search for books, add them to your bookshelves, log reading progress, and follow a yearly reading challenge from a personal dashboard.

This repository holds the **frontend** only. It is built with React 18, TypeScript and Vite, and talks to a separate REST API backend: [personal-book-tracker-api](https://github.com/couswall/personal-book-tracker-api).

## Features

- **Authentication**: sign up, log in and log out. The access token is kept in memory only, and the session is restored on page load through an httpOnly refresh cookie.
- **Dashboard (Home)**: reading stats, the books you're currently reading, your want-to-read list, and reading challenge progress.
- **Book search**: a debounced search dropdown in the navbar, plus a full search results page.
- **Book detail**: cover, description, reviews and activity. You can add a book to a bookshelf, move it to another one, remove it, and update your reading progress.
- **Dark mode**: a light/dark theme toggle that is remembered between visits.
- **My Books**: the page for your full collection (still a placeholder).

## Tech stack

| Area | Tools |
| --- | --- |
| UI | React 18, TypeScript, styled-components |
| Build | Vite |
| State | Redux Toolkit, redux-persist (dark mode only) |
| Routing | React Router 7 |
| Forms | react-hook-form + yup |
| HTTP | axios, with interceptors that attach the token and refresh it automatically |
| Unit / integration tests | Vitest, React Testing Library, MSW |
| End-to-end tests | Playwright (Chromium) |
| Component docs | Storybook 10 |
| Code quality | ESLint, Prettier, Husky + lint-staged |
| CI | GitHub Actions |

## Getting started

### Prerequisites

- Node.js 22 (the version CI uses)
- npm
- The [backend API](https://github.com/couswall/personal-book-tracker-api) running locally (needed for real data; the tests don't need it)

### Installation

```bash
git clone https://github.com/couswall/personal-book-tracker-frontend.git
cd personal-book-tracker-frontend
npm install
```

### Environment variables

Create a `.env.development` file in the project root. It is gitignored, so it isn't in the repo:

```env
VITE_MODE=development
VITE_API_URL=http://localhost:3000/api/
```

| Variable | Description |
| --- | --- |
| `VITE_MODE` | Environment name (`development`, `test`, …) |
| `VITE_API_URL` | Base URL of the backend API, with a trailing slash |

`.env.test` is committed and is used when the tests run.

### Run the app

```bash
npm run dev
```

The app runs at <http://localhost:5173>.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit and integration tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with a coverage report |
| `npm run test:e2e` | Run Playwright end-to-end tests (starts the dev server for you) |
| `npm run storybook` | Start Storybook at <http://localhost:6006> |
| `npm run build-storybook` | Build a static Storybook |

## Project structure

```text
src/
├── api/          # HTTP clients (auth client + private client with token interceptors)
├── components/   # Shared UI components (buttons, inputs, layout, navbar, typography…)
├── constants/    # API endpoints, error messages, aria labels, regexes
├── helpers/      # Small utilities (env variables, prop forwarding)
├── pages/        # Route pages: Home, Search, Book, MyBooks, Login, SignUp
├── routes/       # AppRouter and route path definitions
├── store/        # Redux slices and thunks (auth, darkMode, books)
├── stories/      # Storybook foundation pages (colors, typography, spacing)
├── styles/       # Light and dark theme definitions
├── testUtils/    # renderWithProviders, MSW server setup
└── views/        # Layouts (public / dashboard) and theme provider
e2e/              # Playwright specs and API mocks
```

### Routes

| Path | Access | Page |
| --- | --- | --- |
| `/auth/login` | Public | Login |
| `/auth/signup` | Public | Sign up |
| `/` | Private | Dashboard |
| `/search` | Private | Search results |
| `/book/:id` | Private | Book detail |
| `/mybooks` | Private | My books |

The router chooses which set of routes to show based on the auth status in Redux. Logged-in users get the dashboard layout with the navbar, and everyone else gets the public layout.

### How authentication works

1. Logging in returns an access token, which is stored in Redux memory and never in localStorage. The backend also sets an httpOnly refresh cookie.
2. API requests made with the private client get the access token attached by an axios interceptor.
3. When a request gets a `401`, the interceptor refreshes the token once and retries the request.
4. When the page loads, the `refreshToken` thunk uses the cookie to restore the session.

## Testing

- **Unit and integration tests** sit next to the code they test (`*.test.ts(x)`). MSW stands in for the backend, so no server is needed.
- **End-to-end tests** live in `e2e/` and cover login, search, bookshelves and dark mode, using mocked API responses.

[TESTING_GUIDE.md](TESTING_GUIDE.md) walks through the whole testing setup step by step.

## Storybook

Shared components and design tokens (colors, typography, spacing) are documented in Storybook:

```bash
npm run storybook
```

[STORYBOOK_GUIDE.md](STORYBOOK_GUIDE.md) explains how the design system was put together.

## Continuous integration

Every pull request, and every push to `main`, runs the GitHub Actions workflow in [.github/workflows/ci.yml](.github/workflows/ci.yml):

1. Lint, build and unit tests
2. End-to-end tests in Chromium. If they fail, the Playwright report is uploaded as an artifact.

## Code conventions

- Imports use path aliases (`@components/*`, `@pages/*`, `@store/*`, etc.), which are configured in `vite.config.ts` and `tsconfig.app.json`.
- No `any` and no `as` type assertions.
- Each file stays under 210 lines.
- Transient styled-components props use the `$` prefix (for example `$width`), so they don't end up on DOM elements.
- A pre-commit hook runs ESLint and Prettier on staged files.
