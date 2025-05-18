import styles from './PersonaliPage.module.css';
import { useState, useEffect } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { personali } from '../../data';

const PersonaliPage = ({ data = personali }) => {
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
                            personTitle: person.title,
                            date: person.date,
                            id: `${person.title}-${idx}`,
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

    const paginate = pageNumber => setCurrentPage(pageNumber);

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
                            <div key={image.id} className={styles.imageCard}>
                                <img src={image.src} alt={image.title} className={styles.image} />
                                <div className={styles.imageInfo}>
                                    <h3>{image.personTitle}</h3>
                                    <p>{image.date}</p>
                                    <p>{image.title}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.noImages}>No images available</div>
                    )}
                </div>
                <div className={styles.pagination}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                        <button key={number} onClick={() => paginate(number)} className={currentPage === number ? styles.activePage : ''}>
                            {number}
                        </button>
                    ))}
                </div>
                <Footer />
            </div>
        </>
    );
};

export default PersonaliPage;
