import { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import '../style/pages.css';
import AuthError from './AuthError';

const UserLogin = () => {
    // Checking if the user is logged in so then they can see the page
    if (!Auth.loggedIn()) {
        return (
            <AuthError
                message={
                    'Login in to your account before trying to login to a user'
                }
            />
        );
    }

    const params = useParams();

    const { data } = Auth.getProfile();

    // Checks the Auth Token to see if the user they are trying to login to is already validated in the token
    // If it is then it will send them to their profile
    if (params.name === data.firstName) {
        window.location.href = '/profile';
    }

    const [userFormData, setUserFormData] = useState({
        password: '',
    });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    // Adding the mutation for loginAccount
    const [loginAccount, { error }] = useMutation(LOGIN_USER);

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            // Await the creation of the login response
            const response = await loginAccount({
                variables: {
                    name: params.name.toLowerCase(),
                    password: userFormData.password,
                },
            });
            // If data is not given back throw an error
            if (!response.data) {
                throw new Error('something went wrong!');
            }
            // Assign the token
            const token = response.data.userLogin.token;
            console.log(token);

            Auth.login(token);
            navigate('/profile');
            window.location.reload();
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }
        setUserFormData({
            password: '',
        });
    };
    return (
        <Card className="background-light">
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Alert
                    dismissible
                    onClose={() => setShowAlert(false)}
                    show={showAlert}
                    variant="danger"
                >
                    Something went wrong with your login credentials!
                </Alert>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Your password"
                        name="password"
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Password is required!
                    </Form.Control.Feedback>
                </Form.Group>
                <Button
                    disabled={!userFormData.password}
                    type="submit"
                    variant="success"
                >
                    Submit
                </Button>
            </Form>
        </Card>
    );
};
export default UserLogin;
