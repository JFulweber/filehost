import React from 'react';
import styles from './FileElement.scss';



export default class FileElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.dir = this.props.dir;
        this.onClick = this.onClick.bind(this);
        console.log(this.props);
    }

    onClick(e) {
        window.open(`http://localhost:3000/filedl?token=${localStorage.getItem('token')}&path=${this.props.path}&rawName=${this.props.rawName}`) // <-- TRIGGERS FILE SAVE PROMPT
    }

    render() {
        return (
            <div className={styles.file}>
                <div className={styles.cont}>
                    <div className={styles.icon}>
                        <img src='/icons/file.png' />
                    </div>
                    <div className={styles.nameCont}>
                        <p>{this.props.fileName}</p>
                    </div>
                    <div className={styles.sizeCont}>
                        <p>{this.props.fileSize}</p>
                    </div>
                    <div className={styles.typeCont}>
                        <p>{this.props.type}</p>
                    </div>
                </div>
            </div>
        )
    }
}