import React from 'react';
import MasterLayout from '../../layouts/MasterLayout/MasterLayout.jsx';
import styles from './User.scss';
import Particle from '../../components/Particle/Particle.jsx';
import FileList from '../../components/FileList/FileList.jsx';
import FileTools from '../../components/FileTools/FileTools.jsx';
import p from '../../palette.scss';

export default class User extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.dirChanged = this.dirChanged.bind(this);
    }

    dirChanged(e){
        console.log(`dirChanged input:${e}`);
        console.log(`dirchanged state.dir (prechange) ${this.state.dir}`)
        this.setState({dir: e});
    }

    render() {
        return (
            <MasterLayout overflow='visible' backgroundColor={p.colorBlack}>
                <div className={styles.sideBar}>
                    <div className={styles.folderStruc}>
                        <p>Placeholder</p>
                    </div>
                    <FileTools className={styles.tools} dir = {this.state.dir}/>
                </div>
                <div className={styles.content}>
                    <div className={styles.files}>
                        <FileList dirChanged = {this.dirChanged}/>
                    </div>
                </div>
            </MasterLayout>
        )
    }
}