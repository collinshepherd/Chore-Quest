import { gql } from '@apollo/client';

export const ACCOUNT_LOGIN = gql`
    mutation Mutation($email: String!, $password: String!) {
        accountLogin(email: $email, password: $password) {
            token
            account {
                _id
                email
                password
                familyName
            }
        }
    }
`;

export const ADD_ACCOUNT = gql`
    mutation Mutation(
        $familyName: String!
        $email: String!
        $password: String!
    ) {
        createAccount(
            familyName: $familyName
            email: $email
            password: $password
        ) {
            token
            account {
                _id
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation Mutation($name: String!, $password: String!, $role: String!) {
        createUser(name: $name, password: $password, role: $role) {
            _id
        }
    }
`;

export const LOGIN_USER = gql`
    mutation userLogin($name: String!, $password: String!) {
        userLogin(name: $name, password: $password) {
            token
            user {
                _id
                name
            }
        }
    }
`;

export const ADD_TASK = gql`
    mutation Mutation($taskName: String!, $assignedUser: ID!) {
        addTask(taskName: $taskName, assignedUser: $assignedUser) {
            _id
            taskName
        }
    }
`;

export const COMPLETE_TASK = gql`
    mutation Mutation($id: ID!) {
        completeTask(_id: $id) {
            _id
            complete
            taskName
        }
    }
`;

export const REMOVE_TASK = gql`
    mutation DeleteTask($id: ID!) {
        deleteTask(_id: $id) {
            _id
            taskName
        }
    }
`;
