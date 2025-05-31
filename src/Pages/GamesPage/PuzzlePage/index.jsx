import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { JigsawPuzzle } from 'react-jigsaw-puzzle/lib';
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css';
import styles from './PuzzlePage.module.css';
import GamesMenu from '../../../components/GamesMenu/index.jsx';
import Footer from '../../../components/Footer/index.jsx';
import { puzzleData, difficultyLevels } from '../../../data.js';

const PuzzlePage = () => {
    const navigate = useNavigate();
    const [selectedPuzzle, setSelectedPuzzle] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
    const [gameStarted, setGameStarted] = useState(false);
    const [completedPuzzles, setCompletedPuzzles] = useState(0);
    const [totalPuzzles, setTotalPuzzles] = useState(puzzleData.length);
    const [gameSeconds, setGameSeconds] = useState(0);
    const [timerActive, setTimerActive] = useState(false); // Новое состояние для управления таймером
    const [currentPuzzleTime, setCurrentPuzzleTime] = useState(0);

    const handleStartGame = () => {
        if (selectedPuzzle) {
            setGameStarted(true);
            setTimerActive(true);
            setCurrentPuzzleTime(0); // Сбрасываем время при старте пазла
        }
    };

    const handlePuzzleComplete = () => {
        // Переходим на страницу поздравления
        navigate('/congrats', {
            state: {
                game: 'пазлы',
                total: totalPuzzles,
                score: completedPuzzles + 1, // +1 к завершенным пазлам
                time: currentPuzzleTime, // Время прохождения текущего пазла
            },
        });

        // Обновляем состояние
        setCompletedPuzzles(prev => prev + 1);
        setGameStarted(false);
        setTimerActive(false);

        // Обновляем статус пазла в данных
        const updatedPuzzleData = puzzleData.map(puzzle => (puzzle.id === selectedPuzzle.id ? { ...puzzle, completed: true } : puzzle));
        // Здесь можно сохранить обновленные данные
    };

    const handleBackToSelection = () => {
        setGameStarted(false);
        setTimerActive(false); // Останавливаем таймер при возврате в меню
    };

    // Таймер для отслеживания времени игры
    useEffect(() => {
        let interval;
        if (timerActive) {
            interval = setInterval(() => {
                setGameSeconds(prev => prev + 1);
                setCurrentPuzzleTime(prev => prev + 1); // Обновляем время текущего пазла
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timerActive]);

    // Загрузка сохраненного прогресса
    useEffect(() => {
        const savedProgress = localStorage.getItem('puzzleProgress');
        if (savedProgress) {
            const { completed, seconds } = JSON.parse(savedProgress);
            setCompletedPuzzles(completed);
            setGameSeconds(seconds);
        }
    }, []);

    // Сохранение прогресса
    useEffect(() => {
        localStorage.setItem(
            'puzzleProgress',
            JSON.stringify({
                completed: completedPuzzles,
                seconds: gameSeconds,
            })
        );
    }, [completedPuzzles, gameSeconds]);

    // Если игра не начата, показываем меню выбора
    if (!gameStarted) {
        return (
            <div className={styles.container}>
                <GamesMenu hideStats={true} />
                <div className={styles.selectionContainer}>
                    <div className={styles.puzzles}>
                        {puzzleData.map(puzzle => (
                            <div
                                key={puzzle.id}
                                className={`${styles.puzzleCard} ${selectedPuzzle?.id === puzzle.id ? styles.selected : ''}`}
                                onClick={() => setSelectedPuzzle(puzzle)}
                            >
                                <div className={styles.statusIndicator}>{puzzle.completed ? '✓' : ''}</div>
                                <img src={puzzle.imageSrc} alt={puzzle.title} className={styles.puzzleImage} />
                                {/* <div className={styles.puzzleInfo}>
                                    <h3>{puzzle.title}</h3>
                                    <p>{puzzle.description}</p>
                                </div> */}
                            </div>
                        ))}
                    </div>
                    <h2 className={styles.title}>
                        уровень <br /> сложности
                    </h2>
                    <div className={styles.difficultyContainer}>
                        <div className={styles.difficultyLevels}>
                            {difficultyLevels.map(level => (
                                <button
                                    key={level.id}
                                    className={`${styles.difficultyButton} ${selectedDifficulty === level.id ? styles.active : ''}`}
                                    onClick={() => setSelectedDifficulty(level.id)}
                                >
                                    <div className={styles.difficultyName}>
                                        {level.name} {level.description}
                                    </div>
                                </button>
                            ))}
                        </div>
                        <button className={styles.startButton} onClick={handleStartGame} disabled={!selectedPuzzle}>
                            Начать игру
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Если игра начата, показываем пазл
    const difficulty = difficultyLevels.find(l => l.id === selectedDifficulty);

    return (
        <div className={styles.container}>
            <GamesMenu completedPuzzles={completedPuzzles} totalPuzzles={totalPuzzles} initialSeconds={gameSeconds} />
            <div className={styles.gameContainer}>
                {/* <button className={styles.backButton} onClick={handleBackToSelection}>
                    ← Выбрать другой пазл
                </button> */}

                <div className={styles.puzzleWrapper}>
                    <JigsawPuzzle imageSrc={selectedPuzzle.imageSrc} rows={difficulty.rows} columns={difficulty.columns} onSolved={handlePuzzleComplete} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PuzzlePage;
