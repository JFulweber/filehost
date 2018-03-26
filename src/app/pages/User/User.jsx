import React from 'react';
import MasterLayout from '../../layouts/MasterLayout/MasterLayout.jsx';
import styles from './User.scss';
import Particle from '../../components/Particle/Particle.jsx';
import FileList from '../../components/FileList/FileList.jsx';
import p from '../../palette.scss';

export default class User extends React.Component {
    render() {
        return (
            <MasterLayout overflow='visible' backgroundColor={p.colorBlack}>
                <div className={styles.sideBar}>
                    
                </div>
                <div className={styles.content}>
                    <div className={styles.files}>
                        <FileList />
                    </div>
                </div>
            </MasterLayout>
        )
    }
}