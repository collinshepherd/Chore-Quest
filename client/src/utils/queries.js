import { gql } from '@apollo/client';

export const QUERY_USERS_IN_ACCOUNT = gql`
    query Query {
        Account {
            _id
            users {
                _id
                name
            }
        }
    }
`;
export const QUERY_USERS_ID_FROM_NAME = gql`
    query User($name: String!) {
        User(name: $name) {
            _id
        }
    }
`;

export const QUERY_USERS_TASK = gql`
    query UserTasks {
        UserTasks {
            _id
            assignedUser
            complete
            taskName
        }
    }
`;

export const QUERY_ACCOUNT_TASKS = gql`
    query Account {
        Account {
            _id
            masterList {
                complete
                taskName
                assignedUser
                _id
            }
        }
    }
`;
