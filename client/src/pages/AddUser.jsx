import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

import { Form, Button, Alert } from 'react-bootstrap';
import '../style/pages.css';

function AddUser(props) {
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
            <h2>Add a Family Member</h2>
            <Form onSubmit={handleFormSubmit} className="form-width">
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="name">Name</Form.Label>
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
                    <Form.Label htmlFor="role">Role</Form.Label>
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
                    <Form.Label htmlFor="age">Age (optional)</Form.Label>
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
                    <Form.Label htmlFor="pwd">Personal Passcode</Form.Label>
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
                <Button type="submit" variant="dark">
                    Create Profile
                </Button>
            </Form>
        </div>
    );
}

export default AddUser;
