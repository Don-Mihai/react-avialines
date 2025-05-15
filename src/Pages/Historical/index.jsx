import styles from './Historical.module.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import point from '../../assets/point_img.png';

const Historical = () => {
    return (
        <>
            <div className={styles.container}>
                <Header />
                <div className={styles.title}>
                    <h1>исторический обзор</h1>
                </div>
                <div className={styles.text_habarovsk}>
                    <span className={styles.text_title}>
                        спасение «север», <br />
                        «анадырь», «хабаровск»
                    </span>
                    <span className={styles.text_subtitle}>узнать подробнее...</span>
                </div>
                <div className={styles.text_cheluskin}>
                    <span className={styles.text_title}>спасение «челюскина»</span>
                    <span className={styles.text_subtitle}>узнать подробнее...</span>
                </div>
                <img className={styles.point} src={point} alt="" />
                <img className={styles.point_left} src={point} alt="" />
                <Footer />
            </div>
        </>
    );
};

export default Historical;
