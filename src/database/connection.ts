import Knex from 'knex'
import * as dotenv from 'dotenv'
dotenv.config()

console.log('db credentials', )

const knex = Knex({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
});

export default knex