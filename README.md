# Email Summarizer API

Simple Email Summarizer API built with [Nest.js/TypeScript](https://nestjs.com/) and [OpenAI GPT-3](https://beta.openai.com/).

To run this API locally, you can use the container environment created for this project using [Docker Compose](https://docs.docker.com/compose/) with the right version of [Node.js](https://nodejs.org/en/). Check the configuration section below.

An API documentation with requests and responses examples is available on [https://localhost:3001/docs](https://localhost:3001/docs). This documentation was generated using [Swagger/OpenAPI](https://swagger.io/specification/) so you can interact with API from OpenAPI UI.

The main tool used for testing is [Jest](https://facebook.github.io/jest/).

## Configuration

To clone and run this application, you’ll need to have [Git](https://git-scm.com), [Docker](https://www.docker.com), [Docker Compose](https://docs.docker.com/compose), and [npm](https://www.npmjs.com) installed on your computer.

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/unckleg/email-summarizer.git

# Go into the repository folder
$ cd email-summarizer

# Copy dotenv file and add env variables locally
# NOTE: Add OPENAI_API_KEY to .env file (generate one from here: https://beta.openai.com/account/api-keys)
$ cp .env.example .env 

# Install deps
$ npm install 

# Start the application 
$ npm run start:dev
```

Using Docker/Docker Compose
```bash
# Copy dotenv file and add env variables locally
# NOTE: Add OPENAI_API_KEY to .env file (generate one from here: https://beta.openai.com/account/api-keys)
$ cp .env.example .env 

# Using docker compose 
$ docker-compose up

# Or using image artifact directly
$ docker run ghcr.io/unckleg/email-summarizer/server:main -p 3001:3001
```

Using Kubernetes & Skaffold
- Skaffold - [Installation](https://skaffold.dev/docs/install/)
- Kubernetes, Kubectl - If you are on M1 install Minikube [Installation](https://minikube.sigs.k8s.io/docs/start/)

```bash
# Optionally start minikube from cli if you are on M1 chip architecture
$ minikube start

$ skaffold dev --port-forward # Will run k8s cluster, expose ports (3001) 
```

To run the tests, use the following commands:

```bash
$ npm run test
```

Use the following command to run [ESLint](https://eslint.org) from the command line:

```bash
$ npm run lint
```
