import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import styles from './GamesMenu.module.css';

const GamesMenu = () => {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const location = useLocation();

    // Определяем активную игру на основе URL
    const getActiveGameFromPath = () => {
        if (location.pathname.includes('/puzzle')) return 'пазлы';
        if (location.pathname.includes('/crossword')) return 'кроссворд';
        if (location.pathname.includes('/quiz')) return 'викторина';
        return null;
    };

    const activeGame = getActiveGameFromPath();

    // Форматирование времени в MM:SS
    const formatTime = totalSeconds => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Запуск/остановка таймера при изменении активной игры
    useEffect(() => {
        let interval;

        if (activeGame) {
            setIsRunning(true);
            interval = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
        } else {
            setIsRunning(false);
        }

        return () => {
            clearInterval(interval);
            if (!activeGame) {
                setSeconds(0);
            }
        };
    }, [activeGame]);

    const getAnswersText = () => {
        switch (activeGame) {
            case 'пазлы':
                return 'собрано 0 / 24';
            case 'кроссворд':
                return 'угадано 0 / 10';
            case 'викторина':
                return 'верных ответов 0/10';
            default:
                return 'выберите игру';
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <button className={`${styles.button} ${activeGame === 'пазлы' ? styles.active : ''}`}>пазлы</button>
                <button className={`${styles.button} ${activeGame === 'кроссворд' ? styles.active : ''}`}>кроссворд</button>
                <button className={`${styles.button} ${activeGame === 'викторина' ? styles.active : ''}`}>викторина</button>
            </div>
            <div className={styles.timer}>
                <span className={styles.answers}>{getAnswersText()}</span>
                <span className={styles.time}>{activeGame ? formatTime(seconds) : '00:00'}</span>
                <button className={styles.ru}>ru</button>
            </div>
        </div>
    );
};

export default GamesMenu;
