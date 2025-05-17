import styles from './MenuPhoto.module.css';
import { useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const MenuPhoto = ({ images, text, title }) => {
    const [currentPhoto, setCurrentPhoto] = useState(1);
    const totalPhotos = 12;

    const handlePrev = () => {
        setCurrentPhoto(prev => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPhoto(prev => Math.min(prev + 1, totalPhotos));
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.text}>
                    <span>{text}</span>
                </div>
                <div className={styles.content}>
                    <h3 className={styles.title}>{title}</h3>
                    <img className={styles.img} src={images[currentPhoto - 1].src} alt="MenuPhoto" />
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
                    </div>
                    <button className={styles.button_fullscreen} onClick={() => window.location.reload()}>
                        <FullscreenIcon style={{ width: '50px', height: '50px' }} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default MenuPhoto;
