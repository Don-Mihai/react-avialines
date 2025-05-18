import styles from './PersonaliPage.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { personali } from '../../data';

const PersonaliPage = ({ data = personali }) => {
    const navigate = useNavigate();
    const [currentCategory, setCurrentCategory] = useState('pilots');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const [currentImages, setCurrentImages] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadImages = () => {
            const images = data[currentCategory]
                .flatMap(
                    person =>
                        person.gallery?.map((img, idx) => ({
                            ...img,
                            personId: person.id,
                            personTitle: person.title,
                            date: person.date,
                            id: `${person.id}-${idx}`,
                        })) || []
                )
                .filter(img => img.src);

            setCurrentImages(images);
            setTotalPages(Math.ceil(images.length / itemsPerPage));
            setCurrentPage(1);
        };

        loadImages();
    }, [currentCategory, data, itemsPerPage]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = currentImages.slice(indexOfFirstItem, indexOfLastItem);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <Header />
                <h1 className={styles.title}>Персонали</h1>
                <div className={styles.categorySelector}>
                    {Object.keys(data).map(category => (
                        <button key={category} onClick={() => setCurrentCategory(category)} className={currentCategory === category ? styles.active : ''}>
                            {category.toUpperCase()}
                        </button>
                    ))}
                </div>

                <div className={styles.imageGrid}>
                    {currentItems.length > 0 ? (
                        currentItems.map(image => (
                            <div key={image.id} className={styles.imageCard} onClick={() => navigate(`/personali/${image.personId}`)}>
                                <img src={image.src} alt={image.title} className={styles.image} />
                                <div className={styles.imageInfo}>
                                    <h4 style={{ fontWeight: 'normal' }}>{image.personTitle}</h4>
                                    <p>{image.date}</p>
                                    <p style={{ fontSize: '14px' }}>{image.title}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.noImages}>No images available</div>
                    )}
                </div>
                <div className={styles.pagination}>
                    <button onClick={handlePrevious} disabled={currentPage === 1} className={styles.arrowButton}>
                        <ArrowLeftIcon />
                    </button>
                    <span className={styles.pageCounter}>
                        {currentPage} / {totalPages}
                    </span>
                    <button onClick={handleNext} disabled={currentPage === totalPages} className={styles.arrowButton}>
                        <ArrowRightIcon />
                    </button>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default PersonaliPage;
