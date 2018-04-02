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
            data.append('path', '/'); // TODO: Send state from FileList into here;
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
        return (
            <div id="container" className={styles.base}>
                <div onDrop={this.onDrop} onDragEnter={this.onDragStarted} onDragLeave={this.onDragStopped} className={this.state.style} onDragOver={(e)=>{e.preventDefault()}}>
                    <p>Drop Files Here</p>
                </div>
            </div>)
    }
}
