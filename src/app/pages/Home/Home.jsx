import React from 'react';
import styles from './Home.scss';
import Particle from '../../components/Particle/Particle.jsx';
import Login from '../../components/Login/Login.jsx';
import ColorBlock from '../../components/ColorBlock/ColorBlock.jsx';
import MasterLayout from '../../layouts/MasterLayout/MasterLayout.jsx';
import About from '../../components/About/About.jsx';

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