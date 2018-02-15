import React from 'react';
import Title from '../../components/Title/Title.jsx';
import styles from "./MasterLayout.scss";
import NavElement from '../../components/NavElement/NavElement.jsx';
import ScrollTrigger from 'react-scroll-trigger';
import p from '../../palette.scss'

export default class MasterLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};
        this.state.backgroundColor = '#666666';
        this.onEnterViewport = this.onEnterViewport.bind(this);
        this.onExitViewport = this.onExitViewport.bind(this);
    }

    onEnterViewport() {
        this.setState({
            backgroundColor: 'transparent'
        });
        console.log('changing to transparent')
    }

    onExitViewport() {
        this.setState({
            backgroundColor: p.colorDarkRed
        });
        console.log('changing to #ffffff')
    }

    render() {
        return (
            <div>
                <header>
                    <ScrollTrigger onEnter={this.onEnterViewport} onExit={this.onExitViewport}>
                        <div className={styles.trigger}>
                        </div>
                    </ScrollTrigger>
                    <nav className={styles.header} style={{ backgroundColor: this.state.backgroundColor }}>
                        <Title title='WireFrame' className={styles.headerTitle} />
                        <div className={styles.links}>
                            <NavElement text='Home' dest='/' />
                            <NavElement text='About' dest='/about' />
                            <NavElement text='My Files' dest='/user/' />
                        </div>
                    </nav>
                </header>
                <ScrollTrigger onEnter={this.onEnterViewport} onExit={this.onExitViewport}>
                    <div className={styles.spacer}>
                    </div>
                </ScrollTrigger>
                {this.props.children}
            </div>
        )
    }
}