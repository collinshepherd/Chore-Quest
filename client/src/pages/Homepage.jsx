import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import '../style/pages.css';
import styled, { keyframes } from 'styled-components';
import { fadeInLeft } from 'react-animations';

const bounceAnimation = keyframes`${fadeInLeft}`;

const BouncyDiv = styled.div`
    animation: 2.5s ${bounceAnimation}`;
;

function Homepage() {
    return (
        <>
        <BouncyDiv>
            <Card className='background-light'>
                <h1>Welcome to Chore Quest!</h1>
                <br />
                <p>
                    Chore Quest is an interactive way for kids to become more 
                    interested in doing their chores. They will be able to see 
                    their assigned tasks and completed tasked, helping them 
                    learn to set and achieve their goals.
                </p>
            </Card>
            <br />
            <Card className="background-light">
                <Row>
                    <Col md>
                        <h3>Already have a Chore Quest account?</h3>
                        <br />
                        <p>
                            Ask your parents to
                            <br />
                            <Link to="login"> <Button className="w-100" variant="success">Login</Button></Link> 
                             <br />
                             and then choose your
                            name to start completing quests!
                        </p>
                    </Col>
                    <Col md>
                        <h1>OR</h1>
                    </Col>
                    <Col md>
                        <h3>Start using Chore Quest with 3 easy steps.</h3>
                        <br />
                        <ol>
                            <li>
                                Ask your parent to create a household account by clicking 
                                <br/>
                                <Link to="/Signup"> <Button className="w-100" variant="success">Sign
                                Up</Button></Link>
                            </li>
                            <li>
                                Add profiles for parents and children as
                                applicable.
                            </li>
                            <li>Start adding chores to your Quest List.</li>
                        </ol>
                    </Col>
                </Row>
            </Card>
         </BouncyDiv>
        </>
    );
}

export default Homepage;
