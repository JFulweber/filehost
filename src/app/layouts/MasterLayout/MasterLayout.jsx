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
        this.state.overflow = this.props.overflow != undefined ? this.props.overflow : 'hidden';
      //  this.onScroll = this.onScroll.bind(this);
    }

/*     componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
        document.body.style.overflow = this.state.overflow;
        if(localStorage.getItem('token')==null || localStorage.getItem('token')==undefined){
            this.setState({style:{visibility:"hidden"}});
        }else{
            this.setState({style:{visibility:"shown"}});
        }
    }

    onScroll(e) {
        let scrollTop = e.srcElement.body.scrollTop;
        if (scrollTop >= 69) {
            this.setState({ backgroundColor: p.colorBlack });
        }
        else {
            this.setState({ backgroundColor: 'transparent' });
        }
    } */

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
                     <div className={styles.logout} style = {this.state.style}>
                         <NavElement text='Logout' dest='/logout' />
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