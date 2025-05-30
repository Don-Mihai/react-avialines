import { useLocation, useNavigate } from 'react-router-dom';
import GamesMenu from '../../../components/GamesMenu/index.jsx';
import styles from './CongratsPage.module.css';

const CongratsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { game, total, time } = location.state || {};

    const gamePaths = {
        пазлы: '/puzzle',
        кроссворд: '/crossword',
        викторина: '/quiz',
    };

    const handleGetCertificate = () => {
        navigate('/certificate-form', { state: { game, time } });
    };

    const handlePlayAgain = () => {
        navigate(gamePaths[game]);
    };

    return (
        <div className={styles.container}>
            {/* Передаем финальную статистику и замораживаем таймер */}
            <GamesMenu activeGame={game} totalQuestions={total} freezeStats={true} initialSeconds={time} />

            <div className={styles.content}>
                <h1>Поздравляем!</h1>
                <p>Вы успешно завершили игру "{game}"</p>

                <div className={styles.buttons}>
                    <button onClick={handleGetCertificate}>Получить грамоту</button>
                    <button onClick={handlePlayAgain}>Играть снова</button>
                </div>
            </div>
        </div>
    );
};

export default CongratsPage;
