import { gql } from '@apollo/client'

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            Account {
                _id
            }
        }
    }
`

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
`

export const ADD_USER = gql`
    mutation addUser($name: String!, $password: String!, $age: Int) {
        addUser(name: $name, password: $password, familyName: $familyName) {
            token
            User {
                _id
            }
        }
    }
`

export const ADD_TASK = gql`
    mutation Mutation($taskName: String!, $assignedUser: ID!) {
        addTask(taskName: $taskName, assignedUser: $assignedUser) {
            _id
            taskName
        }
    }
`
