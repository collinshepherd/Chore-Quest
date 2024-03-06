import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      Account {
        _id
      }
    }
  }
`;

export const ADD_ACCOUNT = gql`
  mutation addAccount(
    $email: String!
    $password: String!
    $familyName: String!
  ) {
    addAccount(
      email: $email
      password: $password
      familyName: $familyName
    ) {
      token
      Account {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
 mutation addUser(
    $name: String!
    $password: String!
    $age: Int
  ) {
    addAccount(
      email: $email
      password: $password
      familyName: $familyName
    ) {
      token
      User {
        _id
      }
    }
  }
`;