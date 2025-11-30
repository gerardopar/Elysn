# Elysn Client

The frontend application for Elysn, built with React, Ionic, and Vite. It is designed as a cross-platform application (Web, iOS, Android) with a focus on performance and modern UI/UX.

## Tech Stack

- **Core**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **UI Framework**: [Ionic React](https://ionicframework.com/docs/react), [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (via [zustand-x](https://github.com/udecode/zustand-x))
- **Data Fetching**: [Apollo Client](https://www.apollographql.com/docs/react/) (GraphQL)
- **Mobile Runtime**: [Capacitor](https://capacitorjs.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/), [Lottie React](https://github.com/Gamote/lottie-react)
- **3D Graphics**: [Three.js](https://threejs.org/)
- **Utilities**: [Lodash](https://lodash.com/), [Moment.js](https://momentjs.com/), [Nanoid](https://github.com/ai/nanoid)

## Project Structure

- `src/components`: Reusable UI components.
- `src/pages`: Application views/routes.
- `src/hooks`: Custom React hooks.
- `src/stores`: Global state stores (Zustand).
- `src/graphql`: GraphQL operations (queries, mutations, subscriptions) and generated types.
- `src/theme`: Global theme variables and Ionic configuration.
- `src/styles`: Global CSS and SCSS files.
- `src/router`: Routing configuration.
- `src/firebase`: Firebase client configuration.
- `src/helpers`: Utility functions.
- `src/assets`: Static assets (images, icons).

## Setup & Configuration

### Prerequisites

- Node.js (Latest LTS recommended)
- pnpm (Package manager)

### Installation

1.  Navigate to the project root (or `apps/client`).
2.  Install dependencies:
    ```bash
    pnpm i
    ```

## Development Workflow

### Running Locally

Start the development server with hot module replacement (HMR):

```bash
pnpm dev
```

The app will be available at `http://localhost:5173` (default Vite port).

### GraphQL Code Generation

The project uses `graphql-codegen` to generate TypeScript types from your GraphQL operations.
Whenever you modify `.graphql` files or GraphQL operations in code:

1.  Ensure the backend server is running (usually at `http://localhost:4000/graphql`).
2.  Run the codegen command:
    ```bash
    pnpm codegen
    ```
    Or run in watch mode:
    ```bash
    pnpm codegen:watch
    ```

### Building for Production

To build the application for production deployment:

```bash
pnpm build
```

This compiles the TypeScript code and bundles the assets into the `dist` directory.

### Mobile Development (Capacitor)

To sync the web build with native projects (iOS/Android):

```bash
npx cap sync
```

To open the native IDEs:

```bash
npx cap open ios
npx cap open android
```

## Key Features

- **Real-time Updates**: Uses GraphQL Subscriptions (via `graphql-ws`) for live data updates.
- **PWA Ready**: Includes PWA elements for camera and other native features on the web.
- **Responsive Design**: Built with Ionic and Tailwind to work seamlessly across mobile and desktop.
