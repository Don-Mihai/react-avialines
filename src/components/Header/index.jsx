import { useLocation } from 'react-router';
import { useState } from 'react';
import styles from './Header.module.css';
import CatalogModal from './CatalogModal';
import ExhibitDetailModal from './CatalogModal/ExhibitDetailModal';

const Header = () => {
    const location = useLocation();
    const isMainPage = location.pathname === '/main';
    const isGamesPage = location.pathname === '/games';

    // Состояния для управления модальными окнами
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [selectedExhibit, setSelectedExhibit] = useState(null);

    return (
        <div className={styles.header}>
            {/* Показываем первые три кнопки везде, кроме /games */}
            {!isGamesPage && (
                <>
                    <button className={`${styles.button_header} ${isMainPage ? styles.button_header_main : ''}`}>
                        Версия для <br /> слабовидящих
                    </button>
                    <button onClick={() => setIsCatalogOpen(true)} className={`${styles.button_header} ${isMainPage ? styles.button_header_main : ''}`}>
                        каталог <br /> экспонатов
                    </button>
                    <button className={`${styles.button_header} ${isMainPage ? styles.button_header_main : ''}`}>
                        аудиогид <br /> по приложению
                    </button>
                </>
            )}

            {/* Кнопка "ru" всегда отображается с разными стилями */}
            <button
                className={`${styles.button_header} ${isMainPage ? styles.button_header_main : ''} 
                ${isGamesPage ? styles.button_header_games : ''}`}
            >
                ru
            </button>
            {/* Модальное окно каталога */}
            {isCatalogOpen && (
                <CatalogModal
                    onClose={() => setIsCatalogOpen(false)}
                    onSelectExhibit={exhibit => {
                        setSelectedExhibit(exhibit);
                        // Каталог автоматически закроется при выборе экспоната
                    }}
                />
            )}

            {/* Модальное окно деталей экспоната */}
            {selectedExhibit && (
                <ExhibitDetailModal
                    exhibit={selectedExhibit}
                    onClose={() => setSelectedExhibit(null)}
                    onBackToCatalog={() => {
                        setSelectedExhibit(null);
                        setIsCatalogOpen(true);
                    }}
                />
            )}
        </div>
    );
};

export default Header;
