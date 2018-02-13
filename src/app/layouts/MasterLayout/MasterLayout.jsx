import React from 'react';
import Title from '../../components/Title/Title.jsx';
import styles from "./MasterLayout.scss";
import NavElement from '../../components/NavElement/NavElement.jsx';

export default class MasterLayout extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <nav className={styles.header}>
                        <Title title='WireFrame' className={styles.headerTitle} />
                        <div className={styles.links}>
                            <NavElement text='Home' dest='/' />
                            <NavElement text='About' dest='/about' />
                            <NavElement text='My Files' dest='/' />
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