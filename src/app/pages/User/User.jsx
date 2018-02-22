import React from 'react';
import MasterLayout from '../../layouts/MasterLayout/MasterLayout.jsx';
import styles from './User.scss';
import Particle from '../../components/Particle/Particle.jsx';

export default class User extends React.Component{
    render(){
        return(
            <MasterLayout overflow='visable'>
                <div className={styles.top}>
                    <Particle />
                    <div className={styles.container}>
                        <div className={styles.sideBar}>
                            <div className={styles.userArea}>
                                
                            </div>
                            <div className={styles.fileStruc}>

                            </div>
                        </div>
                    </div>
                </div>
            </MasterLayout>
        )
    }
}