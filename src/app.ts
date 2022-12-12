// The ApolloServer constructor requires two parameters: your schema

import { ApolloServer } from "@apollo/server";
import { resolvers } from './tasks/resolvers';
import { typeDefs } from './tasks/type';

// definition and your set of resolvers.
export const server = new ApolloServer({
  typeDefs,
  resolvers ,
});