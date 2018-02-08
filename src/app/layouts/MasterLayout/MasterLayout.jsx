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
                        <Title title='WireFrame' className={styles.headerTitle}/>
                        <NavElement/>
                    </nav>
                </header>
                {this.props.children}
            </div>
        )
    }
}