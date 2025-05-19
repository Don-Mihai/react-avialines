import styles from './Quote.module.css';

const Quote = ({ quote }) => {
    return (
        <div className={styles.quote}>
            <blockquote>"{quote}"</blockquote>
        </div>
    );
};

export default Quote;
