import React from 'react';
import styles from './Uploader.scss';

export default class Uploader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.style = styles.resting;
        this.onDrop = this.onDrop.bind(this);
        this.state.progress = 0;
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
            data.append('path', this.state.dir ? this.state.dir : '/');
            data.append('fromSite', true);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:3000/upload', true);
            //xhr.setRequestHeader('Content-Type', 'multipart/form-data');
            xhr.upload.addEventListener('progress', (e) => {
                let progress = 0;
                if (e.total !== 0) {
                    progress = parseInt((e.loaded / e.total) * 100, 10);
                }
<<<<<<< HEAD
                else {
                    this.setState({ style: styles.resting });
                    console.log(this.props);
                    this.props.updateItems();
=======
                this.setState({ progress: progress });
            });
            xhr.addEventListener('readystatechange', (e) => {
                if (xhr.readyState == XMLHttpRequest.HEADERS_RECEIVED){
                    console.log('uploading')
                    this.setState({style: styles.uploading});
                }else if(xhr.readyState == XMLHttpRequest.DONE){
                    console.log('resting')
                    this.setState({style: styles.resting});
>>>>>>> 06a3a422db04e6f6b33e2178710bce13d49fd720
                }
            });
            xhr.send(data);
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
        this.state.dir = this.props.dir ? this.props.dir : '/';
        return (
            <div id="container" className={styles.base}>
                <p className={styles.text}>Drop Files Here</p>
                <div onDrop={this.onDrop} onDragEnter={this.onDragStarted} onDragLeave={this.onDragStopped} className={this.state.style} onDragOver={(e) => { e.preventDefault() }}>
                    <div className={styles.loading}>
                        <p>{this.state.progress}</p>
                    </div>
                </div>
            </div>)
    }
}
