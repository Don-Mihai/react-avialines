import { useState, useEffect, useRef } from 'react';
import styles from '../Header.module.css';
import { exhibitsData } from '../../../data';

const CatalogModal = ({ onClose, onSelectExhibit }) => {
    const [visibleCount, setVisibleCount] = useState(4);
    const modalRef = useRef(null);

    // Закрытие модального окна при клике вне его области
    useEffect(() => {
        const handleClickOutside = event => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className={styles.modalOverlay}>
            <div ref={modalRef} className={styles.catalogModal}>
                {/* Кнопка закрытия в верхнем правом углу */}
                <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>

                <div className={styles.modalContent}>
                    <h2 className={styles.catalogTitle}>Каталог экспонатов</h2>

                    <div className={styles.exhibitsGrid}>
                        {exhibitsData.slice(0, visibleCount).map(exhibit => (
                            <div key={exhibit.id} className={styles.exhibitCard} onClick={() => onSelectExhibit(exhibit)}>
                                <img src={exhibit.images[0]} alt={exhibit.name} className={styles.thumbnail} />
                                <div className={styles.exhibitName}>{exhibit.name}</div>
                            </div>
                        ))}
                    </div>

                    {visibleCount < exhibitsData.length && (
                        <button className={styles.loadMore} onClick={() => setVisibleCount(prev => prev + 2)}>
                            Показать еще
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CatalogModal;
