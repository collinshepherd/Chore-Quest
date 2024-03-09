import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth.js';
import { ADD_ACCOUNT } from '../utils/mutations';
import { Form, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import '../style/pages.css';

function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [addAccount] = useMutation(ADD_ACCOUNT);

    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const mutationResponse = await addAccount({
            variables: {
                email: formState.email,
                password: formState.password,
                familyName: formState.familyName,
            },
        });
        const token = mutationResponse.data.createAccount.token;
        Auth.login(token);
        navigate('/addUser');
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            This is just a username for your account
        </Tooltip>
    );

    return (

        <Card className='background-light'>
            <h2>Signup</h2>
            <Form onSubmit={handleFormSubmit} className="form-width">
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="familyName" className='label'>Family Name</Form.Label>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                    >
                        <FontAwesomeIcon
                            className="mx-2 fs-5"
                            icon={faCircleInfo}
                        />
                    </OverlayTrigger>
                    <Form.Control
                        placeholder="Household Name"
                        name="familyName"
                        type="familyName"
                        id="familyName"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="email" className='label'>Email</Form.Label>
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
                    <Form.Label htmlFor="pwd" className='label'>Password</Form.Label>
                    <Form.Control
                        placeholder="********"
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="dark" className='label'>
                    Create Account
                </Button>
            </Form>
        </Card>
    );
}

export default Signup;
