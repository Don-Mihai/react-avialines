import styles from './Gallery.module.css';

const Gallery = ({ images }) => {
    return (
        <div className={styles.galleryGrid}>
            {images.map((img, index) => (
                <div key={index} className={styles.galleryItem}>
                    <img src={img.src} alt={img.title} />
                    <p>{img.title}</p>
                </div>
            ))}
        </div>
    );
};

export default Gallery;
