import styles from './Historical.module.css';
import { Link } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const HistoricalPage = () => {
    return (
        <>
            <Link to="/menu">
                <div className={styles.container}>
                    <Header />
                    <Footer />
                </div>
            </Link>
        </>
    );
};

export default HistoricalPage;
