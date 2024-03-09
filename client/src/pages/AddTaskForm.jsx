import { useEffect, useRef, useState } from 'react';
import { ADD_TASK } from '../utils/mutations';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
    QUERY_USERS_IN_ACCOUNT,
    QUERY_USERS_ID_FROM_NAME,
} from '../utils/queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function AddTaskForm() {
    // Keeping track of the form state
    const [formState, setFormState] = useState({
        taskName: '',
        assignedUser: '',
    });
    // Mutation to add a task to the database
    const [addTask, { error }] = useMutation(ADD_TASK);
    const { loading, error: arg, data } = useQuery(QUERY_USERS_IN_ACCOUNT);

    const [
        getUserId,
        { data: otherData, loading: otherLoading, error: otherError },
    ] = useLazyQuery(QUERY_USERS_ID_FROM_NAME, {
        variables: { name: formState.assignedUser },
    });

    // Variable to hold all the names of the users
    let usersInAccount;

    // If the data isn't received yet this if statement will prevent an error
    if (loading) {
        console.log('loading');
    } else {
        usersInAccount = data.Account.users.map((user) => {
            return user.name;
        });
    }
    // handler for when the user submits the form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (formState.assignedUser === '') {
            alert('Please assign a user to the task');
        }

        const userId = await getUserId();

        const mutationResponse = await addTask({
            variables: {
                taskName: formState.taskName,
                assignedUser: userId.data.User._id,
            },
        });
        console.log(mutationResponse);
    };

    // change handler so when the user inputs something into the form the formState is updated
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Assign who you want to do the task!
        </Tooltip>
    );

    if (loading) {
        return <p>Loading....</p>;
    } else {
        return (
            <>
                <h2>Add a Quest</h2>
                <Form onSubmit={handleFormSubmit} className="form-width">
                    <Form.Group className="mb-3" controlId="formBasicTask">
                        <Form.Label>New Task Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter new task"
                            name="taskName"
                            onChange={handleChange}
                            required
                        />
                        <Form.Text className="text-muted">
                            Make the task so cool!
                        </Form.Text>
                    </Form.Group>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                    >
                        <FontAwesomeIcon
                            className="mx-2 fs-5 mb-2"
                            icon={faCircleInfo}
                        />
                    </OverlayTrigger>
                    <Form.Select
                        aria-label="Assigned User Dropdown"
                        name="assignedUser"
                        onChange={handleChange}
                        required
                    >
                        <option value hidden>
                            Select a user
                        </option>
                        {usersInAccount.map((user) => (
                            <option key={user}>{user}</option>
                        ))}
                    </Form.Select>

                    <Button variant="dark" type="submit" className="my-2">
                        Add Task
                    </Button>
                </Form>
            </>
        );
    }
}
export default AddTaskForm;
