import { useQuery } from '@apollo/client';
import UserList from '../components/UserList';
import { Card } from 'react-bootstrap';
import '../style/pages.css';
import { QUERY_USERS_IN_ACCOUNT } from '../utils/queries';
import AuthError from './AuthError';
import Auth from '../utils/auth';

const User = () => {
    // Checking if the user is logged in so then they can see the page
    if (!Auth.loggedIn()) {
        return (
            <AuthError
                message={
                    'Login in to your account before trying to look at users'
                }
            />
        );
    }
    const { data } = useQuery(QUERY_USERS_IN_ACCOUNT);
    console.log(data);
    const users = data?.Account.users || [];

    return (
        <Card className="background-light">
            <h1>Profiles</h1>
            <br />
            <UserList users={users} />
        </Card>
    );
};

export default User;
