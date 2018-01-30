import React from 'react';
import styles from './ColorBlock.scss';

export default class ColorBlock extends React.Component{
    
    constructor(props){
        super(props);
        this.state={};
        this.state.color=this.props.color!=undefined?this.props.color:styles.ColorWhite;
        this.state.width=this.props.width!=undefined?this.props.width:styles.defWidth;
        this.state.height=this.props.height!=undefined?this.props.width:styles.defHeight;    
    }
    
    render(){
        return(
            <div style={{backgroundColor:this.props.color}}>

            </div>
        )
    }

}