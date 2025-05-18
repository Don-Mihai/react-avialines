import styles from './FlimsPage.module.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const FilmsPage = () => {
    return (
        <>
            <div className={styles.container}>
                <Header />
                <Footer />
            </div>
        </>
    );
};

export default FilmsPage;
