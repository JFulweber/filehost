import React from 'react';
import styles from './Uploader.scss';

export default class Uploader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.style = styles.resting;
        this.state.dir = this.props.dir != null ? this.props.dir : '';
        this.onDrop = this.onDrop.bind(this);
        this.state.progress = 0;
        this.onDragStarted = this.onDragStarted.bind(this);
        this.onDragStopped = this.onDragStopped.bind(this);
    }

    onDrop(e) {
        e.preventDefault();
        console.log(this.props.dir);

        
        for (var i = 0; i < e.dataTransfer.files.length; i++) {
            var data = new FormData();
            data.append('file', e.dataTransfer.files[i]);
            data.append('token', localStorage.getItem("token"));
            data.append('path', this.state.dir);
            data.append('fromSite', true);
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = (e) => {
                if (xhr.readyState == XMLHttpRequest.OPENED) {
                    this.setState({ style: styles.uploading });
                } else if (xhr.readyState == XMLHttpRequest.DONE) {
                    this.setState({ style: styles.resting, progress: 0 });
                    this.props.updateItems();
                }
            };
            xhr.open('POST', 'http://localhost:3000/upload', true);
            xhr.upload.addEventListener('progress', (e) => {
                let progress = 0;
                if (e.total !== 0) {
                    progress = parseInt((e.loaded / e.total) * 100, 10);
                }
                this.setState({ progress: progress });
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
        this.state.dir = this.props.dir != null ? this.props.dir : '/';
        return (
            <div id="container" className={styles.base}>
                <p className={styles.text}>Drop Files Here</p>
                <div onDrop={this.onDrop} onDragEnter={this.onDragStarted} onDragLeave={this.onDragStopped} className={this.state.style} onDragOver={(e) => { e.preventDefault() }}>
                    <div className={styles.loading} style={{ height: 100 - this.state.progress + '%' }}>
                        <p className={styles.text}>{this.state.progress}%</p>
                    </div>
                </div>
            </div>)
    }
}
