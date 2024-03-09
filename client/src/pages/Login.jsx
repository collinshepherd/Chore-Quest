import { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { ACCOUNT_LOGIN } from '../utils/mutations';
import '../style/pages.css';

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({
        email: '',
        password: '',
    });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    // Adding the mutation for loginAccount
    const [loginAccount, { error }] = useMutation(ACCOUNT_LOGIN);

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
                    email: userFormData.email,
                    password: userFormData.password,
                },
            });
            // If data is not given back throw an error
            if (!response.data) {
                throw new Error('something went wrong!');
            }
            // Assign the token
            const token = response.data.accountLogin.token;

            Auth.login(token);
            navigate('/users');
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }
        setUserFormData({
            username: '',
            email: '',
            password: '',
        });
    };
    return (
        <Card className='background-light'>
            <h2>Login</h2>
            <Form
                noValidate
                validated={validated}
                onSubmit={handleFormSubmit}
                className="form-width"
            >
                <Alert
                    dismissible
                    onClose={() => setShowAlert(false)}
                    show={showAlert}
                    variant="danger"
                >
                    Something went wrong with your login credentials!
                </Alert>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="email" className='label'>Email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Your email"
                        name="email"
                        onChange={handleInputChange}
                        value={userFormData.email}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Email is required!
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="password" className='label'>Password</Form.Label>
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
                    disabled={!(userFormData.email && userFormData.password)}
                    type="submit"
                    variant="dark"
                    className='label'
                >
                    Login
                </Button>
            </Form>
        </Card>
    );
};
export default LoginForm;
