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
                console.log(singleUpload)
                let data = undefined;
                try{
                    data = proxy.readQuery({ query: uploadsQuery });
                }
                catch(exception){
                    console.log(exception)
                    data = {uploads:[]};
                }
                console.log('did I hit this?');
                data.uploads.push(singleUpload)
                console.log(data)
                proxy.writeQuery({ query: uploadsQuery, data })
                console.log('idk here lol')
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