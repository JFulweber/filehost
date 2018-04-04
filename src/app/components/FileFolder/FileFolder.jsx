import React from 'react';
import styles from './FileFolder.scss';

export default class FileFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.folderName = this.props.folderName != undefined ? this.props.folderName : 'undefined';
        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <div className={styles.file} onClick={this.onClick}>
                <div>
                    <img src='/icons/file.png' className={styles.icon} />
                </div>
                <div>
                    <h1 id='title' className={styles.name}>{this.state.folderName}</h1>
                </div>
            </div>
        )
    }

    onClick() {
        this.props.clicked(this.state.folderName == ".." ? ".." : this.state.folderName);
    }
}