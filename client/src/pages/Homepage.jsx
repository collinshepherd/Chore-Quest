import { Link } from 'react-router-dom';
import { Card, Row, Col } from "react-bootstrap";

function Homepage() {
    return (
        <>
            <Link to="signup">Sign Up</Link>
            <Link to="login">Login</Link>
            <br/>
            <Card>
                <h1>
                    Welcome to Chore Quest!
                </h1>
                <br/>
                <p>
                    Chore Quest is an interactive way for kids to become more interested in doing their chores by incentivising each chore. They will be able to see their progress and potential rewards, helping them learn to set and achieve their goals.
                </p>
            </Card>
            <br/>
            <Card>
                <Row>
                    <Col md>
                        <h3>
                            Already have a Chore Quest account? 
                        </h3>
                        <br/>
                        <p>
                            Ask your parents to "Login" and then choose your name to start completing quests!
                        </p>
                    </Col>
                    <Col md>
                        <h1>OR</h1>
                    </Col>
                    <Col md>
                        <h3>
                            Start using Chore Quest with 3 easy steps.
                        </h3>
                        <br/>
                        <ol>
                            <li>
                                Create a household account by clicking "Sign Up".
                            </li>
                            <li>
                                Add profiles for your children and spouse as applicable.
                            </li>
                            <li>
                                Start adding chores to your Quest List.
                            </li>
                        </ol>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default Homepage