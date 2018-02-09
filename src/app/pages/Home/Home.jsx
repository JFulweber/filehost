import React from 'react';
import styles from './Home.scss';
import Particle from '../../components/Particle/Particle.jsx';
import Login from '../../components/Login/Login.jsx';
import ColorBlock from '../../components/ColorBlock/ColorBlock.jsx';
import palette from '../../palette.scss';
import MasterLayout from '../../layouts/MasterLayout/MasterLayout.jsx';
import About from '../../components/About/About.jsx';

export default class Home extends React.Component {
    render() {
        return (
            <MasterLayout>
                <div className={styles.top}>
                    <Particle />
                    <Login />
                </div>
                <div className={styles.about}>
                    <About />
                </div>
            </MasterLayout>
        )
    }
}