import React from 'react';
import cookie from 'react-cookie';

export default class Uploader extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        var data = new FormData();
        data.append('file', e.target.files[0]);
        data.append('user', 'jeff');
        //console.log(e.target.files[0]); <-- this is the file accessible
        fetch('/upload', {
            method: 'post',
            body: data
        }).then(resp => {
           // need to do anything?
        }).catch(err => {if(err) throw err})
    }

    render() {
        return <input type="file" required onChange={this.handleChange} />
    }
}