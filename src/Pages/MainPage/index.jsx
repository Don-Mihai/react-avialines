import styles from './MainPage.module.css';
import { Link } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const MainPage = () => {
    return (
        <>
            <div className={styles.container}>
                <Header />
                <div className={styles.main}>
                    <Link to="/history">
                        <button className={styles.button_main}>исторический обзор</button>
                    </Link>
                    <Link to="/personali">
                        <button className={styles.button_main}>персонали</button>
                    </Link>
                    <Link to="/films">
                        <button className={styles.button_main}>
                            фильмы <br /> и книги
                        </button>
                    </Link>
                    <Link to="/games">
                        <button className={styles.button_main}>игры</button>
                    </Link>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default MainPage;
