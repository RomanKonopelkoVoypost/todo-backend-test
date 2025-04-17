# Todo Backend API

A RESTful API for managing todo items built with Node.js, Express, TypeScript, and PostgreSQL.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   NODE_ENV=development
   DATABASE_URL=postgres://postgres:postgres@localhost:5432/todo_db
   ```
4. Create the database:
   ```bash
   createdb todo_db
   ```

## Development

Run the development server:

```bash
npm run dev
```

## Build

Build the project:

```bash
npm run build
```

## Test

Run tests:

```bash
npm test
```

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middlewares/    # Custom middlewares
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic
└── utils/          # Utility functions
```
