import React from 'react';
import styles from './Title.scss';

export default class Title extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.titlebgContainer}>
                    <h1 className={styles.titlebg}>WireFrame</h1>
                </div>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>WireFrame</h1>
                </div>
            </div>
        )
    }
}