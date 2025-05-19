import styles from './Biography.module.css';

const Biography = ({ data }) => {
    return (
        <div className={styles.biography}>
            <h3>{data.title}</h3>
            <p>{data.content}</p>
        </div>
    );
};

export default Biography;
