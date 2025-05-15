import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './styles/index.scss';

import MainPage from './Pages/MainPage/index.jsx';
import Historical from './Pages/Historical/index.jsx';
import Preview from './Pages/Preview/Preview.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Preview />,
  },
  {
    path: '/main',
    element: <MainPage />,
  },
  {
    path: '/history',
    element: <Historical />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
