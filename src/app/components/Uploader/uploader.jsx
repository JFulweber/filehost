import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default class Uploader extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {};
        this.state.file = {};
    }

    handleChange(e) {
        this.setState({ file: e.target.files });
    }

    submit(e) {
        console.log(this.state.file);
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <input type="file" onChange={this.handleChange} />
                <button title="uwu" onClick={this.submit}>lol</button>
                <Thing />
            </div>
        )
    }
}



var Thing = graphql(gql`
  mutation($file: Upload!) {
    uploadFile(file: $file) {
      id
    }
  }
`)(({ mutate }) => (
        <input
            type="file"
            required
            onChange={({ target: { validity, files: [file] } }) => {
                console.log(file);
                return validity.valid && mutate({ variables: { file } })
                }
            }
        />
    ))