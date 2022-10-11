const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
          }
    },

    Mutation: {
        addUser: async (parent, { name, email, password }) => {
          const user = await User.create({ name, email, password });
          const token = signToken(user);
    
          return { token, user };
        },
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
          if (!user) {
            throw new AuthenticationError('No user with this email found!');
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect password!');
          }
    
          const token = signToken(user);
          return { token, user };
        },
        saveBook: async (parent, { bookData}, context) => {
          // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
          if (context.user) {
            return User.findOneAndUpdate(
              { _id: context.user._id },
              {
                $addToSet: { savedBooks: bookData },
              },
              {
                new: true,
                runValidators: true,
              }
            );
          }
          // If user attempts to execute this mutation and isn't logged in, throw an error
          throw new AuthenticationError('You need to be logged in!');
        },
        removeBook: async (parent, { bookId }, context) => {
          if (context.user) {
              return User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: {bookId: bookId } } },
              { new: true }
            );
          }
          throw new AuthenticationError('You need to be logged in!');
      }

}
}



// login(email: String!, password: String!): Auth
// addUser(username: String!, email: String!, password: String!): Auth
// saveBook(authors: [Author], description: String!, title: String!, bookId: String!, image: String): User
// removeBook(bookId: String!): User

module.exports = resolvers;