import React from 'react';
import styles from './FileTools.scss';
import Uploader from '../Uploader/Uploader.jsx';

export default class FileTools extends React.Component {

    constructor(props){
        super(props);
        this.downloadFile = this.downloadFile.bind(this);
        this.shareFile = this.shareFile.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
    }

    downloadFile(e) {
        window.open(`http://localhost:3000/filedl?token=${localStorage.getItem('token')}&path=${this.props.path}&rawName=${this.props.rawName}`);
    }

    shareFile(){
        alert("no");
    }

    deleteFile(){
        alert('lol fix later')
    }

    render(){
        return(
            <div className={styles.container}>
                <i className="fas fa-download" onClick={this.downloadFile}/>
                <i className="fas fa-share-alt" onClick={this.shareFile}/>
                <i className="far fa-trash-alt" onClick={this.deleteFile}/>
            </div>
        )
    }
}