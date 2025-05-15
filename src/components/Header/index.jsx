import { useLocation } from 'react-router';

import styles from './Header.module.css';

const Header = () => {
    const location = useLocation();
    const isHistoricalPage = location.pathname === '/history';

    return (
        <>
            <div className={styles.header}>
                <button className={`${styles.button_header} ${isHistoricalPage ? styles.button_header_history : ''}`}>
                    Версия для <br /> слабовидящих
                </button>
                <button className={`${styles.button_header} ${isHistoricalPage ? styles.button_header_history : ''}`}>
                    каталог <br /> экспонатов
                </button>
                <button className={`${styles.button_header} ${isHistoricalPage ? styles.button_header_history : ''}`}>
                    аудиогид <br /> по приложению
                </button>
                <button className={`${styles.button_header} ${isHistoricalPage ? styles.button_header_history : ''}`}>ru</button>
            </div>
        </>
    );
};

export default Header;
