import React from 'react';
import styles from './Uploader.scss';

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
        fetch('/upload', {
            method: 'post',
            body: data
        }).then(resp => {
            // need to do anything?
        }).catch(err => { if (err) throw err })
    }

    onDrop(e) {
        e.preventDefault(); // prevent browser from opening files
        if(e.dataTransfer.files.length > 1) {
            this.setState({style:styles.resting});
            return;
        }
        else{
            // access the raw files - upload using the previous 'handleChange' method. 
            // the body must contain the specific dir info, and user token for the server to accept the files.
            var data = new FormData();
            data.append('files', e.dataTransfer.files);
            data.append('token',localStorage.getItem("token"));
            data.append('fromSite', true);
            console.log(data);
            fetch('http://localhost:3000/upload',{
                method: 'post',
                body: data
            }).then(resp =>{
                this.setState({ style: styles.resting });
                console.log('uploaded and got response');
            }).catch(err=>{if(err) throw err})
            this.setState({style:styles.uploading})
        }
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
            <div id="container" className={styles.base}>
                <div onDrop={this.onDrop} onDragEnter={this.onDragOverCapture} onDragLeave={this.onDragExitCapture} className={this.state.style} onDragOver={(e)=>{e.preventDefault()}}>
                    <p>Drop Files Here</p>
                </div>
            </div>)
    }
}