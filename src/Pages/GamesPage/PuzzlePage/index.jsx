import styles from './PuzzlePage.module.css';
import GamesMenu from '../../../components/GamesMenu/index.jsx';

const PuzzlePage = () => {
    // const navigate = useNavigate();

    // const handleComplete = () => {
    //     navigate('/congrats', {
    //         state: {
    //             game: 'кроссворд',
    //             score: correctAnswers,
    //             total: totalQuestions,
    //         },
    //     });
    // };

    return (
        <>
            <div className={styles.container}>
                <GamesMenu />
            </div>
        </>
    );
};

export default PuzzlePage;
