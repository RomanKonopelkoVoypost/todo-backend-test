# Todo Backend API

A RESTful API for managing todo items built with Node.js, Express, TypeScript, and PostgreSQL.

## Features

- CRUD operations for todo items
- Input validation using Zod
- Error handling middleware
- TypeScript support
- PostgreSQL database with Sequelize ORM
- Unit and integration tests
- Docker support for database

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher) or Docker
- npm

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
4. Set up the database (choose one option):

   Option 1 - Local PostgreSQL:

   ```bash
   createdb todo_db
   ```

   Option 2 - Docker (recommended):

   ```bash
   npm run docker:dev-db
   ```

   This command will start a PostgreSQL container using Docker Compose.

5. Run migrations:
   ```bash
   npm run migrate
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
# Run all tests
npm test

```

## API Endpoints

### Todos

- `GET /api/v1/todos` - Get all todos
- `GET /api/v1/todos/:id` - Get a todo by ID
- `POST /api/v1/todos` - Create a new todo
- `PUT /api/v1/todos/:id` - Update a todo
- `DELETE /api/v1/todos/:id` - Delete a todo

### Request/Response Examples

#### Create Todo

```json
POST /api/v1/todos
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false
}
```

#### Update Todo

```json
PUT /api/v1/todos/:id
{
  "completed": true
}
```

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Utility functions
├── validators/     # Request validation schemas
└── __tests__/      # Test files
    ├── integration/ # Integration tests
    └── services/    # Unit tests
```

## Error Handling

The API uses a custom error handler that returns appropriate HTTP status codes and error messages:

- 400 Bad Request - Invalid input data
- 404 Not Found - Resource not found
- 500 Internal Server Error - Server-side errors

## License

This project is licensed under the MIT License.
