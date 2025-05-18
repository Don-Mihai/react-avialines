import styles from './Historical.module.css';
import { useNavigate } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const HistoricalPage = () => {
    const navigate = useNavigate();

    const handleNordicClick = () => {
        navigate('/nordic');
    };

    const handleCheliuskinaClick = () => {
        navigate('/cheliuskina');
    };
    return (
        <>
            <div className={styles.container}>
                <Header />
                <div className={styles.nordic} onClick={handleNordicClick}></div>
                <div className={styles.cheliuskina} onClick={handleCheliuskinaClick}></div>
                <Footer />
            </div>
        </>
    );
};

export default HistoricalPage;
