import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import AppFooter from './components/Footer'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Header />

            <Outlet />

            <AppFooter />
        </>
    )
}

export default App
