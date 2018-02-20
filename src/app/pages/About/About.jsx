import React from 'react';
import MasterLayout from '../../layouts/MasterLayout/MasterLayout.jsx';
import styles from './About.scss';
import Particle from '../../components/Particle/Particle.jsx';
import Description from '../../components/About/About.jsx';

export default class About extends React.Component{
    render(){
        return(
            <MasterLayout>
                <div className={styles.top}>
                    <Particle />
                    <div className={styles.container}>
                        <Description/>
                    </div>
                </div>
            </MasterLayout>
        )
    }
}