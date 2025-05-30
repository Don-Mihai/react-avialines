import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GamesMenu from '../../../components/GamesMenu/index.jsx';
import styles from './CertificateFormPage.module.css';

const CertificateFormPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { game, score, total, time } = location.state || {};
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        // Здесь можно добавить отправку данных на сервер
        navigate('/thanks', { state: { game } });
    };

    return (
        <div className={styles.container}>
            <GamesMenu activeGame={game} correctAnswersCount={score} totalQuestions={total} freezeStats={true} initialSeconds={time} />
            <div className={styles.content}>
                <h2>Введите свое имя и адрес электронной почты, чтобы получить грамоту участника</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Имя:</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CertificateFormPage;
