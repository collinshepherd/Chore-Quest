// Importing necessary modules
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Navigation from './components/Nav';
import UserNavigation from './components/UserNav';
import { Outlet } from 'react-router-dom';
import AppFooter from './components/Footer';
import Auth from './utils/auth';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


// Creating an Apollo Client instance with default config
const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    const loggedIn = Auth.loggedIn(true);
    
    const returnNavBar = () => {
        if(loggedIn) {
            return <UserNavigation />
        }
        return <Navigation />
    }


    const [count, setCount] = useState(0);

    return (
        <>
            <ApolloProvider client={client}>
                <Header />
                { returnNavBar() }

                <Outlet />

                <AppFooter />
            </ApolloProvider>
        </>
    );
}

export default App;
