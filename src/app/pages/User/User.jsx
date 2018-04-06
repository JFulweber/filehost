import React from 'react';
import MasterLayout from '../../layouts/MasterLayout/MasterLayout.jsx';
import styles from './User.scss';
import Particle from '../../components/Particle/Particle.jsx';
import FileList from '../../components/FileList/FileList.jsx';
import FileTools from '../../components/FileTools/FileTools.jsx';
import Uploader from '../../components/Uploader/Uploader.jsx';
import p from '../../palette.scss';

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.dirChanged = this.dirChanged.bind(this);
        this.updateItems = this.updateItems.bind(this);
        this.doneUpdating = this.doneUpdating.bind(this);
    }

    dirChanged(e) {
        this.setState({ dir: e });
    }

    render() {
        return (
            /* <MasterLayout overflow='visible' backgroundColor={p.colorBlack}>
                <div className={styles.sideBar}>
                    <div className={styles.folderStruc}>
                        <p>Placeholder</p>
                    </div>
                    <FileTools className={styles.tools} dir = {this.state.dir} updateItems = {this.updateItems}/>
                </div>
                <div className={styles.content}>
                    <div className={styles.files}>
                        <FileList dirChanged = {this.dirChanged} needsRefresh={this.state.needsRefresh} doneUpdating = {this.doneUpdating}/>
                    </div>
                </div>
            </MasterLayout> */
            <MasterLayout>
                <div className={styles.container}>
                    <div className={styles.sideBar}>
                        <div className={styles.folderStruc}>
                            <p>Placeholder</p>
                        </div>
                        <div className={styles.upload}>
                            <Uploader dir={this.props.dir} updateItems={this.updateItems} />
                        </div>
                    </div>
                    <div className={styles.files}>
                        <div className={styles.header}>
                            <h1 className={styles.name}>Name</h1>
                            <h1 className={styles.size}>Size</h1>
                            <h1 className={styles.type}>Type</h1>
                        </div>
                        <div className={styles.fileCont}>
                            <FileList dirChanged={this.dirChanged} needsRefresh={this.state.needsRefresh} doneUpdating={this.doneUpdating} />
                        </div>
                    </div>
                </div>
            </MasterLayout>
        )
    }

    updateItems() {
        this.setState({ needsRefresh: true });
    }

    doneUpdating() {
        this.setState({ needsRefresh: false });
    }
}