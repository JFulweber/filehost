import React from 'react';
import styles from './FileList.scss';
import FileElement from '../../components/FileElement/FileElement.jsx';
import FileFolder from '../../components/FileFolder/FileFolder.jsx';
import { createApolloFetch } from 'apollo-fetch';
import Dropzone from 'react-dropzone';

const uri = 'http://localhost:3000/graphql';
const apolloFetch = createApolloFetch({ uri });

apolloFetch.use(({ request, options }, next) => {
    next();
});

export default class FileList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.dir = '/';
        this.state.files = null;
        this.state.folders = null;
        this.getItems = this.getItems.bind(this);
        this.elementClicked = this.elementClicked.bind(this);
    }

    getItems() {
        var _files = [];
        var _folders = [];
        var query = `query{
            files(path:"${this.state.dir}" token:"${localStorage.getItem("token")}"){
                path
                type
                size
            }
        }`;
        apolloFetch({ query }).then((res) => {
            var i = 0;
            res.data.files.forEach(file => {
                var reg = new RegExp("(?!.*?\/).*");
                var name = reg.exec(file.path)[0];
                if (file.type == 'dir') {
                    _folders.push(<FileFolder folderName={name} clicked={this.elementClicked} key={++i} />);
                } else {
                    var reg2 = new RegExp("[^\.]*");
                    name = reg2.exec(name)[0];
                    var size = 0;
                    if (file.size < 1000) {
                        size = file.size + " B";
                    } else if (file.size < 1000000) {
                        size = (Math.ceil(file.size / 1000)) + " KB";
                    } else if (file.size < 1000000000) {
                        size = Math.ceil(file.size / 1000000) + " MB";
                    } else if (file.size < 1000000000000) {
                        size = Math.ceil(file.size / 1000000000) + " GB";
                    } else {
                        size = undefined;
                    }
                    var type = 'File';
                    if (file.type != 'File') {
                        type = file.type.substring(1);
                    }
                    _files.push(<FileElement fileName={name} fileSize={size} type={type} key={++i} />);
                }
            });
            if (this.state.dir != '/') {
                _folders.unshift(<FileFolder folderName='..' clicked={this.elementClicked} key={++i} />);
            }
            this.setState({ files: _files, folders: _folders });
        });
    }

    elementClicked(s) {
        if (s != '..'){
            this.setState({ dir: this.state.dir + "/" + s, folders: null, files: null });
        }else{
            this.setState({ dir: this.state.dir.substring(0, this.state.dir.lastIndexOf('/')), folders: null, files: null });
        }
    }

    componentDidMount() {
        this.getItems();
    }

    render() {
        if (this.state.files == null && this.state.files == null) this.getItems();
        return (
            <div className={styles.fileContainer}>
                <div className={styles.header}>
                    <h1 className={styles.name}>Name</h1>
                    <h1 className={styles.size}>Size</h1>
                    <h1 className={styles.type}>Type</h1>
                </div>
                {this.state.folders}
                {this.state.files}
            </div>
        )
    }
}