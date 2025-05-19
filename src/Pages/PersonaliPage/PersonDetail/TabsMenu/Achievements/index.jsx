import styles from './Achievements.module.css';

const Achievements = ({ awards }) => {
    return (
        <div className={styles.awards}>
            {awards.map((award, index) => (
                <div key={index} className={styles.awardItem}>
                    {award.title}
                </div>
            ))}
        </div>
    );
};

export default Achievements;
