import { useState, useEffect } from 'react';
import { JigsawPuzzle } from 'react-jigsaw-puzzle/lib';
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css';
import styles from './PuzzlePage.module.css';
import GamesMenu from '../../../components/GamesMenu/index.jsx';
import { puzzleData, difficultyLevels } from '../../../data.js';

const PuzzlePage = () => {
    const [selectedPuzzle, setSelectedPuzzle] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
    const [gameStarted, setGameStarted] = useState(false);
    const [completedPuzzles, setCompletedPuzzles] = useState(0);
    const [totalPuzzles, setTotalPuzzles] = useState(puzzleData.length);
    const [gameSeconds, setGameSeconds] = useState(0);

    const handleStartGame = () => {
        if (selectedPuzzle) {
            setGameStarted(true);
        }
    };

    const handlePuzzleComplete = () => {
        alert('Пазл собран!');
        setCompletedPuzzles(prev => prev + 1);
        setGameStarted(false);
    };

    const handleBackToSelection = () => {
        setGameStarted(false);
    };

    // Таймер для отслеживания времени игры
    useEffect(() => {
        let interval;
        if (gameStarted) {
            interval = setInterval(() => {
                setGameSeconds(prev => prev + 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [gameStarted]);

    // Если игра не начата, показываем меню выбора
    if (!gameStarted) {
        return (
            <div className={styles.container}>
                <GamesMenu hideStats={true} />
                <div className={styles.selectionContainer}>
                    <h2 className={styles.title}>Выберите пазл</h2>

                    <div className={styles.puzzles}>
                        {puzzleData.map(puzzle => (
                            <div
                                key={puzzle.id}
                                className={`${styles.puzzleCard} ${selectedPuzzle?.id === puzzle.id ? styles.selected : ''}`}
                                onClick={() => setSelectedPuzzle(puzzle)}
                            >
                                <div className={styles.statusIndicator}>{puzzle.completed ? '✓' : ''}</div>
                                <img src={puzzle.imageSrc} alt={puzzle.title} className={styles.puzzleImage} />
                                <div className={styles.puzzleInfo}>
                                    <h3>{puzzle.title}</h3>
                                    <p>{puzzle.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className={styles.title}>Выберите уровень сложности</h2>

                    <div className={styles.difficultyLevels}>
                        {difficultyLevels.map(level => (
                            <button
                                key={level.id}
                                className={`${styles.difficultyButton} ${selectedDifficulty === level.id ? styles.active : ''}`}
                                onClick={() => setSelectedDifficulty(level.id)}
                            >
                                <div className={styles.difficultyName}>{level.name}</div>
                                <div className={styles.difficultyDesc}>{level.description}</div>
                            </button>
                        ))}
                    </div>

                    <button className={styles.startButton} onClick={handleStartGame} disabled={!selectedPuzzle}>
                        Начать игру
                    </button>
                </div>
            </div>
        );
    }

    // Если игра начата, показываем пазл
    const difficulty = difficultyLevels.find(l => l.id === selectedDifficulty);

    return (
        <div className={styles.container}>
            <GamesMenu completedPuzzles={completedPuzzles} totalPuzzles={totalPuzzles} freezeStats={true} initialSeconds={gameSeconds} />
            <div className={styles.gameContainer}>
                <button className={styles.backButton} onClick={handleBackToSelection}>
                    ← Выбрать другой пазл
                </button>

                <div className={styles.puzzleWrapper}>
                    <JigsawPuzzle imageSrc={selectedPuzzle.imageSrc} rows={difficulty.rows} columns={difficulty.columns} onSolved={handlePuzzleComplete} />
                </div>
            </div>
        </div>
    );
};

export default PuzzlePage;
