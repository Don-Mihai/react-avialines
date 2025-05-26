import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './styles/index.scss';

import MainPage from './Pages/MainPage/index.jsx';
import GamesPage from './Pages/GamesPage/index.jsx';
import FilmsPage from './Pages/FilmsPage/index.jsx';
import Preview from './Pages/Preview/Preview.jsx';

import HistoricalPage from './Pages/HistoricalPage/index.jsx';

import PersonaliPage from './Pages/PersonaliPage/index.jsx';
import PersonDetail from './Pages/PersonaliPage/PersonDetail/index.jsx';

import CheluskinaPage from './Pages/HistoricalPage/CheluskinaPage/index.jsx';
import RuslanPage from './Pages/HistoricalPage/RuslanPage/index.jsx';
import ItalyPage from './Pages/HistoricalPage/ItalyPage/index.jsx';
import AlexPage from './Pages/HistoricalPage/AlexPage/index.jsx';

import QuizPage from './Pages/GamesPage/QuizPage/index.jsx';
import CrosswordPage from './Pages/GamesPage/CrosswordPage/index.jsx';
import PuzzlePage from './Pages/GamesPage/PuzzlePage/index.jsx';

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
        path: 'ruslan',
        element: <RuslanPage />,
    },
    {
        path: 'cheluskina',
        element: <CheluskinaPage />,
    },
    {
        path: 'italy',
        element: <ItalyPage />,
    },
    {
        path: 'alex',
        element: <AlexPage />,
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
        path: 'puzzle',
        element: <PuzzlePage />,
    },
    {
        path: 'quiz',
        element: <QuizPage />,
    },
    {
        path: 'crossword',
        element: <CrosswordPage />,
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
