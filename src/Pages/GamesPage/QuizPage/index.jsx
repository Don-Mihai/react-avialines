import styles from './QuizPage.module.css';
import GanesMenu from '../GamesMenu/index.jsx';
import Footer from '../../../components/Footer/index.jsx';

const QuizPage = () => {
    return (
        <>
            <div className={styles.container}>
                <GanesMenu />
                <div className={styles.content}>
                    <div className={styles.question}>
                        <h3 className={styles.number}>вопрос №1</h3>
                        <span className={styles.text}>
                            для чего в 1930-е годы в ссср была <br /> создана полярная авиация
                            <br />
                            <span className={styles.info}>
                                (выберите один или несколько правильных <br /> ответов)
                            </span>
                        </span>
                    </div>
                    <div className={styles.answers}>
                        <button className={styles.answer}>а. помогала осваивать америку</button>
                        <button className={styles.answer}>
                            б. снабжение дрейфующих <br />и полярных станций
                        </button>
                        <button className={styles.answer}>в. помогала осваивать артику</button>
                        <button className={styles.answer}>
                            г. перевозка пассажиров <br />и грузов в районах крайнего севера
                        </button>
                        <div className={styles.buttons}>
                            <button className={styles.button}>
                                предыдущий <br /> вопрос
                            </button>
                            <button className={styles.button}>ответить</button>
                            <button className={styles.button}>
                                следующий <br /> вопрос
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default QuizPage;
