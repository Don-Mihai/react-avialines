import styles from './Historical.module.css';
import { Link, useNavigate } from 'react-router-dom';

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
      <Link to="/nordic">
        <div className={styles.container}>
          <Header />
          <div onClick={handleNordicClick}></div>
          <div onClick={handleCheliuskinaClick}></div>
          <Footer />
        </div>
      </Link>
    </>
  );
};

export default HistoricalPage;
