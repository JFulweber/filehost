import React from 'react';
import styles from './NotFound.scss';
import MasterLayout from '../../layouts/MasterLayout/MasterLayout.jsx';
import Particle from '../../components/Particle/Particle.jsx';

export default class NotFound extends React.Component {
    render() {
        return (
            <MasterLayout>
                <div className={styles.top}>
                    <Particle />
                    <div className={styles.container}>
                        <h1>¯\_(ツ)_/¯</h1>
                        <h1>Something went wrong</h1>
                    </div>
                </div>
            </MasterLayout>
        )
    }
}