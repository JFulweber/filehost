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
        window.open(`http://localhost:3000/filedl?token=${localStorage.getItem('token')}&path=${this.props.path}&rawName=${this.props.rawName}`) // <-- TRIGGERS FILE SAVE PROMPT
    }

    render() {
        return (
            <div className={styles.file} onClick={this.onClick} >
                <div className={styles.name}>
                    <h1 id='title' className={styles.nameText}>{this.props.fileName}</h1>
                </div>
                <div className={styles.size}>
                    <h1 id='size' className={styles.sizeText}>{this.props.fileSize}</h1>
                </div>
                <div className={styles.type}>
                    <h1 id='type' className={styles.typeText}>{this.props.type}</h1>
                </div>
            </div>
        )
    }
}