import React from 'react';
import styles from './FileList.scss';
import FileElement from '../../components/FileElement/FileElement.jsx';

export default class FileList extends React.Component {
    render() {
        var items = {};
        var render = {}
        return (
            <div className={styles.fileContainer}>
                <div className={styles.header}>
                    <h1 className={styles.name}>Name</h1>
                    <h1 className={styles.size}>Size</h1>
                    <h1 className={styles.type}>Type</h1>
                </div>
                <FileElement fileName='TOP' fileSize='TOP' type='TOP' />
                <FileElement fileName='MIDDLE' fileSize='MIDDLE' type='MIDDLE' />
                <FileElement fileName='MIDDLE' fileSize='MIDDLE' type='MIDDLE' />
                <FileElement fileName='MIDDLE' fileSize='MIDDLE' type='MIDDLE' />
                <FileElement fileName='MIDDLE' fileSize='MIDDLE' type='MIDDLE' />
                <FileElement fileName='MIDDLE' fileSize='MIDDLE' type='MIDDLE' />
                <FileElement fileName='MIDDLE' fileSize='MIDDLE' type='MIDDLE' />
                <FileElement fileName='MIDDLE' fileSize='MIDDLE' type='MIDDLE' />
                <FileElement fileName='MIDDLE' fileSize='MIDDLE' type='MIDDLE' />
                <FileElement fileName='MIDDLE' fileSize='MIDDLE' type='MIDDLE' />
                <FileElement fileName='MIDDLE' fileSize='MIDDLE' type='MIDDLE' />
                <FileElement fileName='MIDDLE' fileSize='MIDDLE' type='MIDDLE' />
                <FileElement fileName='MIDDLE' fileSize='MIDDLE' type='MIDDLE' />
                <FileElement fileName='MIDDLE' fileSize='MIDDLE' type='MIDDLE' />
                <FileElement fileName='MIDDLE' fileSize='MIDDLE' type='MIDDLE' />
                <FileElement fileName='MIDDLE' fileSize='MIDDLE' type='MIDDLE' />
                <FileElement fileName='MIDDLE' fileSize='MIDDLE' type='MIDDLE' />
                <FileElement fileName='BOTTOM' fileSize='BOTTOM' type='BOTTOM' />
            </div>
        )
    }
}