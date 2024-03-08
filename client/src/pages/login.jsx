import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            emailOrUsername: '',
            password: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange(event) {
        event.preventDefault()
        const target = event.target
        this.setState({
            [target.name]: target.value,
        })
    }

    LoginForm = () => {
        const [userFormData, setUserFormData] = useState({
            email: '',
            password: '',
        })
        const [validated] = useState(false)
        const [showAlert, setShowAlert] = useState(false)

        const handleInputChange = (event) => {
            const { name, value } = event.target
            setUserFormData({ ...userFormData, [name]: value })
        }

        const handleFormSubmit = async (event) => {
            event.preventDefault()

            // check if form has everything (as per react-bootstrap docs)
            const form = event.currentTarget
            if (form.checkValidity() === false) {
                event.preventDefault()
                event.stopPropagation()
            }

            try {
                const response = await loginUser(userFormData)

                if (!response.ok) {
                    throw new Error('something went wrong!')
                }

                const { token, user } = await response.json()
                console.log(user)
                Auth.login(token)
            } catch (err) {
                console.error(err)
                setShowAlert(true)
            }

            setUserFormData({
                username: '',
                email: '',
                password: '',
            })
        }

        return (
            <>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleFormSubmit}
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
                        <Form.Label htmlFor="email">Email</Form.Label>
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
                        disabled={
                            !(userFormData.email && userFormData.password)
                        }
                        type="submit"
                        variant="success"
                    >
                        Submit
                    </Button>
                </Form>
            </>
        )
    }
}
export default LoginForm
