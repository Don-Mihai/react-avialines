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
                    <Link className={styles.button_main} to="/history">
                        исторический обзор
                    </Link>
                    <Link className={styles.button_main} to="/personali">
                        персонали
                    </Link>
                    <Link className={styles.button_main} to="/films">
                        фильмы <br /> и книги
                    </Link>
                    <Link className={styles.button_main} to="/games">
                        игры
                    </Link>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default MainPage;
