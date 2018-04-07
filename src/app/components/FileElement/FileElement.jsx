import React from 'react';
import styles from './FileElement.scss';



export default class FileElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.dir = this.props.dir;
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        // alert('hi'); add redirect to file logic/download
        window.open(`http://localhost:3000/filedl?token=${localStorage.getItem('token')}&path=${this.props.path}&rawName=${this.props.rawName}`) // <-- TRIGGERS FILE SAVE PROMPT
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