import { startStandaloneServer } from '@apollo/server/standalone';

import { server } from './app';
import { getUser } from './utils/common';

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const token = req.headers.authorization || ''
    const user = await getUser(token)
    return { user }
  },
});


console.log(`🚀  Server ready at: ${url}`);