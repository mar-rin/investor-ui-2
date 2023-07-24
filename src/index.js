import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './routes/App';
import Result from './routes/Result';


import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "./routes/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    },
    {
        path: "/result",
        element: <Result />
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <div className="Main">
            <RouterProvider  router={router}/>
        </div>
    </React.StrictMode>
);


