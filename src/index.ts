import { startStandaloneServer } from '@apollo/server/standalone';

import { server } from './app';
import knex from './database/connection';

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

try {
  const test = await knex('test').where('idtest', '>', 0).then(response => {
    console.log('response', response)
  }).catch(error => {
    console.log('error', error)
  })
  console.log('test', test)
} catch (error) {
  console.log('error', error)
}


console.log(`🚀  Server ready at: ${url}`);