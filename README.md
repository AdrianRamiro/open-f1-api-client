# OpenF1 API Client

OpenF1 API Client is a web application that allows users to view information about the Formula 1 World Championship. The application is built with Vue 3 and Vite.

Based on the standard Vue 3 create template, the project includes the following features:

- Onion architecture, with the API client and the UI decoupled.
  - Services are used to fetch data from the API.
  - Data layer provides a consistent interface to the API where in future releases, the API client can be replaced with a different implementation and optimizations can be made, like caching.
- Unit tests with Vitest and end-to-end tests with Playwright. Some tests are included as examples.
- Since the decoupled architecture, service and data layers could be moved to a separate package and shared between multiple projects, regardless of the UI framework used.
- Data layer can be extended to include more endpoints and data transformations, like POST/PUT/DELETE requests, or GraphQL queries.

## Roadmap

- Implement a caching mechanism. (memoize API calls, store data in local storage, etc.)
- Implement the rest of the Open F1 API endpoints.
- Implement a UI components library.
- Implement a charts library, like Chart.js or D3.js, to display data in a more interactive way.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
