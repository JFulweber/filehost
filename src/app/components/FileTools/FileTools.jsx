import React from 'react';
import styles from './FileTools.scss';
import Uploader from '../Uploader/Uploader.jsx';

export default class FileTools extends React.Component {

    constructor(props){
        super(props);
        this.downloadFile = this.downloadFile.bind(this);
        this.shareFile = this.shareFile.bind(this);
    }

    downloadFile(e) {
        window.open(`http://localhost:3000/filedl?token=${localStorage.getItem('token')}&path=${this.props.path}&rawName=${this.props.rawName}`);
    }

    shareFile(){
        alert("no");
    }

    render(){
        return(
            <div className={styles.container}>
                <i class="far fa-file"/>
                <img src='/icons/dl.png' className={styles.icon} onClick={this.downloadFile}/>
                <img src='/icons/link.png' className={styles.icon} onClick={this.shareFile}/>
            </div>
        )
    }
}