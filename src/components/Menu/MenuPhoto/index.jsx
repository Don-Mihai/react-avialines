import styles from './MenuPhoto.module.css';
import { useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

import exemple from '../../../assets/exemple_img.jpg';

const MenuPhoto = () => {
  const [currentPhoto, setCurrentPhoto] = useState(1);
  const totalPhotos = 12;

  const handlePrev = () => {
    setCurrentPhoto((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPhoto((prev) => Math.min(prev + 1, totalPhotos));
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.text}>
          <span>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, tenetur! Magnam voluptates aperiam cupiditate. Dolor magni molestias officia aliquam
            impedit. Quo deleniti neque, obcaecati consectetur porro explicabo commodi quasi ipsa.
          </span>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>
            Название фото Название фото Название фото Название фото Название фото Название фото Название фото Название фото Название фото Название фото Название
            фото Название фото Название фото Название фото Название фото Название фото Название фото Название фото Название фото
          </h3>
          <img className={styles.img} src={exemple} alt="MenuPhoto" />
          <div className={styles.controls}>
            <div className={styles.pagination_container}>
              <button className={styles.button} onClick={handlePrev} disabled={currentPhoto === 1}>
                <ArrowLeftIcon style={{ width: '70px', height: '70px' }} />
              </button>
              <span className={styles.pagination}>
                {currentPhoto}/{totalPhotos}
              </span>
              <button className={styles.button} onClick={handleNext} disabled={currentPhoto === totalPhotos}>
                <ArrowRightIcon style={{ width: '70px', height: '70px' }} />
              </button>
            </div>
            <button className={styles.button_fullscreen} onClick={() => window.location.reload()}>
              <FullscreenIcon style={{ width: '27px', height: '26px' }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuPhoto;
