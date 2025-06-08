import { useState, useEffect, useRef } from 'react';
import styles from '../../';

const ExhibitDetailModal = ({ exhibit, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = event => {
            if (modalRef.current && !modalRef.current.contains(event.target) && !isFullscreen) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose, isFullscreen]);

    const handlePrev = () => {
        setCurrentImageIndex(prev => (prev === 0 ? exhibit.images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentImageIndex(prev => (prev === exhibit.images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.detailModal}>
                {/* Верхняя панель навигации */}
                <div className={styles.modalHeader}>
                    <div className={styles.navButtons}>
                        <button onClick={handlePrev}>&larr;</button>
                        <button onClick={handleNext}>&rarr;</button>
                    </div>
                    <div className={styles.modalActions}>
                        <button onClick={() => {}}>◼◼◼</button>
                        <button onClick={onClose}>×</button>
                    </div>
                </div>

                {/* Основное содержимое */}
                <div className={styles.detailContent}>
                    <div className={styles.imageSection}>
                        <img src={exhibit.images[currentImageIndex]} alt={exhibit.name} onClick={() => setIsFullscreen(true)} className={styles.mainImage} />

                        {/* Пагинация */}
                        <div className={styles.pagination}>
                            {exhibit.images.map((_, index) => (
                                <button
                                    key={index}
                                    className={`${styles.paginationDot} ${index === currentImageIndex ? styles.active : ''}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={styles.infoSection}>
                        <h2>{exhibit.name}</h2>
                        <div className={styles.details}>
                            <p>
                                <strong>Дата создания:</strong> {exhibit.date}
                            </p>
                            <p>
                                <strong>Материал:</strong> {exhibit.material}
                            </p>
                            <p>
                                <strong>Размеры:</strong> {exhibit.size}
                            </p>
                        </div>
                        <div className={styles.description}>{exhibit.description}</div>
                    </div>
                </div>
            </div>

            {/* Полноэкранный режим */}
            {isFullscreen && (
                <div className={styles.fullscreenOverlay} onClick={() => setIsFullscreen(false)}>
                    <img src={exhibit.images[currentImageIndex]} alt={exhibit.name} className={styles.fullscreenImage} />
                </div>
            )}
        </div>
    );
};

export default ExhibitDetailModal;
