import React from 'react';
import MasterLayout from '../../layouts/MasterLayout/MasterLayout.jsx';
import styles from './User.scss';
import Particle from '../../components/Particle/Particle.jsx';
import FileList from '../../components/FileList/FileList.jsx';
import p from '../../palette.scss';

export default class User extends React.Component {
    render() {
        return (
            <MasterLayout overflow='hidden' backgroundColor={p.colorBlack}>
                <div className={styles.top}>
                    <div className={styles.sideBar}>
                        <div className={styles.fileStruc}>

                        </div>
                    </div>
                    <div className={styles.topBar}>

                    </div>
                    <div className={styles.content}>

                        <div className={styles.files}>
                            <div className={styles.head}>
                                <h1 className={styles.name}>Name</h1>
                                <h1 className={styles.size}>Size</h1>
                                <h1 className={styles.type}>Type</h1>
                            </div>
                            <FileList />
                        </div>
                    </div>
                </div>
            </MasterLayout>
        )
    }
}