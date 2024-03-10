import Auth from '../utils/auth';
import { QUERY_USERS_TASK } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';

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

    const deleteTask = (id) => {
        console.log('delete this ID', id);
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
                                <ListGroup.Item key={task._id}>
                                    {task.taskName}
                                    <button
                                        onClick={() => deleteTask(task._id)}
                                    >
                                        Delete
                                    </button>
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
