import { useLocation, useNavigate } from 'react-router-dom';
import GamesMenu from '../../../components/GamesMenu/index.jsx';
import styles from './ThanksPage.module.css';

const ThanksPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { game, score, total, time } = location.state || {};

    const gamePaths = {
        пазлы: '/puzzle',
        кроссворд: '/crossword',
        викторина: '/quiz',
    };

    const handleGoToMainMenu = () => {
        navigate('/games');
    };

    const handlePlayAgain = () => {
        navigate(gamePaths[game]);
    };

    return (
        <div className={styles.container}>
            <GamesMenu activeGame={game} correctAnswersCount={score} totalQuestions={total} freezeStats={true} initialSeconds={time} />
            <div className={styles.content}>
                <h1>Благодарим за участие!</h1>
                <p>Ваша заявка на получение грамоты принята.</p>
                <div className={styles.buttons}>
                    <button onClick={handleGoToMainMenu}>В главное меню</button>
                    <button onClick={handlePlayAgain}>Играть снова</button>
                </div>
            </div>
        </div>
    );
};

export default ThanksPage;
