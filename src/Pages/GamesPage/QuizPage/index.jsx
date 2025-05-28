import { useState } from 'react';
import styles from './QuizPage.module.css';
import GamesMenu from '../GamesMenu/index.jsx';
import Footer from '../../../components/Footer/index.jsx';
import { quizData } from '../../../data.js';
import QuizModal from './QuizModal';

const QuizPage = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

    const currentQuestion = quizData[currentQuestionIndex];

    const handleAnswerSelect = answerId => {
        if (currentQuestion.multiAnswer) {
            if (selectedAnswers.includes(answerId)) {
                setSelectedAnswers(selectedAnswers.filter(id => id !== answerId));
            } else {
                setSelectedAnswers([...selectedAnswers, answerId]);
            }
        } else {
            setSelectedAnswers([answerId]);
        }
    };

    const checkAnswer = () => {
        const correctAnswers = currentQuestion.answers.filter(answer => answer.correct).map(answer => answer.id);

        const isAnswerCorrect = selectedAnswers.length === correctAnswers.length && selectedAnswers.every(answer => correctAnswers.includes(answer));

        setIsCorrect(isAnswerCorrect);
        setShowModal(true);
    };

    const handleNextQuestion = () => {
        setSelectedAnswers([]);
        setShowModal(false);
        setShowCorrectAnswer(false);
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert('Викторина завершена!');
        }
    };

    const handleTryAgain = () => {
        setShowModal(false);
        setSelectedAnswers([]);
    };

    const revealCorrectAnswer = () => {
        setShowCorrectAnswer(true);
    };

    return (
        <>
            <div className={styles.container}>
                <GamesMenu />
                <div className={styles.content}>
                    <div className={styles.question}>
                        <h3 className={styles.number}>вопрос №{currentQuestion.id}</h3>
                        <span className={styles.text}>
                            {currentQuestion.question}
                            <br />
                            <span className={styles.info}>{currentQuestion?.info}</span>
                        </span>
                        {currentQuestion.image && (
                            <div className={styles.imageContainer}>
                                <img src={currentQuestion?.image} alt="Иллюстрация к вопросу" className={styles.questionImage} />
                            </div>
                        )}
                    </div>
                    <div className={styles.answers}>
                        {currentQuestion.answers.map(answer => (
                            <button
                                key={answer.id}
                                className={`${styles.answer} ${selectedAnswers.includes(answer.id) ? styles.selected : ''} ${
                                    showCorrectAnswer && answer.correct ? styles.correct : ''
                                }`}
                                onClick={() => handleAnswerSelect(answer.id)}
                            >
                                {answer.id}. {answer.text}
                            </button>
                        ))}
                        <div className={styles.buttons}>
                            <button
                                className={styles.button}
                                disabled={currentQuestionIndex === 0}
                                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                            >
                                предыдущий <br /> вопрос
                            </button>
                            <button className={styles.button} disabled={selectedAnswers.length === 0} onClick={checkAnswer}>
                                ответить
                            </button>
                            <button
                                className={styles.button}
                                disabled={currentQuestionIndex === quizData.length - 1}
                                onClick={() => {
                                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                                    setSelectedAnswers([]);
                                }}
                            >
                                следующий <br /> вопрос
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

            {/* Используем компонент Modal */}
            {showModal && (
                <QuizModal isCorrect={isCorrect} onTryAgain={handleTryAgain} onRevealAnswer={revealCorrectAnswer} onNextQuestion={handleNextQuestion} />
            )}
        </>
    );
};

export default QuizPage;
