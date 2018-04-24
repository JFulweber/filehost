import React from 'react';
import MasterLayout from '../../layouts/MasterLayout/MasterLayout.jsx';
import styles from './User.scss';
import Particle from '../../components/Particle/Particle.jsx';
import FileList from '../../components/FileList/FileList.jsx';
import FileTools from '../../components/FileTools/FileTools.jsx';
import Uploader from '../../components/Uploader/Uploader.jsx';
import FolderStructure from '../../components/FolderStructure/FolderStructure.jsx';
import CreateFolder from '../../components/CreateFolder/CreateFolder.jsx';
import p from '../../palette.scss';
import {createApolloFetch} from 'apollo-fetch';
import {IP} from '../../const';
import gql from 'graphql-tag';
const apolloFetch = createApolloFetch( {uri:`${IP}/graphql`} );

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.dirChanged = this.dirChanged.bind(this);
        this.updateItems = this.updateItems.bind(this);
        this.doneUpdating = this.doneUpdating.bind(this);
    }

    render() {
        return (
            <MasterLayout>
                <div className={styles.container}>
                    <div className={styles.sideBar}>
                        <div className={styles.folderStruc}>
                            <CreateFolder updateItems={this.updateItems}/>
                            <input type="button" value="Third Party API Key" onClick={(e)=>{
                                e.preventDefault();
                                var query = `query{
                                    getApiKey(token:"${localStorage.getItem('token')}")
                                }`
                                apolloFetch({query}).then((res)=>{
                                    if(res.data.getApiKey !== 'null' || res.data.getApiKey !== 'undefined'){
                                        alert(`Do NOT share your API key with anyone. Use it for third party use: ${res.data.getApiKey}`)
                                    }
                                })
                            }}/>
                            <FolderStructure />
                        </div>
                        <div className={styles.upload}>
                            <Uploader dir={this.state.dir} updateItems={this.updateItems} />
                        </div>
                    </div>
                    <div className={styles.files}>
                        <div className={styles.header}>
                            <h1 className={styles.name}>Name</h1>
                            <h1 className={styles.size}>Size</h1>
                            <h1 className={styles.type}>Type</h1>
                        </div>
                        <div className={styles.fileCont}>
                            <FileList dirChanged={this.dirChanged} needsRefresh={this.state.needsRefresh} doneUpdating={this.doneUpdating} updateItems={this.updateItems} />
                        </div>
                    </div>
                </div>
            </MasterLayout>
        )
    }

    dirChanged(e) {
        this.setState({ dir: e });
    }

    updateItems() {
        this.setState({ needsRefresh: true });
    }

    doneUpdating() {
        this.setState({ needsRefresh: false });
    }
}