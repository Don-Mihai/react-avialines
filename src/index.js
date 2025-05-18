import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './styles/index.scss';

import MainPage from './Pages/MainPage/index.jsx';
import HistoricalPage from './Pages/HistoricalPage/index.jsx';
import Preview from './Pages/Preview/Preview.jsx';
import CheliuskinaPage from './Pages/HistoricalPage/CheliuskinaPage/index.jsx';
import NordicPage from './Pages/HistoricalPage/NordicPage/index.jsx';
import PersonaliPage from './Pages/PersonaliPage/index.jsx';
import GamesPage from './Pages/GamesPage/index.jsx';
import FilmsPage from './Pages/FilmsPage/index.jsx';
import PersonDetail from './Pages/PersonaliPage/PersonDetail/index.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Preview />,
    },
    {
        path: 'main',
        element: <MainPage />,
    },
    {
        path: 'history',
        element: <HistoricalPage />,
    },
    {
        path: 'nordic',
        element: <NordicPage />,
    },
    {
        path: 'cheliuskina',
        element: <CheliuskinaPage />,
    },
    {
        path: 'personali',
        children: [
            {
                index: true,
                element: <PersonaliPage />,
            },
            {
                path: ':id',
                element: <PersonDetail />,
            },
        ],
    },
    {
        path: 'films',
        element: <FilmsPage />,
    },
    {
        path: 'games',
        element: <GamesPage />,
    },
    {
        path: '*',
        element: <div>Страница не найдена</div>,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
