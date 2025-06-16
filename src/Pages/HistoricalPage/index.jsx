import styles from './Historical.module.css';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const HistoricalPage = () => {
  const { isEnabled } = useSelector((state) => state.accessibility);
  const navigate = useNavigate();

  const handleItalyClick = () => {
    navigate('/dornie');
  };

  const handleAlexClick = () => {
    navigate('/track');
  };

  return (
    <>
      <div className={styles.container}>
        <Header />
        {isEnabled ? (
          <div className={styles.content}>
            <span className={styles.title}>ИСТОРИЧЕСКИЙ ОБЗОР</span>

            <span className={styles.subTitle}>ДОРНЬЕ ВАЛЬ </span>
            <span className={styles.info} onClick={handleItalyClick}>
              узнать подробнее
            </span>

            <span className={styles.subTitle}>ТРАССЫ И ПУТИ ПОЛЯРНОЙ АВИАЦИИ </span>
            <span className={styles.info} onClick={handleAlexClick}>
              узнать подробнее
            </span>
          </div>
        ) : (
          <>
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
