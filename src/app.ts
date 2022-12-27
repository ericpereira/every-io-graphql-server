import { ApolloServer } from "@apollo/server";
import { resolvers } from './tasks/resolvers';
import { MyContext, typeDefs } from './tasks/type';

export const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers ,
});