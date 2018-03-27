import React from 'react';
import styles from './FileTools.scss';

export default class FileTools extends React.Component {

    constructor(props){
        super(props);
        this.state={};
        this.state.className=this.props.className!=undefined?this.props.className:styles.title;
    }

    render(){
        return(
            <div className={[styles.container, this.state.className].join(' ')}>
                
            </div>
        )
    }
}