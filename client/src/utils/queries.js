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
