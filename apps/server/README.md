# Elysn Server

The backend service for the Elysn application, built with Node.js, Express, and Apollo Server. It provides a GraphQL API for the frontend and integrates with various services like MongoDB, Redis, and Firebase.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **GraphQL Server**: Apollo Server
- **Schema**: GraphQL (loaded from `.graphql` files)
- **Database**: MongoDB (via Mongoose)
- **Caching/PubSub**: Redis
- **Authentication**: Firebase Auth
- **Real-time**: WebSocket (graphql-ws)
- **AI Integration**: Model Context Protocol (MCP)

## Project Structure

- `src/index.ts`: Entry point of the application.
- `src/schema`: GraphQL schema definitions (`.graphql` files).
- `src/resolvers`: GraphQL resolvers.
- `src/models`: Mongoose data models.
- `src/db`: Database connection logic.
- `src/cache`: Redis client setup.
- `src/context`: GraphQL context definition.
- `src/mcp`: Model Context Protocol server setup.
- `src/firebase`: Firebase Admin SDK initialization.

## Setup & Configuration

### Environment Variables

The following environment variables are required to run the server:

- `PORT`: The port the server should listen on (default: 4000).
- `MONGODB_USER`: MongoDB username.
- `MONGODB_PASSWORD`: MongoDB password.
- `MONGODB_HOST`: MongoDB host address.
- `MONGODB_DB`: MongoDB database name.
- `MONGODB_APPNAME`: MongoDB application name.
- `REDIS_HOST`: Redis host (implied usage in `src/cache`).
- `REDIS_PORT`: Redis port (implied usage in `src/cache`).
- Firebase credentials (typically `GOOGLE_APPLICATION_CREDENTIALS` or specific Firebase env vars).

### Running Locally

1.  **Install dependencies**:

    ```bash
    pnpm i
    ```

2.  **Start the server**:
    ```bash
    pnpm dev
    ```
    This will start the server in development mode with hot reloading.

## Architecture

### Entry Point (`src/index.ts`)

The `startServer` function is the main entry point. It orchestrates the startup sequence:

1.  Connects to MongoDB and Redis.
2.  Loads GraphQL type definitions from files.
3.  Initializes the Express app and HTTP server.
4.  Sets up the MCP server.
5.  Configures WebSockets for GraphQL subscriptions.
6.  Starts the Apollo Server.
7.  Mounts the GraphQL middleware with authentication.

### GraphQL

The server uses a schema-first approach.

- **Schema**: Defined in `src/schema/**/*.graphql`.
- **Resolvers**: Implemented in `src/resolvers` and combined in `src/resolvers/resolvers.ts`.

### Authentication

Authentication is handled via Firebase ID tokens.

- The client sends a `Bearer` token in the `Authorization` header.
- The `context` function in `index.ts` verifies this token using `firebaseAdmin.auth().verifyIdToken()`.
- The decoded user object is added to the GraphQL context.

### Real-time Updates

GraphQL Subscriptions are powered by `graphql-ws` and `WebSocketServer`.
