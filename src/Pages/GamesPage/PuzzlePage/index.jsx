import styles from './PuzzlePage.module.css';
import GamesMenu from '../GamesMenu/index.jsx';

const PuzzlePage = () => {
    return (
        <>
            <div className={styles.container}>
                <GamesMenu />
            </div>
        </>
    );
};

export default PuzzlePage;
