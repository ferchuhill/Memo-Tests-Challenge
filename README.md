# Memo Test

Memo Test is a web application that allows users to take a memo test. The user can start, pause, and reset the test.

## Getting Started

### Prerequisites

To get started, you will need to have the following tools installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [NodeJs](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [php](https://www.php.net/manual/es/install.php)
- [Composer](https://getcomposer.org/download/)

### Repository and Structure

To clone the repository, run the following command:

```bash
git clone https://github.com/ferchuhill/Memo-Tests-Challenge.git Memo-Tests-Challenge
```

Once you have cloned the repository, navigate to the project directory:

```bash
cd Memo-Tests-Challenge
```

The project directory is structured as follows:

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
│   │   ├── ....
│   ├── ...
├──app
│   ├── GraphQL
│   │   ├── Mutations
│   │   ├── Queries
│   ├── Models
│   ├── ...
├── graphql
├── docker-compose.yml
├── ...
```

The front folder contains the[NextJs](https://nextjs.org/) front-end application. The rest of the folder contains the [Laravel](https://laravel.com/) back-end application, which uses [Lighthouse](https://lighthouse-php.com/) for GraphQL. The graphql folder contains the GraphQL [schema](https://lighthouse-php.com/6/digging-deeper/schema-organisation.html) for the application. The app folder contains the models used (app/Models), and the different resolvers (app/GraphQL).

#### Installing dependencies

To install the dependencies for the development environment, run the following command:

```bash
composer install
```

#### Adding the .env files

Next, you need to add the .env files to both the front-end and back-end applications. You can copy the .env.example files and rename them to .env.

For the front-end application, run the following command:

```bash
cp front/.env.example front/.env
```

For the back-end application, run the following command:

```bash
cp .env.example .env
```

If you need to change any of the variables, such as the database variables, you can do so in the .env file.

```bash
DB_DATABASE=laravel
DB_USERNAME=sail
DB_PASSWORD=password
```

#### Generating the key

Generating the Application Keys

```bash
php artisan key:generate
```

### Develop mode

#### Running the application

Before the first run of the application you need to run the migrations:

```bash
make migration.seed
```

Now you can run the application in development environment following this command:

```bash
make up.dev
```

After this command the application will be running in the following ports:

- Front-end: http://localhost:3000
- Back-end: http://localhost/graphql

#### Testing

To run the tests you can run the following command:

```bash
make test
```

#### Storybook

To run the storybook you can run the following command:

```bash
make storybook
```

After this command the application will be running in the following ports:

- storybook: http://localhost:6006

#### Stop the application

To stop the application (running container) you can run the following command:

```bash
make down
```

### Production Mode

#### Running the application production environment

Before the first run of the application you need to run the migrations:

```bash
make migration.seed
```

Now you can run the application in a production environment following this command:

```bash
make up.prod
```

After this command the application will be running in the following ports:

- Front-end: http://localhost:8080
- Back-end: http://localhost/graphql

#### Stop the application

To stop the application (running container) you can run the following command:

```bash
make down
```
