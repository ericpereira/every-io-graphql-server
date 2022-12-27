import { ApolloServer } from "@apollo/server";
import { resolvers } from './graphql/resolvers';
import { MyContext, typeDefs } from './graphql/type';

export const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers ,
});