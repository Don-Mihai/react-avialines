import { useState } from 'react';
import styles from './MenuAudio.module.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const MenuAudio = ({ audios }) => {
    const [currentAudio, setCurrentAudio] = useState(1);
    const totalAudios = 2;

    const handlePrev = () => {
        setCurrentAudio(prev => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentAudio(prev => Math.min(prev + 1, totalAudios));
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.text}>
                    <span>{audios[currentAudio - 1]?.text}</span>
                </div>
                <div className={styles.content}>
                    <h3 className={styles.title}>{audios[currentAudio - 1]?.title || 'Название Аудио'}</h3>
                    <img className={styles.img} src={audios[currentAudio - 1]?.src} alt="MenuAudio" />
                    <div className={styles.controls}>
                        <div className={styles.pagination_container}>
                            <button className={styles.button} onClick={handlePrev} disabled={currentAudio === 1}>
                                <ArrowLeftIcon style={{ width: '70px', height: '70px' }} />
                            </button>
                            <span className={styles.pagination}>
                                {currentAudio}/{totalAudios}
                            </span>
                            <button className={styles.button} onClick={handleNext} disabled={currentAudio === totalAudios}>
                                <ArrowRightIcon style={{ width: '70px', height: '70px' }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MenuAudio;
