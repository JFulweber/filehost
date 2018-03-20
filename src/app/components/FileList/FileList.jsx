import React from 'react';
import styles from './FileList.scss';
import FileElement from '../../components/FileElement/FileElement.jsx';
import FileFolder from '../../components/FileFolder/FileFolder.jsx';

export default class FileList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.dir = '/';
        this.state.items = [];
    }
    //(?<="Username":").+?(?=")
    componentDidMount() {

    }

    render() {
        return (
            <div className={styles.fileContainer}>
                <div className={styles.header}>
                    <h1 className={styles.name}>Name</h1>
                    <h1 className={styles.size}>Size</h1>
                    <h1 className={styles.type}>Type</h1>
                </div>
                {items}
            </div>
        )
    }
}