import Auth from '../utils/auth';
import { QUERY_USERS_TASK } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import { COMPLETE_TASK } from '../utils/mutations';

const KidTaskList = () => {
    const authToken = Auth.getProfile();
    let taskList = [];
    let activeTasks = [];
    let completedTasks = [];
    const { loading, arg, data } = useQuery(QUERY_USERS_TASK);
    if (loading) {
        console.log('loading');
    } else {
        taskList = data.UserTasks;
        taskList.forEach((task) => {
            if (task.complete) {
                completedTasks.push(task);
            } else {
                activeTasks.push(task);
            }
        });
    }

    const {
        familyName,
        firstName,
        userId,
        _id: familyId,
        role,
    } = authToken.data;

    const [completeTask] = useMutation(COMPLETE_TASK);

    const FinishTask = async (id) => {
        const mutationResponse = await completeTask({
            variables: {
                id: id,
            },
        });
        window.location.reload();
    };

    return (
        <>
            <Col sm={4}>
                <ListGroup>
                    <ListGroup.Item action href="#activeTasks" className="my-2">
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
                            <h2 className="my-2">Current Tasks: </h2>

                            {activeTasks.map((task) => (
                                <ListGroup.Item
                                    key={task._id}
                                    className="d-flex justify-content-evenly"
                                >
                                    <FontAwesomeIcon
                                        onClick={() => FinishTask(task._id)}
                                        className="fs-2 "
                                        icon={faCheckCircle}
                                    />
                                    <div className="">
                                        Task: {task.taskName} Assigned User:{' '}
                                        {firstName}
                                    </div>
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
        </>
    );
};

export default KidTaskList;
