import React from 'react';
import MasterLayout from '../../layouts/MasterLayout/MasterLayout.jsx';

export default class User extends React.Component{
    render(){
        return(
            <MasterLayout>
                <h1>{this.props.match.params.name}</h1>
            </MasterLayout>
        )
    }
}