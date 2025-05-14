import styles from './Historical.module.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Historical = () => {
    return (
        <>
            <div className={styles.container}>
                <Header />
                <Footer />
            </div>
        </>
    );
};

export default Historical;
