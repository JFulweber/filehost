import React from 'react';
import styles from './Home.scss';
import Particle from '../../components/Particle/Particle.jsx';
import Login from '../../components/Login/Login.jsx';
import MasterLayout from '../../layouts/MasterLayout/MasterLayout.jsx';
import Title from '../../components/Title/Title.jsx';

export default class Home extends React.Component {
    render() { 
        return (
            <MasterLayout overflow='hidden'>
                <div className={styles.top}>
                    <Particle />
                    <Login />
                </div>
                <div className={styles.placeholder}>
                </div>
            </MasterLayout>
        )
    }
}