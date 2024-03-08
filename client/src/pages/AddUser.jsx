import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

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
        const mutationResponse = await addUser({
            variables: {
                name: formState.name,
                password: formState.password,
                age: formState.age,
                role: formState.role,
            },
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
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
            <form onSubmit={handleFormSubmit}>
                <div className="">
                    <label htmlFor="name">Name:</label>
                    <input
                        placeholder="name"
                        name="name"
                        type="name"
                        id="name"
                        onChange={handleChange}
                    />
                </div>
                <div className="">
                    <label htmlFor="role">Role:</label>
                    <select defaultValue="parent">
                        <option value="parent">Parent</option>
                        <option value="kid">Kid</option>
                    </select>
                </div>
                <div className="">
                    <label htmlFor="age">Age (optional):</label>
                    <input
                        placeholder="age"
                        name="age"
                        type="age"
                        id="age"
                        onChange={handleChange}
                    />
                </div>
                <div className="">
                    <label htmlFor="pwd">Personal Passcode:</label>
                    <input
                        placeholder="****"
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={handleChange}
                    />
                </div>
                <div className="">
                    <button type="submit">Create Profile</button>
                </div>
            </form>
        </div>
    );
}

export default AddUser;
