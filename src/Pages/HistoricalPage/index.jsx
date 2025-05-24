import styles from './Historical.module.css';
import { useNavigate } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const HistoricalPage = () => {
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
                <div className={styles.ruslan} onClick={handleRuslanClick}></div>
                <div className={styles.cheluskina} onClick={handleCheluskinaClick}></div>
                <div className={styles.italy} onClick={handleItalyClick}></div>
                <div className={styles.alex} onClick={handleAlexClick}></div>
                <Footer />
            </div>
        </>
    );
};

export default HistoricalPage;
