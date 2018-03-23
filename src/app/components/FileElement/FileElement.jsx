import React from 'react';
import styles from './FileElement.scss';

export default class FileElement extends React.Component{
    constructor(props){
        super(props);
        this.state={};
        this.state.fileName=this.props.fileName!=undefined?this.props.fileName:'undefined';
        this.state.fileSize=this.props.fileSize!=undefined?this.props.fileSize:'undefined';
        this.state.type=this.props.type!=undefined?this.props.type:'undefined';
    }

    render(){
        return(
            <div className={styles.file} >
                <h1 id='title' className={styles.name}>{this.state.fileName}</h1>
                <h1 id='size' className={styles.size}>{this.state.fileSize}</h1>
                <h1 id='type' className={styles.type}>{this.state.type}</h1>
            </div>
        )
    }
}