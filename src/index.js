import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Auth from "./Auth";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/auth",
        element: <Auth/>,
    }
]);

ReactDOM.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);

