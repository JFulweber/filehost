import React from 'react';

export default class Uploader extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log(e.target.files[0]);
        fetch('/upload',{
            method: 'post',
            body: e.target.files[0]
        }).then(resp=>{
            console.log(resp);
        }).catch(err=> console.log(err))
    }

    render() {
        return <input type="file" required onChange={this.handleChange} />
    }
}