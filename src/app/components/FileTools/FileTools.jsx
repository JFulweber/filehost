import React from 'react';
import styles from './FileTools.scss';
import Uploader from '../Uploader/Uploader.jsx';
import {createApolloFetch} from 'apollo-fetch';

const uri = 'http://localhost:3000/graphql';
const apolloFetch = createApolloFetch({ uri });

apolloFetch.use(({ request, options }, next) => {
    next();
});

export default class FileTools extends React.Component {

    constructor(props){
        super(props);
        this.downloadFile = this.downloadFile.bind(this);
        this.shareFile = this.shareFile.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
    }

    downloadFile(e) {
        window.open(`http://localhost:3000/filedl?token=${localStorage.getItem('token')}&path=${this.props.path}&rawName=${this.props.rawName}`);
    }

    shareFile(){
        alert("no");
    }

    deleteFile(){
        console.log("clicked");
        var query = `mutation{
            remove(path:\"${this.props.path}\" token:\"${localStorage.getItem("token")}\" name:\"${this.props.rawName}\")
        }`;
        apolloFetch({ query }).then((res) => {
            console.log(res);
            console.log('hello???')
            if(res.data.remove===true){
                this.props.updateItems();
            }
        }).catch((e)=>{
            console.log(e);
            console.log('error^^^')
        })
    }

    render(){
        return(
            <div className={styles.container}>
                <i className="fas fa-download" onClick={this.downloadFile}/>
                <i className="fas fa-share-alt" onClick={this.shareFile}/>
                <i className="far fa-trash-alt" onClick={this.deleteFile}/>
            </div>
        )
    }
}