import React from 'react';
import styles from './uploader.scss';

export default class Uploader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.style = styles.resting;
        this.handleChange = this.handleChange.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDragOverCapture = this.onDragOverCapture.bind(this);
        this.onDragExitCapture = this.onDragExitCapture.bind(this);
    }

    handleChange(e) {
        var data = new FormData();
        data.append('file', e.target.files[0]);
        data.append('user', 'jeff');
        //console.log(e.target.files[0]); <-- this is the file accessible
        fetch('/upload', {
            method: 'post',
            body: data
        }).then(resp => {
            // need to do anything?
        }).catch(err => { if (err) throw err })
    }

    onDrop(e) {
        e.preventDefault(); // prevent browser from opening files
        console.log('mmnn cromnch on file yummy thx');
        // access the raw files - upload using the previous 'handleChange' method. 
        // the body must contain the specific dir info, and user token for the server to accept the files.
        console.log(e.dataTransfer.files) 
        this.setState({ style: styles.resting });
    }

    onDragOverCapture(e) {
        e.preventDefault();
        this.setState({ style: styles.dropHover })
    }

    onDragExitCapture(e) {
        e.preventDefault();
        this.setState({ style: styles.resting })
    }

    render() {
        //onDragEnter={this.onDragOverCapture} onDragLeave={this.onDragExitCapture} (controls making it look different on file hover)
        return (
            <div id="container" onDrop={this.onDrop} className={styles.base}>
                <div onDrop={this.onDrop} onDragEnter={this.onDragOverCapture} onDragLeave={this.onDragExitCapture} className={this.state.style} onDragOver={(e)=>{e.preventDefault()}}>
                    <p> files... lemme get ya files... im hungy hungy</p>
                </div>
            </div>)
    }
}