import React from 'react';
import styles from './Register.scss';
import Particle from '../../components/Particle/Particle.jsx';
import Reg from '../../components/Register/Register.jsx';
import MasterLayout from '../../layouts/MasterLayout/MasterLayout.jsx';

export default class Register extends React.Component {
    render(){
        return(
            <MasterLayout overflow='hidden'>
                <div className={styles.top}>
                    <Particle />
                    <Reg />
                </div>
                <div className={styles.placeholder}>
                </div>
            </MasterLayout>
        )
    }
}