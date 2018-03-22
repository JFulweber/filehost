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
    //(?<="Username":").+?(?=")
    componentDidMount() {
        this.getItems();
    }

    getItems() {
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
                console.log(size);
            })
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