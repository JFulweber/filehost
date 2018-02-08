import React from 'react';
import styles from './Title.scss';

export default class Title extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.state.title=this.props.title!=undefined?this.props.title:'WireFrame';
        this.state.className=this.props.className!=undefined?this.props.className:styles.title;
    }
    render() {
        return (
            <h1 className={[styles.title, this.state.className].join(' ')}>{this.state.title}</h1>
        )
    }
}