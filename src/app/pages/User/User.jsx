import React from 'react';
import MasterLayout from '../../layouts/MasterLayout/MasterLayout.jsx';
import styles from './User.scss';
import Particle from '../../components/Particle/Particle.jsx';
import FileList from '../../components/FileList/FileList.jsx';
import p from '../../palette.scss';

export default class User extends React.Component {
    render() {
        return (
            <MasterLayout overflow='visable' backgroundColor={p.colorBlack}>
                <div className={styles.top}>
                    <div className={styles.sideBar}>
                        <div className={styles.fileStruc}>

                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.topBar}>
                            
                        </div>
                        <div className={styles.files}>

                        </div>
                    </div>
                </div>
            </MasterLayout>
        )
    }
}