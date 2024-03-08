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
                    <LinkContainer
                        to={`/userLogin/${user.name}`}
                        key={user._id}
                    >
                        <Card>
                            <Card.Header>{user.name}</Card.Header>
                        </Card>
                    </LinkContainer>
                ))}
        </div>
    );
};

export default UserList;
