const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");

const typeDefs = gql`
  directive @shareable repeatable on OBJECT | FIELD_DEFINITION

  type Query {
    product(id: String!): Product
  }

  type Product @key(fields: "id") {
    id: String!
    name: String!
    price: Int! @shareable
  }
`;

const resolvers = {
  Query: {
    product(_, args) {
      return products.slice(0, args.id);
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

server.listen({ port: 5102 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const products = [
  {
    id: "1",
    name: "Table",
    price: 899,
  },
  {
    id: "2",
    name: "Couch",
    price: 1299,
  }
];
