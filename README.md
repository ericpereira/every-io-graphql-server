# Graphql API for a Task control web app
## Technologies
- Apollo server graphql [open](https://www.apollographql.com/docs/apollo-server/)
- Knex [open](https://knexjs.org/)
- Docker [open](https://www.docker.com/)
- JWT [open](https://github.com/auth0/node-jsonwebtoken)
- Mysql

## Installation

This project requires [Node.js](https://nodejs.org/) v18+ to run.

Install the dependencies and start the containers.

```sh
cd every-io-graphql-server
```

```sh
npm install
```

```sh
cp .env.example .env

```
```sh
sudo docker-compose up -d
```

This will up the containers and run the migrations, seeds and create the users:

email: eric.pereira@hotmail.com password: Pass@123

email: travisscott@hotmail.com password: Pass@123

## How to use

- Open the link http://localhost:4444 in the browser to start to user the API
- Make an query to login with seeded credentials or make an mutation to create your own user
- After login put the returned Bearer token in the authorization headers for every query or mutarion executed below

## Stop application

Run this commands inside the application folder

```sh
sudo docker-compose down --rmi all --remove-orphans
```

```sh
sudo docker system prune --force --volumes
```



