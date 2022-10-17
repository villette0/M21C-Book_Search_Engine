import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($authors: [String]!, $description: String!, $title: String!, $bookId: String!, $image: String) {
    saveBook(authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image): User) {
        _id
            username
            email
            bookCount
            savedBooks{
                title
                authors
                bookId
                description
    }
  }
}
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!){
        removeBook(bookId: $bookId){
            _id
            username
            email
            bookCount
            savedBooks{
                title
                authors
                bookId
                description
            }
        }
    }`

// Google books api
// https://www.googleapis.com/books/v1/volumes?q=ready+player+one
export const searchGoogleBooks = (query) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
