import Auth from '../utils/auth';
import KidTaskList from '../components/KidTaskList';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import '../style/pages.css';
import ParentProfile from '../components/ParentProfile';
import AuthError from './AuthError';
import { Col, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USERS_NAME_FROM_ID } from '../utils/queries';

const Profile = () => {
    // Checking if the user is logged in so then they can see the page
    if (!Auth.loggedIn()) {
        return (
            <AuthError
                message={
                    'Login in to your account before trying to look at your profile'
                }
            />
        );
    }
    const authToken = Auth.getProfile();

    const {
        familyName,
        firstName,
        userId,
        _id: familyId,
        role,
    } = authToken.data;

    const renderProfile = () => {
        if (role === 'kid') {
            return <KidTaskList />;
        } else {
            return <ParentProfile />;
        }
    };

    const params = useParams();
    const { loading, error, data } = useQuery(QUERY_USERS_NAME_FROM_ID, {
        variables: {
            id: params.userId,
        },
    });

    return (
        <Card className="background-light">
            <Tab.Container
                id="list-group-tabs-example"
                defaultActiveKey="#activeTasks"
            >
                <Row>{renderProfile()}</Row>
            </Tab.Container>
        </Card>
    );
};

export default Profile;
