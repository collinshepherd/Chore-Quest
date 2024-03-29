import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth.js';
import { ADD_ACCOUNT, ADD_USER } from '../utils/mutations';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import '../style/pages.css';

function Signup(props) {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        parentName: '',
        parentPassword: '',
    });
    const [registrationError, setRegistrationError] = useState(false)
    const [addAccount] = useMutation(ADD_ACCOUNT);
    const [addUser] = useMutation(ADD_USER);
    const navigate = useNavigate();

    useEffect(() => {
        if (registrationError){
        setRegistrationError(false)
        }
    }, [formState.email])

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const mutationResponse = await addAccount({
            variables: {
                email: formState.email.toLowerCase(),
                password: formState.password,
                familyName: formState.familyName,
                },
            });

            const token = mutationResponse.data.createAccount.token;
            Auth.login(token);
        } catch (err) {
            if (err.message === 'Email already exists!') {
                setRegistrationError(true)
                return
            }
        }
        

        const userMutationResponse = await addUser({
            variables: {
                name: formState.parentName,
                password: formState.parentPassword,
                role: 'parent',
                // age: formState.age,
            },
        });
        navigate('/addUser');
        window.location.reload();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const renderFamilyNameToolTip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            This is just a username for your account
        </Tooltip>
    );
    const renderParentNameToolTip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            This is the username for your parental account to add tasks and
            create new users
        </Tooltip>
    );
    const renderParentPasswordToolTip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            This is the password for the parent account with admin privileges
        </Tooltip>
    );

    return (
        <Card className="background-light">
            <h2>Signup</h2>
            <Form onSubmit={handleFormSubmit} className="form-width">
            <Alert
                    dismissible
                    onClose={() => setRegistrationError(false)}
                    show={registrationError}
                    variant="danger"
                >
                    This email is already associated with a Chore Quest account! <br/>
                    Try logging in instead.
                </Alert>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="familyName" className="label">
                        Family Name
                    </Form.Label>
                    <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderFamilyNameToolTip}
                    >
                        <FontAwesomeIcon
                            className="mx-2 fs-5"
                            icon={faCircleInfo}
                        />
                    </OverlayTrigger>
                    <Form.Control
                        placeholder="Household Name"
                        name="familyName"
                        type="text"
                        id="familyName"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="email" className="label">
                        Email
                    </Form.Label>
                    <Form.Control
                        placeholder="youremail@mail.com"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="pwd" className="label">
                        Password
                    </Form.Label>
                    <Form.Control
                        placeholder="********"
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="pwd" className="label">
                        Parent Account Username
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderParentNameToolTip}
                        >
                            <FontAwesomeIcon
                                className="mx-2 fs-5"
                                icon={faCircleInfo}
                            />
                        </OverlayTrigger>
                    </Form.Label>
                    <Form.Control
                        placeholder="Parent"
                        name="parentName"
                        type="text"
                        id="parentName"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="pwd" className="label" >
                        Parent Account Passcode
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderParentPasswordToolTip}
                        >
                            <FontAwesomeIcon
                                className="mx-2 fs-5"
                                icon={faCircleInfo}
                            />
                        </OverlayTrigger>
                    </Form.Label>
                    <Form.Control
                        placeholder="****"
                        name="parentPassword"
                        type="password"
                        id="parentPassword"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="dark" className="label">
                    Create Account
                </Button>
            </Form>
        </Card>
    );
}

export default Signup;
