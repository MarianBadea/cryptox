import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import { Crypto } from './pages/Crypto';
import { Trending } from './pages/Trending';
import { Saved } from './pages/Saved';
import { CryptoDetails } from './components/CryptoDetails';
import { UnlockPage } from './pages/UnlockPage';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Crypto />,
        children: [
          {
            path:":coinId",
            element: <CryptoDetails />
          },
          {
            path:"/wallet/unlock",
            element: <UnlockPage />
          }
        ]
      },
      {
        path: "/trending",
        element: <Trending />,
        children: [
          {
            path:":coinId",
            element: <CryptoDetails />
          }
        ]
      },
      {
        path: "/saved",
        element: <Saved />,
        children: [
          {
            path:":coinId",
            element: <CryptoDetails />
          }
        ]
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
