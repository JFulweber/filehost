import React from 'react';
import styles from './FileList.scss';
import FileElement from '../../components/FileElement/FileElement.jsx';

export default class FileList extends React.Component {
    render() {
        var items = {};
        var render = {}
        return (
            <div className={styles.fileContainer}>
                <FileElement fileName='TOP' fileSize='TOP' type='TOP' />
                <FileElement fileName='TOP' fileSize='TOP' type='TOP' />
                <FileElement fileName='TOP' fileSize='TOP' type='TOP' />
                <FileElement fileName='TOP' fileSize='TOP' type='TOP' />
                <FileElement fileName='TOP' fileSize='TOP' type='TOP' />
                <FileElement fileName='TOP' fileSize='TOP' type='TOP' />
                <FileElement fileName='TOP' fileSize='TOP' type='TOP' />
                <FileElement fileName='TOP' fileSize='TOP' type='TOP' />
                <FileElement fileName='TOP' fileSize='TOP' type='TOP' />
                <FileElement fileName='TOP' fileSize='TOP' type='TOP' />
                <FileElement fileName='TOP' fileSize='TOP' type='TOP' />
                <FileElement fileName='TOP' fileSize='TOP' type='TOP' />
                <FileElement fileName='BOTTOM' fileSize='BOTTOM' type='BOTTOM' />
            </div>  
        )
    }
}