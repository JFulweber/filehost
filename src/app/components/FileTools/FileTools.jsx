import React from 'react';
import styles from './FileTools.scss';
import Uploader from '../Uploader/Uploader.jsx';
import {createApolloFetch} from 'apollo-fetch';
import {IP} from '../../const';

const apolloFetch = createApolloFetch({ uri: IP+'/graphql' });

apolloFetch.use(({ request, options }, next) => {
    next();
});

export default class FileTools extends React.Component {

    constructor(props){
        super(props);
        this.downloadFile = this.downloadFile.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
        this.generateLink = this.generateLink.bind(this);
    }

    downloadFile(e) {
        window.open(`${IP}/filedl?token=${localStorage.getItem('token')}&path=${this.props.path}&rawName=${this.props.rawName}`);
    }

    generateLink(e){
        var query = `mutation{
            generateLink(path:\"${this.props.path}\" token:\"${localStorage.getItem("token")}\" name:\"${this.props.rawName}\")
        }`;
        apolloFetch({query}).then((res)=>{
            if(res.data.generateLink){
                alert(`${IP}/f/${res.data.generateLink}`);
            }
        })
    }

    deleteFile(){
        //("clicked");
        var query = `mutation{
            remove(path:\"${this.props.path}\" token:\"${localStorage.getItem("token")}\" name:\"${this.props.rawName}\")
        }`;
        apolloFetch({ query }).then((res) => {
            //(res);
            //('hello???')
            if(res.data.remove===true){
                this.props.updateItems();
            }
        }).catch((e)=>{
            //(e);
            //('error^^^')
        })
    }

    render(){
        return(
            <div className={styles.container}>
                <i className="fas fa-download" onClick={this.downloadFile}/>
                <i className="fas fa-share-alt" onClick={this.generateLink}/>
                <i className="far fa-trash-alt" onClick={this.deleteFile}/>
            </div>
        )
    }
}