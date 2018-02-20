import React from 'react';
import styles from './About.scss'
import Title from '../../components/Title/Title.jsx';

export default class About extends React.Component {
    render() {
        return (
            <div className={styles.about}>
                <Title title="About"/>
                <p className={styles.p1}>This website is a file host esque project called 'WireFrame'. Its basically a dropbox clone that we are useing to learn more about how to make proper webpages.</p>
            </div>
        )
    }
}