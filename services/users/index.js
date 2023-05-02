const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");

const typeDefs = gql`
  type Query {
    user: User
  }

  type User {
    products: [Product!]
  }

  type Product @key(fields: "id") {
    id: String!
    name: String!
    price: Int
  }
`;

const resolvers = {
  Query: {
    user() {
      return {
        products: myProducts
      }
    }
  }
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

server.listen({ port: 5101 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const myProducts = [
  {
    id: "1",
    name: "Table"
  },
  {
    id: "2",
    name: "Couch"
  },
];
