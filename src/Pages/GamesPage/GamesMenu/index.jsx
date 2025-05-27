import styles from './GamesMenu.module.css';
const GamesMenu = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.buttons}>
                    <button className={styles.button}>пазлы</button>
                    <button className={styles.button}>кроссворд</button>
                    <button className={styles.button}>викторина</button>
                </div>
                <div className={styles.timer}>
                    <span className={styles.ansvers}>верных ответов 0/10</span>
                    <span className={styles.time}>00:00</span>
                    <button className={styles.ru}>ru</button>
                </div>
            </div>
        </>
    );
};

export default GamesMenu;
