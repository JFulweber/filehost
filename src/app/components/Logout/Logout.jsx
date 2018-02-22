import React from 'react';
import MasterLayout from '../../layouts/MasterLayout/MasterLayout.jsx';
import Title from '../../components/Title/Title.jsx';
import Particle from '../../components/Particle/Particle.jsx';
import styles from './Logout.scss';

export default class Logout extends React.Component {
    render() {
        localStorage.clear("token");
        localStorage.clear("username");
        return (
            <MasterLayout>
                 <div className={styles.top}>
                    <Particle />
                    <Title title='Logging Out...' className={styles.logout}/>
                </div>
            </MasterLayout>
        )
    }
}