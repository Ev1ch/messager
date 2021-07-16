const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./src/generated/prisma-client');
const Query = require('./src/resolvers/Query');
const Mutation = require('./src/resolvers/Mutation');
const Message = require('./src/resolvers/Message');
const Reply = require('./src/resolvers/Reply');
const Response = require('./src/resolvers/Response');
const Subscription = require('./src/resolvers/Subscription');

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Message,
  Reply,
  Response,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma,
  },
});

server.start(() => console.log('Server started on http://localhost:4000/'));
