import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

var uploadsQuery = gql`
    query{
        uploads {
            id,
            filename,
            encoding,
            mimetype,
            path
        }
    }
`

const UploadFile = ({ mutate }) => {
    const handleChange = ({ target: { validity, files: [file] } }) =>
        validity.valid &&
        mutate({
            variables: { file },
            update: (proxy, { data: { singleUpload } }) => {
                let data = undefined;
                try{
                    data = proxy.readQuery({ query: uploadsQuery });
                }
                catch(exception){
                    data = {uploads:[]};
                }
                data.uploads.push(singleUpload)
                proxy.writeQuery({ query: uploadsQuery, data })
            }
        })
    return <input type="file" required onChange={handleChange} />
}

export default graphql(gql`
    mutation($file: Upload!) {
      singleUpload(file: $file) {
        id
        filename
        encoding
        mimetype
        path
      }
    }
  `)(UploadFile)