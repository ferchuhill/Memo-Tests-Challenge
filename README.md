# Memo Test

This aplicattion is a memo test, the user can start, pause and reset the test.

## Getting Started

### Prerequisites

You need to install Docker and Docker Compose in your machine

### Installing

Clone the repository

```bash
git clone https://github.com/ferchuhill/Memo-Tests-Challenge.git
```

Go to the project directory

```bash
cd Memo-Tests-Challenge
```

The most relevant part of the structureis the following:

```bash
Memo-Tests-Challenge
├── front (NextJs application)
│   ├── Dockerfile
│   ├── next.config.js
│   ├── package.json
│   ├── src
│   │   ├── __test__
│   │   ├── client
│   │   ├── components
│   │   ├── pages
├──app
│   ├── GraphQL
│   │   ├── Mutations
│   │   ├── Queries
│   ├── Models
├── graphql
├── docker-compose.yml
```

The front folder contains the front-end application, the app folder contains the back-end application and the graphql folder contains the schema of the application.

# Running the application development environment

First it need to add the .env file in the front folder, you can copy the .env.example file and rename it to .env. If need you can change the different variables.

```bash
make up.dev
```

After this command the application will be running in the following ports:

-   Front-end: http://localhost:3000
-   Back-end: http://localhost/graphql

Before the first run of the application you need to run the migrations:

```bash
make migration.seed
```

## Running Tests

For running the tests of the application you can run the following command:

```bash
make test
```

## Running Storybook

For running the storybook of the application you can run the following command:

```bash
make storybook
```

# Running the application production environment

```bash
make up.prod
```

After this command the application will be running in the following ports:

-   Front-end: http://localhost:8080
-   Back-end: http://localhost/graphql

# Stop the application

To stop the application (running container) you can run the following command:

```bash
make down
```
