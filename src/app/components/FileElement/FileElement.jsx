import React from 'react';
import styles from './FileElement.scss';
import FileTools from '../../components/FileTools/FileTools.jsx';


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
            <div className={styles.file}>
                <div className={styles.icon}>
                    <img src='/icons/file.png' />
                </div>
                <div className={styles.nameCont}>
                    <p className={styles.name}>{this.props.fileName}</p>
                </div>
                <div className={styles.sizeCont}>
                    <p className={styles.size}>{this.props.fileSize}</p>
                </div>
                <div className={styles.toolCont}>
                    <FileTools path={this.props.path} rawName={this.props.rawName} />
                </div>
                <div className={styles.typeCont}>
                    <p className={styles.type}>{this.props.type}</p>
                </div>
            </div>
        )
    }
}