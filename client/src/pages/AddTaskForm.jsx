import { useEffect, useRef, useState } from 'react'
import { ADD_TASK } from '../utils/mutations'
import { useMutation, useQuery } from '@apollo/client'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { QUERY_USERS_IN_ACCOUNT } from '../utils/queries'

function AddTaskForm() {
    // Keeping track of the form state
    const [formState, setFormState] = useState({
        taskName: '',
        assignedUser: '',
    })
    // Mutation to add a task to the database
    const [addTask, { error }] = useMutation(ADD_TASK)
    const { data } = useQuery(QUERY_USERS_IN_ACCOUNT, {
        fetchPolicy: 'network-only',
    })
    // const accountUsers = data.Account.users.map((user) => {
    //     return user.name
    // })

    useEffect(() => {
        console.log(data)
        if (data) {
            console.log(data.Account.users)
        }
    }, [])

    // handler for when the user submits the form
    const handleFormSubmit = async (event) => {
        event.preventDefault()
        console.log(formState)
        // const mutationResponse = await addTask({
        //     variables: { taskName: formState.taskName },
        // })
        // console.log(mutationResponse)
    }

    // change handler so when the user inputs something into the form the formState is updated
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormState({
            ...formState,
            [name]: value,
        })
    }

    return (
        <>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicTask">
                    <Form.Label>New Task Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter new task"
                        name="taskName"
                        onChange={handleChange}
                    />
                    <Form.Text className="text-muted">
                        Make the task so cool!
                    </Form.Text>
                </Form.Group>

                <Form.Select
                    aria-label="Default select example"
                    name="assignedUser"
                    onChange={handleChange}
                >
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
                <Button className="mb-3" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default AddTaskForm
