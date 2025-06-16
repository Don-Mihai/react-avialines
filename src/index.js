import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './styles/index.scss';

import { Provider } from 'react-redux';
import store from './store/store';
import AccessibilityHandler from './components/AccessibilityHandler';
import { LanguageProvider } from './LanguageContext';

import MainPage from './Pages/MainPage/index.jsx';
import GamesPage from './Pages/GamesPage/index.jsx';
import FilmsPage from './Pages/FilmsPage/index.jsx';
import Preview from './Pages/Preview/Preview.jsx';

import HistoricalPage from './Pages/HistoricalPage/index.jsx';

import PersonaliPage from './Pages/PersonaliPage/index.jsx';
import PersonDetail from './Pages/PersonaliPage/PersonDetail/index.jsx';

import DorniePage from './Pages/HistoricalPage/DorniePage/index.jsx';
import TrackPage from './Pages/HistoricalPage/TrackPage/index.jsx';

import QuizPage from './Pages/GamesPage/QuizPage/index.jsx';
import CrosswordPage from './Pages/GamesPage/CrosswordPage/index.jsx';
import PuzzlePage from './Pages/GamesPage/PuzzlePage/index.jsx';

import CongratsPage from './Pages/GamesPage/CongratsPage/index.jsx';
import CertificateFormPage from './Pages/GamesPage/CertificateFormPage/index.jsx';
import ThanksPage from './Pages/GamesPage/ThanksPage/index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Preview />
  },
  {
    path: 'main',
    element: <MainPage />
  },
  {
    path: 'history',
    element: <HistoricalPage />
  },
  {
    path: 'dornie',
    element: <DorniePage />
  },
  {
    path: 'track',
    element: <TrackPage />
  },
  {
    path: 'personali',
    children: [
      {
        index: true,
        element: <PersonaliPage />
      },
      {
        path: ':id',
        element: <PersonDetail />
      }
    ]
  },
  {
    path: 'films',
    element: <FilmsPage />
  },
  {
    path: 'games',
    element: <GamesPage />
  },
  {
    path: 'puzzle',
    element: <PuzzlePage />
  },
  {
    path: 'quiz',
    element: <QuizPage />
  },
  {
    path: 'crossword',
    element: <CrosswordPage />
  },
  {
    path: 'congrats',
    element: <CongratsPage />
  },
  {
    path: 'certificate-form',
    element: <CertificateFormPage />
  },
  {
    path: 'thanks',
    element: <ThanksPage />
  },
  {
    path: '*',
    element: <div>Страница не найдена</div>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LanguageProvider>
    <Provider store={store}>
      <AccessibilityHandler />
      <RouterProvider router={router} />
    </Provider>
  </LanguageProvider>
);
