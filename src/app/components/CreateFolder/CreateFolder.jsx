import React from 'react';
import styles from './CreateFolder.scss';
import {createApolloFetch} from 'apollo-fetch';
import {IP} from '../../const';
const apolloFetch = createApolloFetch( {uri:`${IP}/graphql`} );

export default class CreateFolder extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {};
        this.state.name = ''; 
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        var query = `mutation{
            addFolder(path:"${this.props.dir}" token:"${localStorage.getItem("token")}" name:"${this.state.name.trim()==''?undefined:this.state.name}")
        }`;
        apolloFetch({ query }).then((res) => {
            if(res.data.addFolder == true){
                this.props.updateItems();
                this.setState({name:''});
            }else{ 
                
            }
        });
    }

    render(){
        return(
            <div className={styles.container}>
                <input type="text" value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}} placeholder="Don't name two folders the same thing thx"/>
                <div className={styles.button} onMouseDown={this.onClick}>
                    <p>New Folder</p>
                </div>
            </div>
        )
    }
}