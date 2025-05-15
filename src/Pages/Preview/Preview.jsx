import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Preview.module.css';

export default function Preview() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/main');
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <video
        className={styles.video}
        src="/videos/preview.mp4" // укажите путь к вашему видео
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}
