import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import { Form, Button, Card } from 'react-bootstrap';
import '../style/pages.css';
import AuthError from './AuthError';

function AddUser(props) {
    // Checking if the user is logged in so then they can see the page
    if (!Auth.loggedIn()) {
        return (
            <AuthError
                message={'Login in to your account before trying to add a user'}
            />
        );
    }
    const [formState, setFormState] = useState({
        name: '',
        password: '',
        age: '',
        role: '',
    });
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (formState.role === '') {
            alert('Please select a role');
            return;
        }
        console.log(formState);
        const mutationResponse = await addUser({
            variables: {
                name: formState.name,
                password: formState.password,
                role: formState.role,
                // age: formState.age,
            },
        });
        setFormState({
            name: '',
            password: '',
            age: '',
            role: '',
        });
        window.location.reload();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <Card className="background-light">
            <h2>Add a Family Member</h2>
            <Form onSubmit={handleFormSubmit} className="form-width">
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="name" className="label">
                        Name
                    </Form.Label>
                    <Form.Control
                        placeholder="name"
                        name="name"
                        type="name"
                        id="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="role" className="label">
                        Role
                    </Form.Label>
                    <Form.Select
                        aria-label="Role Select Dropdown"
                        onChange={handleChange}
                        name="role"
                        value={formState.role}
                        required
                    >
                        <option value hidden>
                            Choose Profile Role
                        </option>
                        <option value="parent">Parent</option>
                        <option value="kid">Kid</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="age" className="label">
                        Age (optional)
                    </Form.Label>
                    <Form.Control
                        placeholder="age"
                        name="age"
                        type="age"
                        id="age"
                        value={formState.age}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="pwd" className="label">
                        Personal Passcode
                    </Form.Label>
                    <Form.Control
                        placeholder="****"
                        name="password"
                        type="password"
                        id="pwd"
                        minLength="4"
                        onChange={handleChange}
                        value={formState.password}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="dark" className="label">
                    Create Profile
                </Button>
            </Form>
        </Card>
    );
}

export default AddUser;
