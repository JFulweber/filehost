import React from 'react';
import styles from './ColorBlock.scss';
import { Transform } from 'stream';

export default class ColorBlock extends React.Component{
    
    constructor(props){
        super(props);
        this.state={};
        this.state.color=this.props.color!=undefined?this.props.color:styles.ColorWhite;
        this.state.width=this.props.width!=undefined?this.props.width:styles.defWidth;
        this.state.height=this.props.height!=undefined?this.props.width:styles.defHeight;
        this.state.skew=this.props.skew!=undefined?this.props.skew:styles.defSkew;
    }
    
    render(){
        return(
            <div style={{backgroundColor:this.state.color,height:this.state.height,width:this.state.width,transform:`rotateY(${this.state.skew}`}}/>
        )
    }

}