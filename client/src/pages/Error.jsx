import { useRouteError } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import '../style/pages.css';

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <Card id="error-page" className='background-light'>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </Card>
    );
}
