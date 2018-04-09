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
                <div>
                    <img src='../../../../dist/icons/file.png' className={styles.icon}/>
                    make me not look like ploopy thanks :)))))
                    {this.props.fileName}
                    {this.props.fileSize}
                    {this.props.type}
                </div>
            </div>
        )
    }
}