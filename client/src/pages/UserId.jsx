import { useQuery } from '@apollo/client';
import {
    QUERY_ACCOUNT_TASKS,
    QUERY_USERS_NAME_FROM_ID,
} from '../utils/queries';
import { useParams } from 'react-router-dom';
import { Card, Col, ListGroup, Row, Tab } from 'react-bootstrap';
import { faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Auth from '../utils/auth';
import AuthError from './AuthError';

const UserId = () => {
    if (!Auth.loggedIn()) {
        return <AuthError message={'Login to your account first!'} />;
    }
    const authData = Auth.getProfile();
    if (authData.role === 'kid') {
        return (
            <AuthError message={'You are not logged into a parent account'} />
        );
    }
    const params = useParams();
    let taskList = [];
    let activeTasks = [];
    let completedTasks = [];
    let firstName = '';

    const { data } = useQuery(QUERY_USERS_NAME_FROM_ID, {
        variables: {
            id: params.userId,
        },
    });
    const { loading, error, data: taskData } = useQuery(QUERY_ACCOUNT_TASKS);
    if (!loading) {
        taskList = taskData?.Account.masterList;
        taskList.forEach((task) => {
            if (task.complete) {
                completedTasks.push(task);
            } else {
                activeTasks.push(task);
            }
        });
        firstName = data?.User.name;
    }

    return (
        <>
            <Card className="background-light">
                <h1 className="m-1">{firstName}'s Tasks:</h1>
                <Tab.Container
                    id="list-group-tabs-example"
                    defaultActiveKey="#activeTasks"
                >
                    <Row>
                        <Col sm={4}>
                            <ListGroup>
                                <ListGroup.Item
                                    action
                                    href="#activeTasks"
                                    className="my-2"
                                >
                                    Active Tasks
                                </ListGroup.Item>
                                <ListGroup.Item action href="#completedTasks">
                                    Completed Tasks
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col sm={8}>
                            <Tab.Content>
                                <Tab.Pane eventKey="#activeTasks">
                                    <ListGroup>
                                        <h2 className="my-2">
                                            Current Tasks:{' '}
                                        </h2>

                                        {activeTasks.map((task) => (
                                            <ListGroup.Item
                                                key={task._id}
                                                className="d-flex justify-content-evenly"
                                            >
                                                <FontAwesomeIcon
                                                    onClick={() =>
                                                        deleteTask(task._id)
                                                    }
                                                    className="fs-2 "
                                                    icon={faCheckCircle}
                                                />
                                                <div className="">
                                                    Task: {task.taskName}{' '}
                                                    Assigned User: {firstName}
                                                </div>
                                                <FontAwesomeIcon
                                                    onClick={() =>
                                                        deleteTask(task._id)
                                                    }
                                                    className="fs-2 "
                                                    icon={faTrash}
                                                />
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#completedTasks">
                                    <h2 className="my-2">Completed Tasks: </h2>
                                    <ListGroup>
                                        {completedTasks.map((task) => (
                                            <ListGroup.Item key={task._id}>
                                                {task.taskName}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Card>
        </>
    );
};

export default UserId;
