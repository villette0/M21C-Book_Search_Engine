const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID!
  username: String!
  email: String!
  bookCount: Int
  savedBooks: [Book]
}  

type Book {
    bookId: String!
    authors: [Author]
    description: String!
    title: String!
    image: String
    link: String
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: [Author], description: String!, title: String!, bookId: String!, image: String): User
    removeBook(bookId: String!): User
  }
`;

// Book-authors, unsure about array of strings
// Mutation-saveBook, unsure about array of authors

module.exports = typeDefs;s