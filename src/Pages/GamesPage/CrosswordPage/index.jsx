import GamesMenu from '../../../components/GamesMenu';
import styles from './CrosswordPage.module.css';

const CrosswordPage = () => {
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
                <GamesMenu activeGame="кроссворд" />
            </div>
        </>
    );
};

export default CrosswordPage;
