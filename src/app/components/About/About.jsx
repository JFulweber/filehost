import React from 'react';
import styles from './About.scss'
import Title from '../../components/Title/Title.jsx';

export default class About extends React.Component {
    render() {
        return (
            <div className={styles.about}>
                <Title title="About"/>
            </div>
        )
    }
}