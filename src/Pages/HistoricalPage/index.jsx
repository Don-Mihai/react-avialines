import styles from './Historical.module.css';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const HistoricalPage = () => {
    const { isEnabled  } = useSelector(state => state.accessibility);
    const navigate = useNavigate();

    const handleRuslanClick = () => {
        navigate('/ruslan');
    };

    const handleCheluskinaClick = () => {
        navigate('/cheluskina');
    };

    const handleItalyClick = () => {
        navigate('/italy');
    };

    const handleAlexClick = () => {
        navigate('/alex');
    };

    return (
        <>
            <div className={styles.container}>
                <Header />
                {isEnabled ? (
                    
                        <div className={styles.content}>
                            <span className={styles.title}>ИСТОРИЧЕСКИЙ ОБЗОР</span>
                            
                                <span className={styles.subTitle} >спасение экипажа и пассажиров дирижабль "италия" </span>
                                <span className={styles.info} onClick={handleItalyClick}>узнать подробнее</span>
                            
                            
                                <span className={styles.subTitle} >пароход "александр сибиряков </span>
                                <span className={styles.info} onClick={handleAlexClick}>узнать подробнее</span>
                            
                           
                                <span className={styles.subTitle}>спасение экипажа и пассажиров парохода "челюскин"  </span>
                                <span className={styles.info}  onClick={handleCheluskinaClick}>узнать подробнее</span>
                            
                            
                                <span className={styles.subTitle} >гибель спасательного судна "руслан"</span>
                                <span className={styles.info} onClick={handleRuslanClick}>узнать подробнее</span>
                           
                        </div>
                    
                ) : (
                <>
                    <div className={styles.ruslan} onClick={handleRuslanClick}></div>
                    <div className={styles.cheluskina} onClick={handleCheluskinaClick}></div>
                    <div className={styles.italy} onClick={handleItalyClick}></div>
                    <div className={styles.alex} onClick={handleAlexClick}></div>
                </>
                )}
                <Footer />
            </div>
        </>
    );
};

export default HistoricalPage;
