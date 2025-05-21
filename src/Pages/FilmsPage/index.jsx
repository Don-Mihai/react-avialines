import { useState, useEffect } from 'react';
import styles from './FilmsPage.module.css';
import { library } from '../../data';
import TabsMenu from './TabsMenu';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const TABS = {
    FILMS: 'films',
    AUDIOBOOKS: 'audioBooks',
    LECTURES: 'lectures',
    BOOKS: 'books',
};

const TABS_CONFIG = [
    { key: TABS.FILMS, label: 'Фильмы' },
    { key: TABS.AUDIOBOOKS, label: 'Аудиокниги' },
    { key: TABS.LECTURES, label: 'Лекции' },
    { key: TABS.BOOKS, label: 'Книги' },
];

const ITEMS_PER_PAGE = 3;

const FilmsPage = () => {
    const [activeTab, setActiveTab] = useState(TABS.FILMS);
    const [currentPages, setCurrentPages] = useState({
        [TABS.FILMS]: 1,
        [TABS.AUDIOBOOKS]: 1,
        [TABS.LECTURES]: 1,
        [TABS.BOOKS]: 1,
    });

    useEffect(() => {
        setCurrentPages(prev => ({
            ...prev,
            [activeTab]: 1,
        }));
    }, [activeTab]);

    const handlePageChange = newPage => {
        setCurrentPages(prev => ({
            ...prev,
            [activeTab]: newPage,
        }));
    };

    const renderMediaContent = item => {
        switch (activeTab) {
            case TABS.BOOKS:
                return <img src={item.image} alt={item.title} className={styles.mediaContent} />;
            default:
                return (
                    <video controls className={styles.mediaContent} poster={item.poster}>
                        <source src={item.video} type="video/mp4" />
                        Ваш браузер не поддерживает видео тег.
                    </video>
                );
        }
    };

    const renderPagination = totalItems => {
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        if (totalPages <= 1) return null;

        return (
            <div className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`${styles.pageButton} ${currentPages[activeTab] === i + 1 ? styles.active : ''}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        );
    };

    const renderContent = () => {
        const currentItems = library[activeTab];
        const startIndex = (currentPages[activeTab] - 1) * ITEMS_PER_PAGE;
        const paginatedItems = currentItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

        return (
            <>
                <div className={styles.mediaGrid}>
                    {paginatedItems.map((item, index) => (
                        <div key={`${activeTab}-${item.id}`} className={styles.mediaCard}>
                            <div className={styles.mediaContainer}>{renderMediaContent(item)}</div>
                            <div className={styles.mediaInfo}>
                                <h3 className={styles.mediaTitle}>{item.title}</h3>
                                {item.author && <p className={styles.mediaAuthor}>{item.author}</p>}
                                {item.year && <p className={styles.mediaYear}>{item.year}</p>}
                                {item.duration && <p className={styles.mediaDuration}>{item.duration}</p>}
                            </div>
                        </div>
                    ))}
                </div>
                {renderPagination(currentItems.length)}
            </>
        );
    };

    return (
        <div className={styles.container}>
            <Header />
            <h1 className={styles.mainTitle}>Фильмы и книги</h1>

            <TabsMenu activeTab={activeTab} onTabChange={setActiveTab} tabs={TABS_CONFIG} />

            <div className={styles.content}>
                {library[activeTab].length > 0 ? renderContent() : <div className={styles.emptyMessage}>В этой категории пока нет материалов</div>}
            </div>

            <Footer />
        </div>
    );
};

export default FilmsPage;
