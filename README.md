## Running Platform

## Overview
Running platform is a full-stack project that acts as a central dashboard to record runs, track progress, visualize statistics
and create running goals to get personalised plans. The project is being developed as a portfolio project to practice full-stack, RESTAPI, and database management, as well as application development.

## Features

### Current

### Planned
- [ ] Record a running activity
- [ ] View running history
- [ ] Edit and delete runs
- [ ] Calculate running pace
- [ ] Set running goals
- [ ] Dashboard with running statistics
- [ ] Progress charts
- [ ] Personal records
- [ ] GPX file import
- [ ] User authentication
- [ ] Training plans

## Tech Stack

### Frontend
- React
- JavaScript
- HTML/CSS

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL

### Tools & Infrastructure
- Git
- GitHub
- Docker
- REST API

## Architecture
The application follows a client-server architecture:

React frontend
        ↓
REST API
        ↓
Node.js + Express backend
        ↓
PostgreSQL database

## Project Structure
running-platform/
├── client/          # React frontend
├── server/          # Node.js + Express backend
├── database/        # Database schema and scripts
├── .gitignore
└── README.md

## API

### Runs
POST /api/runs -> Create a new run
GET /api/runs -> Get all runs
GET /api/runs/:id -> Get a specific run
PUT /api/runs/:id -> Update a run
DELETE /api/runs/:id -> Delete a run

## Database
The application uses PostgreSQL for persistent data storage
Main entities:
- Users
- Runs
- Goals

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- npm

### Installation

1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Set up the PostgreSQL database
5. Start the backend
6. Start the frontend