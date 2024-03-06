import { gql } from '@apollo/client'

export const QUERY_USERS_IN_ACCOUNT = gql`
    query Accounts {
        Account {
            users {
                name
            }
        }
    }
`
export const QUERY_USERS_ID_FROM_NAME = gql`
    query User($name: String!) {
        User(name: $name) {
            _id
        }
    }
`
