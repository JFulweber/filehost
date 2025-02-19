import React from 'react';
import styles from './FileList.scss';
import FileElement from '../../components/FileElement/FileElement.jsx';
import FileFolder from '../../components/FileFolder/FileFolder.jsx';
import { createApolloFetch } from 'apollo-fetch';
import Dropzone from 'react-dropzone';
import Promise from 'bluebird';
import {IP} from '../../const';

const apolloFetch = createApolloFetch({ uri:IP+'/graphql' });

apolloFetch.use(({ request, options }, next) => {
    next();
});

export default class FileList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.dir = '';
        this.state.files = null;
        this.state.folders = null;
        this.state.needsRefresh = this.props.needsRefresh;
        this.getItems = this.getItems.bind(this);
        this.elementClicked = this.elementClicked.bind(this);
    }

    getItems() {
        var _files = [];
        var _folders = [];
        var query = `query{
            files(path:"${this.state.dir}" token:"${localStorage.getItem("token")}"){
                name
                userRelativePath
                type
                fileSize
            }
        }`;
        apolloFetch({ query }).then((res) => {
            var i = 0;
            var files = res.data.files;
            //(files);
            files.sort((a,b)=>{return a.name.localeCompare(b.name)});
            files.forEach(file => {
                var reg = new RegExp("(?!.*?\/).*");
                var name = reg.exec(file.path)[0];
                var rawName = name;
                if (file.type == 'dir') {
                    _folders.push(<FileFolder folderName={file.name} clicked={this.elementClicked} key={++i} updateItems={this.props.updateItems}/>);
                } else {
                    var size = 0;
                    if (file.fileSize < 1000) {
                        size = file.fileSize + " B";
                    } else if (file.fileSize < 100000) {
                        size = (Math.ceil(file.fileSize / 1000)) + " KB";
                    } else if (file.fileSize < 1000000000) {
                        size = Math.ceil(file.fileSize / 1000000) + " MB";
                    } else if (file.fileSize < 1000000000000) {
                        size = Math.ceil(file.fileSize / 1000000000) + " GB";
                    } else {
                        size = undefined;
                    }
                    var type = 'File';
                    if (file.name.indexOf('.') == -1) {
                        type = 'File';
                    } else {
                        if (file.name.indexOf('.') == 0) {
                            type = file.name.substring(1);
                        }else{
                            type = file.name.substring(file.name.lastIndexOf('.')+1);
                        }
                    }
                    _files.push(<FileElement fileName={file.name.substring(0,file.name.lastIndexOf('.')==-1?file.name.length:file.name.lastIndexOf('.'))} fileSize={size} type={type} key={++i} path={this.state.dir} rawName={file.name} iconType={file.type} updateItems ={this.props.updateItems} />);
                }
            });
            if (this.state.dir != '') {
                _folders.unshift(<FileFolder folderName='..' clicked={this.elementClicked} key={++i} dir={this.state.dir} />);
            }
            if (this.state.needsRefresh == true) this.props.doneUpdating();
            this.setState({ files: _files, folders: _folders });
        })
    }

    elementClicked(s) {
        if (s != '..') {
            this.props.dirChanged(this.state.dir + "/" + s);
            this.setState({ dir: this.state.dir + "/" + s, folders: null, files: null });
        } else {
            this.props.dirChanged(this.state.dir.substring(0, this.state.dir.lastIndexOf('/')));
            this.setState({ dir: this.state.dir.substring(0, this.state.dir.lastIndexOf('/')), folders: null, files: null });
        }

    }

    componentDidMount() {
        this.getItems();
    }

    render() {
        this.state.needsRefresh = this.props.needsRefresh;
        if (this.state.files == null && this.state.files == null || this.state.needsRefresh == true) {
            this.getItems();
            return null;
        }
        return (
            <div className={styles.fileContainer}>
                {this.state.folders}
                {this.state.files}
            </div>
        )
    }
}