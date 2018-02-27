import React from 'react';
import styles from './FileList.scss';
import FileElement from '../../components/FileElement/FileElement.jsx';

export default class FileList extends React.Component{
    getItems(){
        //TODO: get all the files in the current directory
    }

    render(){
        var items = {};
        var render = {}
        return(
            <div className={styles.fileContainer}>
                <FileElement fileName='Test1' fileSize='10000000 MB' type='png'/>
            </div>
        )
    }
}