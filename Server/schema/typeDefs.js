const typeDefs = `
type User {
_id: ID!
username:String
email:String
}

type Auth {
  token: ID!
  user: User
}

type Query {
  message: String
}

  type Mutation {
    register(username: String!, password: String!, email: String!): Auth
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
