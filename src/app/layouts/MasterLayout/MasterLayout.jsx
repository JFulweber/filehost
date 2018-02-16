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
        this.state.backgroundColor = 'transparent';
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
    }

    onScroll(e) {
        let scrollTop = e.srcElement.body.scrollTop;
        if (scrollTop >= 69) {
            this.setState({ backgroundColor: p.colorBlack });
        }
        else {
            this.setState({ backgroundColor: 'transparent' });
        }
    }

    render() {
        return (
            <div>
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