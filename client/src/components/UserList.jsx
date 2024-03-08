import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const UserList = ({ users }) => {
    if (!users.length) {
        return <h3>No Profiles Yet</h3>;
    }

    return (
        <div>
            {users &&
                users.map((user) => (
                    <LinkContainer to={`/users/${user._id}`} key={user._id}>
                        <Card>
                            <CardHeader>{user.name}</CardHeader>
                        </Card>
                    </LinkContainer>
                ))}
        </div>
    );
};

export default UserList;
