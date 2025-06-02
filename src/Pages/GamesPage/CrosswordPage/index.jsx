import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import GamesMenu from '../../../components/GamesMenu';
import styles from './CrosswordPage.module.css';
import { crosswordData } from '../../../data';

const CrosswordPage = () => {
    const navigate = useNavigate();
    const [grid, setGrid] = useState([]);
    const [selectedClue, setSelectedClue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState(null);
    const [solvedCount, setSolvedCount] = useState(0);
    const [allRevealed, setAllRevealed] = useState(false);
    const [words, setWords] = useState([...crosswordData.words]);

    const initializeGrid = useCallback(() => {
        const newGrid = Array(crosswordData.size)
            .fill()
            .map(() =>
                Array(crosswordData.size)
                    .fill()
                    .map(() => ({
                        value: '',
                        clueIds: [],
                        solved: false,
                        revealed: false,
                    }))
            );

        // Помещаем слова в сетку
        crosswordData.words.forEach(word => {
            const { start, direction, word: text, id } = word;
            let { row, col } = start;

            for (let i = 0; i < text.length; i++) {
                if (row < crosswordData.size && col < crosswordData.size) {
                    newGrid[row][col] = {
                        ...newGrid[row][col],
                        value: text[i],
                        clueIds: [...newGrid[row][col].clueIds, id],
                    };
                }

                if (direction === 'horizontal') col++;
                else row++;
            }
        });

        return newGrid;
    }, [crosswordData.size, crosswordData.words]);

    useEffect(() => {
        setGrid(initializeGrid());
    }, [initializeGrid]);

    // Обработка выбора ячейки
    const handleCellClick = (row, col) => {
        if (allRevealed) return;

        const cell = grid[row]?.[col];
        if (cell && cell.clueIds.length > 0) {
            // Находим первую нерешенную подсказку для этой ячейки
            const clueId = cell.clueIds.find(clueId => !crosswordData.words.find(w => w.id === clueId).solved);

            if (clueId) {
                const clue = crosswordData.words.find(w => w.id === clueId);
                setSelectedClue(clue);
                setInputValue('');
                setMessage(null);
            }
        }
    };

    // Проверка введенного слова
    const checkWord = useCallback(() => {
        if (!selectedClue) return;

        if (inputValue.toUpperCase() === selectedClue.word) {
            // Обновляем состояние слов
            setWords(prevWords => prevWords.map(w => (w.id === selectedClue.id ? { ...w, solved: true } : w)));

            const newSolvedCount = solvedCount + 1;
            setSolvedCount(newSolvedCount);

            setMessage(`Верно! Осталось разгадать ${10 - newSolvedCount} слов из 10`);

            // Обновляем сетку
            setGrid(prevGrid => {
                const newGrid = JSON.parse(JSON.stringify(prevGrid));
                const { start, direction, word: text } = selectedClue;
                let { row, col } = start;

                for (let i = 0; i < text.length; i++) {
                    if (row < crosswordData.size && col < crosswordData.size) {
                        newGrid[row][col] = {
                            ...newGrid[row][col],
                            solved: true,
                        };
                    }

                    direction === 'horizontal' ? col++ : row++;
                }
                return newGrid;
            });

            // Переход на страницу поздравления
            if (newSolvedCount === 10) {
                setTimeout(() => {
                    navigate('/congrats', {
                        state: {
                            game: 'кроссворд',
                            score: 10,
                            total: 10,
                        },
                    });
                }, 1500);
            }

            setTimeout(() => {
                setSelectedClue(null);
                setMessage(null);
            }, 1500);
        } else {
            setMessage('Неверно, попробуйте снова');
        }
    }, [selectedClue, inputValue, solvedCount, navigate]);

    // Показать все ответы
    const revealAllAnswers = () => {
        setAllRevealed(true);
        setGrid(prevGrid => {
            const newGrid = JSON.parse(JSON.stringify(prevGrid));

            words.forEach(word => {
                const { start, direction, word: text } = word;
                let { row, col } = start;

                for (let i = 0; i < text.length; i++) {
                    if (row < crosswordData.size && col < crosswordData.size) {
                        newGrid[row][col] = {
                            ...newGrid[row][col],
                            revealed: true,
                        };
                    }

                    direction === 'horizontal' ? col++ : row++;
                }
            });

            return newGrid;
        });
    };

    // Обработка отправки формы
    const handleSubmit = e => {
        e.preventDefault();
        if (selectedClue && inputValue.trim()) {
            checkWord();
        }
    };

    // Обработка нажатия клавиши Enter
    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div className={styles.container}>
            <GamesMenu activeGame="кроссворд" solvedCrosswords={solvedCount} totalCrosswords={10} />

            <div className={styles.crosswordContainer}>
                <div className={styles.grid}>
                    {grid.map((row, rowIndex) => (
                        <div key={rowIndex} className={styles.row}>
                            {row.map((cell, colIndex) => {
                                if (!cell) return null;

                                const isEmpty = !cell.value;
                                const isSelected = selectedClue && cell.clueIds.includes(selectedClue.id);
                                const isSolved = cell.solved;
                                const isRevealed = cell.revealed;

                                return (
                                    <div
                                        key={`${rowIndex}-${colIndex}`}
                                        className={`
                                            ${styles.cell}
                                            ${isEmpty ? styles.empty : ''}
                                            ${isSelected ? styles.selected : ''}
                                            ${isSolved ? styles.solved : ''}
                                        `}
                                        onClick={() => !allRevealed && handleCellClick(rowIndex, colIndex)}
                                    >
                                        {(isSolved || isRevealed) && cell.value}
                                        {!isEmpty && !isSolved && !isRevealed && cell.clueIds[0]?.charAt(0)}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div className={styles.controls}>
                    {selectedClue && !allRevealed ? (
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <h3>Подсказка:</h3>
                            <p>{selectedClue.clue}</p>

                            <div className={styles.inputGroup}>
                                <label>Введите слово:</label>
                                <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} autoFocus />
                            </div>

                            <button type="submit" className={styles.submitButton}>
                                Проверить
                            </button>
                        </form>
                    ) : (
                        <div className={styles.cluesPanel}>
                            <h3>Список слов:</h3>
                            <div className={styles.cluesColumns}>
                                <div>
                                    <h4>По горизонтали:</h4>
                                    <ul>
                                        {words
                                            .filter(word => word.direction === 'horizontal')
                                            .map((word, index) => (
                                                <li
                                                    key={word.id}
                                                    className={`
                                                        ${styles.clueItem}
                                                        ${word.solved || allRevealed ? styles.solved : ''}
                                                    `}
                                                    onClick={() => !allRevealed && setSelectedClue(word)}
                                                >
                                                    <strong>{index + 1}.</strong> {word.clue}
                                                </li>
                                            ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4>По вертикали:</h4>
                                    <ul>
                                        {words
                                            .filter(word => word.direction === 'vertical')
                                            .map((word, index) => (
                                                <li
                                                    key={word.id}
                                                    className={`
                                                        ${styles.clueItem}
                                                        ${word.solved || allRevealed ? styles.solved : ''}
                                                    `}
                                                    onClick={() => !allRevealed && setSelectedClue(word)}
                                                >
                                                    <strong>{index + 1}.</strong> {word.clue}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className={message.includes('Верно') ? styles.successMessage : styles.errorMessage}>
                            <p>{message}</p>
                            {message.includes('Неверно') && <p className={styles.hint}>Нажмите на любое загаданное слово, чтобы продолжить игру</p>}
                        </div>
                    )}

                    <div className={styles.buttons}>
                        <button className={styles.actionButton} onClick={revealAllAnswers} disabled={allRevealed}>
                            Показать все ответы
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrosswordPage;
