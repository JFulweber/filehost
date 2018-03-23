import React from 'react';
import styles from './FileList.scss';
import FileElement from '../../components/FileElement/FileElement.jsx';
import FileFolder from '../../components/FileFolder/FileFolder.jsx';
import { createApolloFetch } from 'apollo-fetch';

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
        this.state.items = [];
        this.getItems = this.getItems.bind(this);
    }
    componentDidMount() {
        this.getItems();
    }

    getItems() {
        var items = [];
        var query = `query{
            files(path:"${this.state.dir}" token:"${localStorage.getItem("token")}"){
                path
                type
                size
            }
        }`;
        var variables = {
            name: event.target.username
        }
        apolloFetch({ query, variables: variables }).then((res) => {
            res.data.files.forEach(file => {
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
                var reg = new RegExp("(?!.*?\/).*");
                var reg2 = new RegExp("[^\.]*");
                var name = reg.exec(file.path);
                name = reg2.exec(name);
                var type = "";
                if (file.type == "typeless") {
                    type = "File";
                } else {
                    type = file.type.substring(1);
                }
                if (file.type == "dir") {
                    items.push(<FileFolder folderName={name}/>);
                } else {
                    items.push(<FileElement fileName={name} fileSize={size} type={type} />);
                }
            })
            this.setState({ items: items });
        })
    }

    render() {
        return (
            <div className={styles.fileContainer}>
                <div className={styles.header}>
                    <h1 className={styles.name}>Name</h1>
                    <h1 className={styles.size}>Size</h1>
                    <h1 className={styles.type}>Type</h1>
                </div>
                {this.state.items}
            </div>
        )
    }
}