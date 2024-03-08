import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import Auth from '../utils/auth.js'
import { ADD_ACCOUNT } from '../utils/mutations'
import { Form, Button, Alert } from 'react-bootstrap';

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
        navigate('/users');
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div className="">
            <Link to="/login">← Go to Login</Link>

            <h2>Signup</h2>
            <Form onSubmit={handleFormSubmit} className='form-width'>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor="familyName">Family Name:</Form.Label>
                    <Form.Control
                        placeholder="Household Name"
                        name="familyName"
                        type="familyName"
                        id="familyName"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor="email">Email:</Form.Label>
                    <Form.Control
                        placeholder="youremail@mail.com"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor="pwd">Password:</Form.Label>
                    <Form.Control
                        placeholder="********"
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button type='submit'variant='dark'>
                    Create Account
                </Button>
            </Form>
        </div>
    );
}

export default Signup;
