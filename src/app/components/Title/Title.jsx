import React from 'react';
import styles from './Title.scss';

export default class Title extends React.Component {
    render() {
        return (
            <h1 className={styles.title}>WireFrame</h1>
        )
    }
}