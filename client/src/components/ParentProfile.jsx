import { QUERY_USERS_IN_ACCOUNT, QUERY_ACCOUNT_TASKS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { Button, Card, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

const ParentProfile = () => {
    // Declaring variables to store tasks and users
    let taskList = [];
    let activeTasks = [];
    let completedTasks = [];
    let usersInAccount = [];
    // Query for all users in the account
    const {
        loading: usersLoading,
        arg: usersArg,
        data: usersData,
    } = useQuery(QUERY_USERS_IN_ACCOUNT);

    // Query for all tasks in the account
    const { loading, arg, data } = useQuery(QUERY_ACCOUNT_TASKS);

    // If the users query has loaded it will fill the usersInAccount variable with all of the users
    if (usersLoading) {
        console.log('loading');
    } else {
        usersInAccount = usersData.Account.users.map((user) => {
            return { name: user.name, id: user._id };
        });
    }
    // If the tasks query has loaded it will fill the taskList with all of the tasks
    if (loading) {
        console.log('loading');
    } else {
        taskList = data.Account.masterList;
        // Checking the ID from the account Query against the task query so the task can display who is assigned to the task
        const updatedTaskList = taskList.map((task) => {
            let updatedTask = {};
            usersInAccount.forEach((user) => {
                if (task.assignedUser === user.id) {
                    updatedTask = {
                        ...task,
                        name: user.name,
                    };
                }
            });

            return updatedTask;
        });

        // Puts the tasks into separate arrays for complete tasks and active tasks
        updatedTaskList.forEach((task) => {
            if (task.complete) {
                completedTasks.push(task);
            } else {
                activeTasks.push(task);
            }
        });
    }
    const deleteTask = (id) => {
        console.log('delete this ID', id);
    };

    return (
        <>
            <Col sm={4}>
                <ListGroup>
                    {/* Currently user/userId does not exist as a path yet */}
                    {usersInAccount.map((user) => (
                        <Link key={user.id} to={`/user/${user.id}`}>
                            <Button
                                key={user.id}
                                className="my-2 w-100 btn-dark "
                            >
                                {user.name}
                            </Button>
                        </Link>
                    ))}
                </ListGroup>
            </Col>
            <Col sm={8}>
                <ListGroup horizontal>
                    <ListGroup.Item
                        action
                        href="#activeTasks"
                        className="my-2"
                        key="activeTasks"
                    >
                        Active Tasks
                    </ListGroup.Item>
                    <ListGroup.Item
                        action
                        key="completedTasks"
                        href="#completedTasks"
                        className="my-2"
                    >
                        Completed Tasks
                    </ListGroup.Item>
                </ListGroup>
                <Tab.Content>
                    <Tab.Pane eventKey="#activeTasks">
                        <ListGroup>
                            {activeTasks.map((task) => (
                                <ListGroup.Item
                                    key={task._id}
                                    className="d-flex justify-content-evenly justify-content-center"
                                >
                                    <FontAwesomeIcon
                                        onClick={() => deleteTask(task._id)}
                                        className="fs-2 align-self-center"
                                        icon={faCheckCircle}
                                    />
                                    <div className="">
                                        Task: {task.taskName} <br />
                                        Assigned User: {task.name}
                                    </div>
                                    <FontAwesomeIcon
                                        onClick={() => deleteTask(task._id)}
                                        className="fs-2 align-self-center"
                                        icon={faTrash}
                                    />
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Tab.Pane>
                    <Tab.Pane eventKey="#completedTasks">
                        <ListGroup>
                            {completedTasks.map((task) => (
                                <ListGroup.Item key={task._id}>
                                    Task: {task.taskName} <br /> Assigned User:{' '}
                                    {task.name}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Tab.Pane>
                </Tab.Content>
            </Col>
        </>
    );
};

export default ParentProfile;
