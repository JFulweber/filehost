import React from 'react';
import styles from './FileFolder.scss';
import FileTools from '../FileTools/FileTools.jsx';

export default class FileFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.folderName = this.props.folderName != undefined ? this.props.folderName : 'undefined';
        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <div className={styles.file}>
                <div className={styles.icon}>
                    <i className="fas fa-folder"/>
                </div>
                <div className={styles.nameCont} onClick={this.onClick}>
                    <p className={styles.name}>{this.props.folderName}</p>
                </div>
                {this.props.folderName!=='..'?<FileTools path={this.props.path} rawName={this.props.folderName} updateItems={this.props.updateItems} />:<div/>}
            </div>
        )
    }

    onClick() {
        this.props.clicked(this.state.folderName == ".." ? ".." : this.state.folderName);
    }
}