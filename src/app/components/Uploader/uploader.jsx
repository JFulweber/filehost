import React from 'react';

export default class Uploader extends React.Component{
    
    constructor(props){
        super(props);
        this.props = props;
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {};
        this.state.file = {};
    }
    
    handleChange(e){
        this.setState({file:e.target.files});
    }

    submit(e){
        console.log(this.state.file);        
        e.preventDefault();
    }

    render(){
        return(
            <div>
                <input type="file" onChange={this.handleChange}/>
                <button title="uwu" onClick={this.submit}>lol</button>
            </div>
        )
    }
}