import React from 'react';
import styles from './FileElement.scss';



export default class FileElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.dir = this.props.dir;
        this.onClick = this.onClick.bind(this);
        //this.state={};
        /* this.state.fileName=this.props.fileName!=undefined?this.props.fileName:'undefined';
        this.state.fileSize=this.props.fileSize!=undefined?this.props.fileSize:'undefined';
        this.state.type=this.props.type!=undefined?this.props.type:'undefined'; */
    }

    onClick(e) {
        // alert('hi'); add redirect to file logic/download
        fetch('http://localhost:3000/file', {
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                path: this.props.path,
                rawName: this.props.rawName
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            console.log(resp.body)
        }).catch((err) => {
            if (err) console.log(err);
        })
    }

    render() {
        return (
            <div className={styles.file} onClick={this.onClick} >
                <h1 id='title' className={styles.name}>{this.props.fileName}</h1>
                <h1 id='size' className={styles.size}>{this.props.fileSize}</h1>
                <h1 id='type' className={styles.type}>{this.props.type}</h1>
            </div>
        )
    }
}