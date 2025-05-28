import { useState, useEffect } from 'react';
import styles from './GamesMenu.module.css';

const GamesMenu = () => {
    const [activeGame, setActiveGame] = useState(null);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // Форматирование времени в MM:SS
    const formatTime = totalSeconds => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Запуск/остановка таймера при выборе игры
    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const handleGameSelect = game => {
        if (activeGame !== game) {
            setActiveGame(game);
            setSeconds(0);
            setIsRunning(true);
        }
    };

    const getAnswersText = () => {
        switch (activeGame) {
            case 'пазлы':
                return 'собрано 0 / 24';
            case 'кроссворд':
                return 'угадано 0 / 10';
            default:
                return 'верных ответов 0/10';
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <button className={`${styles.button} ${activeGame === 'пазлы' ? styles.active : ''}`} onClick={() => handleGameSelect('пазлы')}>
                    пазлы
                </button>
                <button className={`${styles.button} ${activeGame === 'кроссворд' ? styles.active : ''}`} onClick={() => handleGameSelect('кроссворд')}>
                    кроссворд
                </button>
                <button className={`${styles.button} ${activeGame === 'викторина' ? styles.active : ''}`} onClick={() => handleGameSelect('викторина')}>
                    викторина
                </button>
            </div>
            <div className={styles.timer}>
                <span className={styles.answers}>{getAnswersText()}</span>
                <span className={styles.time}>{formatTime(seconds)}</span>
                <button className={styles.ru}>ru</button>
            </div>
        </div>
    );
};

export default GamesMenu;
