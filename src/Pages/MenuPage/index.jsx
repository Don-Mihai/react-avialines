import styles from './MenuPage.module.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MenuPhoto from './MenuPhoto';

const MenuPage = () => {
    return (
        <>
            <div className={styles.container}>
                <Header />
                <div className={styles.content}>
                    <h1 className={styles.title}>исторический обзор</h1>
                    <h2 className={styles.subtitle}>
                        <PlayArrowIcon style={{ width: '50px', height: '50px' }} />
                        спасение «север», «анадырь», <br />
                        «хабаровск»
                    </h2>
                    <div className={styles.buttons}>
                        <button className={styles.button}>фото</button>
                        <button className={styles.button}>видео-ролики</button>
                        <button className={styles.button}>аудиоистории</button>
                    </div>
                </div>
                <MenuPhoto />
                <Footer />
            </div>
        </>
    );
};

export default MenuPage;
