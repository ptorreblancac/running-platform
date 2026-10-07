## Running Platform

A full-stack web application for tracking and managing running activities.

The project serves as a practice to build a complete software application, including a
React frontend, REST APIs, PostrgreSQL database, input validation and backend testing.

## Features
- Create, edit, and delete running activities.
- View all recorded runs.
- Filter runs by type.
- Sort runs by:
        - Date
        - Distance
        - Pace
- Calculate running statistics for: total number of runs, total distance and average pace.
- Input validation and error handling.
- Resposive interface for both desktop and mobile.
- Automated backend API tests.

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- HTML/CSS

### Backend
- Node.js
- Express.js
- REST API

### Database
- PostgreSQL

## Testing
- Jest
- Supertest
- ESLint

## Architecture
The application follows a client-server architecture:

React frontend
        |
        | HTTP request
        ↓
Express REST API
        |
        | SQL query
        ↓
PostgreSQL database

The React frontend communicates with the Express API through an HTTP request. The backend handles
validation and database operations, and sends SQL queries to perform te proper operations on the database, which stores all the running data.

## Project Structure

```text
running-platform/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── RunCard.jsx
│   │   │   └── RunForm.jsx
│   │   ├── utils/
│   │   │   └── formatters.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── routes/
│   │   │   └── runs.js
│   │   ├── app.js
│   │   ├── db.js
│   │   └── server.js
│   ├── tests/
│   │   └── runs.test.js
│   └── package.json
│
└── README.md
```


## API

### Runs
POST /api/runs -> Create a new run

GET /api/runs -> Get all runs

GET /api/runs/:id -> Get a specific run

PUT /api/runs/:id -> Update a run

DELETE /api/runs/:id -> Delete a run

The API also handles invalid routes and database errors with
appropriate status codes.

## Database
The application uses PostgreSQL with a runs table containing:

id
date
distance
duration
run_type
elevation
heart_rate
notes
created_at

Duration is stored in seconds in the database and converted into a more readable format in the frontend.

## Getting Started

### Prerequisites
Make sure you have installed:
- Node.js
- PostgreSQL
- npm

### 1. Clone the repository

git clone <repository-url> 
cd running-platform

### 2. Set up the database

Create a PostgreSQL database named: running_platform
Create the required runs table using the project's database schema. 

### 3. Install backend dependencies

cd server

npm install

Start the backend: npm start

The API will run locally on: http://localhost:3000

### 4. Install frontend dependencies

Open another terminal:

cd client

npm install

Start the React development server: npm run dev

Vite will provide the local URL for the frontend.

### 5. Testing

The backend API is tested using Jest and Supertest.

The test suit covers:
- Successful CRUD operations.
- Missing and invalid inputs.
- Non-existent resources.
- Database errors.
- Invalid routes.
- API responses and status codes.

Current test suite: 31 tests passing.

To run the tests, use:

cd server

npm test


## What I Learned
Throughout this project, I practiced building a full-stack project rather than two separate
frontend and backend, as I had mainly done before.

The key areas I worked with are:
- Designing and implementing REST APIs.
- Connecting a Node.js/Express backend to PostgreSQL.
- Managing state and API requests in React.
- Handling loading, validation and error states.
- Writing automated tests with Jest and Supertest.
- Structuring the project in separate backend and frontend components.



