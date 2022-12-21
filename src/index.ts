import { startStandaloneServer } from '@apollo/server/standalone';

import { server } from './app';
import knex from './database/connection';
import { TaskAttributes } from './tasks/type';

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

// try {
//   const test = await knex<TaskAttributes>('tasks').then(response => {
//     console.log('response', response[0].title)
//   }).catch(error => {
//     console.log('error', error)
//   })
//   console.log('test', test)
// } catch (error) {
//   console.log('error', error)
// }


console.log(`🚀  Server ready at: ${url}`);