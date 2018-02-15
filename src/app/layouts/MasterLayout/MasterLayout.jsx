import React from 'react';
import Title from '../../components/Title/Title.jsx';
import styles from "./MasterLayout.scss";
import NavElement from '../../components/NavElement/NavElement.jsx';
import ScrollTrigger from 'react-scroll-trigger';

export default class MasterLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};
        this.state.backgroundColor = '#666666';
        this.onEnterViewport = this.onEnterViewport.bind(this);
        this.onExitViewport = this.onExitViewport.bind(this);
        console.log(this.state.backgroundColor);
    }

    onEnterViewport() {
        this.setState({
            backgroundColor: '#000000'
        });
        console.log('changing to #00000000')
    }

    onExitViewport() {
        this.setState({
            backgroundColor: '#ffffff'
        });
        console.log('changing to #ffffff')
    }

    render() {
        return (
            <div>
                <ScrollTrigger onEnter={this.onEnterViewport} onExit={this.onExitViewport}>
                    <div id='trigger'>
                    </div>
                </ScrollTrigger>
                <header>
                    <nav className={styles.header} style={{ backgroundColor: this.state.backgroundColor }}>
                        <Title title='WireFrame' className={styles.headerTitle} />
                        <div className={styles.links}>
                            <NavElement text='Home' dest='/' />
                            <NavElement text='About' dest='/about' />
                            <NavElement text='My Files' dest='/user/' />
                        </div>
                    </nav>
                </header>
                <div className={styles.spacer}>
                </div>
                {this.props.children}
            </div>
        )
    }
}