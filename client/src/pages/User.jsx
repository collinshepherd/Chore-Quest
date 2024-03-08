import { useQuery } from '@apollo/client';
import UserList from '../components/UserList';

import { QUERY_USERS_IN_ACCOUNT } from '../utils/queries';

const User = () => {
    const { data } = useQuery(QUERY_USERS_IN_ACCOUNT);

    const users = data?.Account.users || [];

    return (
        <>
            <h1>Profiles</h1>
            <br />
            <UserList users={users} />
        </>
    );
};

export default User;
