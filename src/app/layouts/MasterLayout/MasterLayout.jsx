import React from 'react';
import Title from '../../components/Title/Title.jsx';
import styles from "./MasterLayout.scss";

export default class MasterLayout extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <nav className={styles.header}>
                        <Title/>
                        <a href="/">Home</a>
                    </nav>
                </header>
                {this.props.children}
            </div>
        )
    }
}