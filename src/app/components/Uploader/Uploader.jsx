import React from 'react';
import styles from './Uploader.scss';

export default class Uploader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.style = styles.resting;
        this.onDrop = this.onDrop.bind(this);
        this.onDragStarted = this.onDragStarted.bind(this);
        this.onDragStopped = this.onDragStopped.bind(this);
    }

    onDrop(e) {
        e.preventDefault(); // prevent browser from opening files
        if (e.dataTransfer.files.length > 1) {
            this.setState({ style: styles.resting });
            return;
        }
        else {
            // access the raw files - upload using the previous 'handleChange' method. 
            // the body must contain the specific dir info, and user token for the server to accept the files.
            var data = new FormData();
            data.append('file', e.dataTransfer.files[0]);
            data.append('token', localStorage.getItem("token"));
            data.append('path', this.state.dir?this.state.dir:'/');
            data.append('fromSite', true);
            console.log(data);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:3000/upload', true);
            //xhr.setRequestHeader('Content-Type', 'multipart/form-data');
            xhr.send(data);
            xhr.onprogress = (e) => {
                var prog = Math.ceil(((xhr.upload.loaded + e.loaded) / xhr.upload.total) * 100);
            }
            xhr.onreadystatechange = (e) => {
                if (xhr.readyState != XMLHttpRequest.DONE) {
                    this.setState({ style: styles.uploading })
                }
                else {
                    this.setState({ style: styles.resting });
                    console.log(this.props);
                    this.props.updateItems();
                }
            }

            /*    fetch('http://localhost:3000/upload', {
                            method: 'post',
                            body: data
                        }).then(resp => {
                            this.setState({ style: styles.resting });
                            console.log('uploaded and got response');
                        }).catch(err => { if (err) throw err })
                         */
        }
    }

    onDragStarted(e) {
        e.preventDefault();
        this.setState({ style: styles.dropHover })
    }

    onDragStopped(e) {
        e.preventDefault();
        this.setState({ style: styles.resting })
    }

    render() {
        //onDragEnter={this.onDragStarted} onDragLeave={this.onDragStopped} (controls making it look different on file hover)
        this.state.dir = this.props.dir ? this.props.dir : '/';
        console.log(this.state.dir);
        return (
            <div id="container" className={styles.base}>
                <p className={styles.text}>Drop Files Here</p>
                <div onDrop={this.onDrop} onDragEnter={this.onDragStarted} onDragLeave={this.onDragStopped} className={this.state.style} onDragOver={(e) => { e.preventDefault() }}>
                    <div className={styles.loading}>

                    </div>
                </div>
            </div>)
    }
}
