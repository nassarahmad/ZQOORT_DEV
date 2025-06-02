# Backend Documentation

This documentation covers the structure and purpose of all files in the `backend` folder of the repository.

---

## Root Backend Files

### `package.json`
- **Purpose**: Contains metadata for the backend Node.js project. Lists dependencies, scripts, and project info.
- **Key Points**:
  - Main entry: `src/index.js`
  - Scripts: `dev` (start with nodemon), `start` (start normally)
  - Main dependencies: `express`, `mongoose`, `jsonwebtoken`, `dotenv`, `cloudinary`, `bcryptjs`, `socket.io`

### `package-lock.json`
- **Purpose**: Auto-generated. Records the exact versions installed for every dependency, ensuring consistent installs.

---

## Backend Source: `src/`

### `src/index.js`
- **Purpose**: Main entry point for the backend server.
- **Key Points**:
  - Loads environment variables and middleware (CORS, cookies, JSON body parsing).
  - Sets up API routes for authentication and messages.
  - Serves static files in production.
  - Starts the HTTP and Socket.io servers.
  - Connects to MongoDB using `connectDB`.

---

### `src/controllers/`

- **`auth.controller.js`**  
  Handles all authentication logic, likely including login, registration, JWT token management, and password hashing.

- **`message.controller.js`**  
  Handles logic for messaging features: sending, receiving, storing, or retrieving messages.

---

### `src/lib/`

- **`cloudinary.js`**  
  Provides configuration and helpers for integrating with the Cloudinary service (image/file uploads).

- **`db.js`**  
  Handles MongoDB database connection logic using Mongoose.

- **`socket.js`**  
  Sets up and exports the Socket.io server for real-time communication between the backend and clients.

- **`utils.js`**  
  Utility/helper functions used throughout the backend (could include formatting, validation, etc.).

---

### `src/middleware/`

- **`auth.middleware.js`**  
  Express middleware for authentication. Likely verifies JWT tokens and restricts access to protected routes.

---

### `src/models/`

- **`user.model.js`**  
  Defines the data schema for users in MongoDB using Mongoose, including fields like username, password, and profile info.

- **`message.model.js`**  
  Defines the data schema for messages, linking users and storing message content and metadata.

---

### `src/routes/`

- **`auth.route.js`**  
  Express routes for authentication endpoints (login, register, logout, etc.), delegating logic to `auth.controller.js`.

- **`message.route.js`**  
  Express routes for messaging endpoints, delegating logic to `message.controller.js`.

---

### `src/seeds/`

- **`user.seed.js`**  
  Script to populate the users collection with seed data (useful for development/testing).

---

## How to Extend or Use

- **Adding a new feature**: Add a controller, route, and update models/middleware as needed.
- **Environment variables**: Managed with `.env` and loaded using `dotenv`.
- **Static frontend**: Served from `../frontend/dist` in production mode.
- **Real-time messaging**: Enabled by Socket.io (`src/lib/socket.js`, used in `src/index.js`).

## Useful Links

- [Backend Source on GitHub](https://github.com/nassarahmad/ZQOORT_DEV/tree/main/backend)
- [Controllers](https://github.com/nassarahmad/ZQOORT_DEV/tree/main/backend/src/controllers)
- [Lib Utilities](https://github.com/nassarahmad/ZQOORT_DEV/tree/main/backend/src/lib)
- [Middleware](https://github.com/nassarahmad/ZQOORT_DEV/tree/main/backend/src/middleware)
- [Models](https://github.com/nassarahmad/ZQOORT_DEV/tree/main/backend/src/models)
- [Routes](https://github.com/nassarahmad/ZQOORT_DEV/tree/main/backend/src/routes)
- [Seeds](https://github.com/nassarahmad/ZQOORT_DEV/tree/main/backend/src/seeds)

---

*For more detailed technical documentation, consider adding JSDoc comments to functions and classes in each file.*