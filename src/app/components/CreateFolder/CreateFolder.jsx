import React from 'react';
import styles from './CreateFolder.scss';

export default class CreateFolder extends React.Component{
    render(){
        return(
            <div className={styles.container}>
                <div className={styles.button}>
                    <p>New Folder</p>
                </div>
            </div>
        )
    }
}