// Importing necessary modules
import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import AppFooter from './components/Footer'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// Creating an Apollo Client instance with default config
const client = new ApolloClient({
    // Setting up memory cache
    cache: new InMemoryCache(),
})

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <ApolloProvider client={client}>
                <Header />

                <Outlet />

                <AppFooter />
            </ApolloProvider>
        </>
    )
}

export default App
