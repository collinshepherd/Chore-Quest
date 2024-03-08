import { useState } from 'react'
import { Link, useNavigate, redirect } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import Auth from '../utils/auth.js'
import { ADD_ACCOUNT } from '../utils/mutations'

function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: '' })
    const [addAccount] = useMutation(ADD_ACCOUNT)

    const navigate = useNavigate()

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        
        const mutationResponse = await addAccount({
            variables: {
                email: formState.email,
                password: formState.password,
                familyName: formState.familyName,
            },
        })
        const token = mutationResponse.data.createAccount.token
        Auth.login(token)
        navigate('/addUser')
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormState({
            ...formState,
            [name]: value,
        })
    }

    return (
        <div className="">
            <Link to="/login">← Go to Login</Link>

            <h2>Signup</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="">
                    <label htmlFor="familyName">Family Name:</label>
                    <input
                        placeholder="Household Name"
                        name="familyName"
                        type="familyName"
                        id="familyName"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="">
                    <label htmlFor="email">Email:</label>
                    <input
                        placeholder="youremail@mail.com"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="">
                    <label htmlFor="pwd">Password:</label>
                    <input
                        placeholder="********"
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="">
                    <button type="submit">Create Account</button>
                </div>
            </form>
        </div>
    )
}

export default Signup
