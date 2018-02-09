import React from 'react';
import styles from './NavElement.scss';

export default class NavElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.text = this.props.text != undefined ? this.props.text : 'Home';
        this.state.dest = this.props.dest != undefined ? this.props.dest : '/';
        this.state.className = this.props.className != undefined ? this.props.className : styles.element;
    }

    render() {
        return (
            <a href={this.state.dest} className={[styles.element, this.state.className].join(' ')}>{this.state.text}</a>
        )
    }
}