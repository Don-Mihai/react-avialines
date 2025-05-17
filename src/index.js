import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './styles/index.scss';

import MainPage from './Pages/MainPage/index.jsx';
import HistoricalPage from './Pages/HistoricalPage/index.jsx';
import Preview from './Pages/Preview/Preview.jsx';
import CheliuskinaPage from './Pages/CheliuskinaPage/index.jsx';
import NordicPage from './Pages/NordicPage/index.jsx';

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
    element: <HistoricalPage />,
  },
  {
    path: '/nordic',
    element: <NordicPage />,
  },
  {
    path: '/cheliuskina',
    element: <CheliuskinaPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
