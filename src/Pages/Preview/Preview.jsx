import React from 'react';
import { useNavigate } from 'react-router';
import styles from './Preview.module.css';

import rescue from '../../video/rescue_operations.mp4';

export default function Preview() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/main');
    };

    return (
        <div className={styles.container} onClick={handleClick}>
            <video className={styles.video} src={rescue} autoPlay loop muted playsInline />
        </div>
    );
}
