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
        //console.log(e.target.files[0]);
        console.log(data);
        fetch('/upload', {
            method: 'post',
            body: data
        }).then(resp => {
            console.log(resp);
        }).catch(err => console.log(err))
    }

    render() {
        var whatever = cookie.load('connect.sid');
        console.log(whatever);
        return <input type="file" required onChange={this.handleChange} />
    }
}