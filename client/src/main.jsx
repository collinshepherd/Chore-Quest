import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import App from './App.jsx'
import Homepage from './pages/Homepage.jsx'
import Signup from './pages/Signup.jsx'
// import Login from './pages/Login.jsx'
import AddUser from './pages/AddUser.jsx'
import AddTask from './pages/AddTask.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        //   errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Homepage />,
            },
            {
                path: '/signup',
                element: <Signup />,
            },
            // {
            //     path: '/login',
            //     element: <Login />,
            // },
            {
                path: '/addUser',
                element: <AddUser />,
            },
            {
                path: '/addTask',
                element: <AddTask />,
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
