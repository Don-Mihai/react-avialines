import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router';
import GamesMenu from '../../../components/GamesMenu';
import styles from './CrosswordPage.module.css';
import { crosswordData } from '../../../data';
import Footer from '../../../components/Footer';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';

const CrosswordPage = () => {
    const navigate = useNavigate();
    const [grid, setGrid] = useState([]);
    const [selectedClue, setSelectedClue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState(null);
    const [solvedCount, setSolvedCount] = useState(0);
    const [allRevealed, setAllRevealed] = useState(false);
    const keyboardRef = useRef(null);

    // Преобразуем слова в верхний регистр при инициализации
    const crosswordWords = useMemo(
        () =>
            crosswordData.words.map(word => ({
                ...word,
                word: word.word.toUpperCase(),
            })),
        []
    );

    const [words, setWords] = useState([...crosswordWords]);

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

        crosswordWords.forEach(word => {
            const { start, direction, word: text, id } = word;
            let { row, col } = start;

            for (let i = 0; i < text.length; i++) {
                if (row < crosswordData.size && col < crosswordData.size) {
                    newGrid[row][col] = {
                        ...newGrid[row][col],
                        value: text[i].toUpperCase(), // Всегда верхний регистр
                        clueIds: [...newGrid[row][col].clueIds, id],
                    };
                }

                if (direction === 'horizontal') col++;
                else row++;
            }
        });

        return newGrid;
    }, [crosswordData.size, crosswordWords]);

    useEffect(() => {
        setGrid(initializeGrid());
    }, [initializeGrid]);

    const handleCellClick = (row, col) => {
        if (allRevealed) return;

        const cell = grid[row]?.[col];
        if (cell && cell.clueIds.length > 0) {
            const clueId = cell.clueIds.find(clueId => !words.find(w => w.id === clueId).solved);
            if (clueId) {
                const clue = words.find(w => w.id === clueId);
                setSelectedClue(clue);
                setInputValue('');
                setMessage(null);
            }
        }
    };

    const checkWord = useCallback(() => {
        if (!selectedClue) return;

        // Убираем пробелы и преобразуем в верхний регистр
        const userInput = inputValue.replace(/\s+/g, '').toUpperCase();

        if (userInput === selectedClue.word) {
            setWords(prevWords => prevWords.map(w => (w.id === selectedClue.id ? { ...w, solved: true } : w)));

            const newSolvedCount = solvedCount + 1;
            setSolvedCount(newSolvedCount);

            setMessage(`Верно! Осталось разгадать ${10 - newSolvedCount} слов из 10`);

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
    }, [selectedClue, inputValue, solvedCount, navigate, words]);

    const revealPartialHint = () => {
        if (!selectedClue || selectedClue.solved) return;

        const { start, direction, word: text } = selectedClue;
        let { row, col } = start;

        // Рассчитываем количество букв для открытия:
        // 30% от длины слова, но не менее 3 и не более 5
        const hintCount = Math.min(5, Math.max(3, Math.floor(text.length * 0.3)));

        const hiddenIndices = [];
        for (let i = 0; i < text.length; i++) {
            const cell = grid[row]?.[col];
            if (cell && !cell.revealed && !cell.solved) {
                hiddenIndices.push(i);
            }
            direction === 'horizontal' ? col++ : row++;
        }

        if (hiddenIndices.length === 0) return;

        const lettersToReveal = Math.min(hintCount, hiddenIndices.length);
        const indicesToReveal = [];
        for (let i = 0; i < lettersToReveal; i++) {
            const randomIndex = Math.floor(Math.random() * hiddenIndices.length);
            indicesToReveal.push(hiddenIndices[randomIndex]);
            hiddenIndices.splice(randomIndex, 1);
        }

        setGrid(prevGrid => {
            const newGrid = JSON.parse(JSON.stringify(prevGrid));
            let r = start.row;
            let c = start.col;

            for (let i = 0; i < text.length; i++) {
                if (indicesToReveal.includes(i)) {
                    newGrid[r][c] = {
                        ...newGrid[r][c],
                        revealed: true,
                    };
                }

                direction === 'horizontal' ? c++ : r++;
            }
            return newGrid;
        });

        setMessage(`Открыто ${lettersToReveal} букв(ы) в слове!`);
    };

    // Функция для открытия всех ответов
    const revealAllAnswers = () => {
        setGrid(prevGrid => {
            const newGrid = JSON.parse(JSON.stringify(prevGrid));
            return newGrid.map(row => row.map(cell => (cell.value ? { ...cell, solved: true, revealed: true } : cell)));
        });

        setWords(prevWords => prevWords.map(word => ({ ...word, solved: true })));

        setSolvedCount(10);
        setAllRevealed(true);
        setMessage('Все ответы открыты!');

        setTimeout(() => {
            navigate('/congrats', {
                state: {
                    game: 'кроссворд',
                    score: 10,
                    total: 10,
                },
            });
        }, 1500);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (selectedClue && inputValue.trim()) {
            checkWord();
        }
    };

    // Обработчики клавиатуры
    const onKeyboardChange = input => {
        setInputValue(input);
    };

    const onKeyPress = button => {
        if (button === '{bksp}') {
            setInputValue(prev => prev.slice(0, -1));
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
                    {selectedClue ? (
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <h3>Подсказка:</h3>
                            <p>{selectedClue.clue}</p>

                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={e => setInputValue(e.target.value)}
                                    autoFocus
                                    // Добавляем авто-регистр
                                    style={{ textTransform: 'uppercase' }}
                                />
                            </div>

                            <div className={styles.buttonGroup}>
                                <div className={styles.allButtons}>
                                    <button type="button" className={styles.button} onClick={() => setSelectedClue(null)}>
                                        отмена
                                    </button>
                                    <button type="button" className={styles.button} onClick={revealPartialHint} disabled={selectedClue.solved}>
                                        открыть подсказку
                                    </button>
                                </div>
                                <div className={styles.allButtons}>
                                    <button type="submit" className={styles.button}>
                                        ок
                                    </button>
                                    <button className={styles.button} onClick={revealAllAnswers} disabled={allRevealed}>
                                        Открыть все ответы
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className={styles.instructions}>
                            <p>
                                Нажмите на любое загаданное
                                <br /> слово, чтобы начать игру
                            </p>
                        </div>
                    )}

                    {message && (
                        <div className={message.includes('Верно') ? styles.successMessage : styles.errorMessage}>
                            <p>{message}</p>
                            {message.includes('Неверно') && <p className={styles.hint}>Нажмите на любое загаданное слово, чтобы продолжить игру</p>}
                        </div>
                    )}

                    {/* Виртуальная клавиатура */}
                    <div className={styles.keyboardWrapper}>
                        <Keyboard
                            keyboardRef={r => (keyboardRef.current = r)}
                            layout={{
                                default: ['й ц у к е н г ш щ з х ъ', 'ф ы в а п р о л д ж э', 'я ч с м и т ь б ю {bksp}'],
                            }}
                            onChange={onKeyboardChange}
                            onKeyPress={onKeyPress}
                            display={{
                                '{bksp}': '<BackspaceOutlinedIcon />', // Используем кастомное отображение
                            }}
                            buttonTheme={[
                                {
                                    class: styles.keyboardDeleteBtn,
                                    buttons: '{bksp}',
                                },
                            ]}
                            theme={`hg-theme-default ${styles.keyboardTheme}`}
                            renderButton={(button, keyboard) => {
                                // Кастомный рендер для кнопки удаления
                                if (button === '{bksp}') {
                                    return (
                                        <button className="hg-button hg-button-bksp" onClick={() => keyboard.handleButtonClicked(button)}>
                                            <BackspaceOutlinedIcon />
                                        </button>
                                    );
                                }
                                return button;
                            }}
                        />
                    </div>

                    {/* Кнопка открытия всех ответов */}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CrosswordPage;
