import { startStandaloneServer } from '@apollo/server/standalone';
import { server } from './app';

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);