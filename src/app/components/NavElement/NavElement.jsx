import React from 'react';
import styles from './NavElement.scss';

export default class NavElement extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.state.text=this.props.text!=undefined?this.props.text:'Home';
        this.state.dest=this.props.dest!=undefined?this.props.dest:'/';
    }
    render() {
        return (
            <div>
                <a href={this.state.dest}>{this.state.text}</a>
            </div>
        )
    }
}