import { useParams } from 'react-router';
import styles from './PersonDetail.module.css';
import { personali } from '../../../data';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

const PersonDetail = () => {
    const { id } = useParams();

    const categoryMap = {
        pilot: 'pilots',
        engineer: 'engineers',
        researcher: 'researchers',
    };

    const [categoryPrefix, index] = id.split('-');
    const category = categoryMap[categoryPrefix];
    const person = personali[category]?.find(p => p.id === id);

    if (!person) {
        return <div className={styles.error}>Персона не найдена</div>;
    }

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.header}>
                <h1>{person.title}</h1>
                <p className={styles.dates}>{person.date}</p>
            </div>

            <div className={styles.content}>
                <section className={styles.mainSection}>
                    <div className={styles.biography}>
                        <h2>Биография</h2>
                        <p>{person.biography.title}</p>
                    </div>

                    <div className={styles.details}>
                        <div className={styles.column}>
                            <div className={styles.awards}>
                                <h3>Награды</h3>
                                {person.awards.map((award, index) => (
                                    <div key={index} className={styles.awardItem}>
                                        {award.title || 'Название награды не указано'}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.column}>
                            <div className={styles.quotes}>
                                <h3>Цитаты</h3>
                                <blockquote>"{person.quotes.title || 'Нет доступных цитат'}"</blockquote>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.gallerySection}>
                    <h2>Галерея</h2>
                    <div className={styles.galleryGrid}>
                        {person.gallery.map((img, index) => (
                            <div key={index} className={styles.galleryItem}>
                                <img src={img.src} alt={img.title} className={styles.galleryImage} />
                                <p className={styles.imageCaption}>{img.title}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default PersonDetail;
