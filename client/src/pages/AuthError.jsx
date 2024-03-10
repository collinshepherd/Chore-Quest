import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import '../style/pages.css';

export default function AuthError(props) {
    console.log(props);

    const returnHome = () => {
        useNavigate('/');
    };

    return (
        <Card id="error-page" className="background-light">
            <h1>Oops! You aren't supposed to be here.</h1>
            <h4 className="text-dark fw-bold">{props.message}</h4>
            <Link to="/" style={{ color: 'red' }}>
                <Button className="w-100" variant="danger">
                    Return to a safe place
                </Button>
            </Link>
        </Card>
    );
}
