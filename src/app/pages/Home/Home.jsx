import React from 'react';
import styles from './Home.scss';
import Particle from '../../components/Particle/Particle.jsx';
import Login from '../../components/Login/Login.jsx';
import MasterLayout from '../../layouts/MasterLayout/MasterLayout.jsx';
import Title from '../../components/Title/Title.jsx';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router';

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};
        this.state.redirect = "huuuuaaa";
    }

    componentDidMount() {
        if (localStorage.getItem("token")) {
            var query = gql`query($token: String!){
                authenticate(token: $token)
            }`
            console.log('pre-graphql call');
            var gqlcomp = graphql(query, {
                options: {
                    variables: {
                        token: localStorage.getItem('token')
                    }
                }
            })(RedirectComponent)
            this.setState({ redirect: gqlcomp });
        }
    }

    render() {
        if (this.state.redirect!="huuuuaaa") {
            console.log('am i the intermediate???? tf');
            console.log(this.state.redirect);
            return (
                <MasterLayout overflow='hidden'>
                    <div className={styles.top}>
                        <Particle /> 
                        <this.state.redirect/>
                    </div>
                    <div className={styles.placeholder}>
                    </div>
                </MasterLayout>
            )
        }
        console.log('zozzle copter lol');
        return (
            <MasterLayout overflow='hidden'>
                <div className={styles.top}>
                    <Particle />
                    <Login />
                </div>
                <div className={styles.placeholder}>
                </div>
            </MasterLayout>
        )
    }
}

class RedirectComponent extends React.Component {
    render() {
        console.log('have i been made');
        console.log(this.props);
        console.log('^ thats my data budddy')
        console.log(this.props.data);
        if(this.props.data.loading == 1){
            console.log('loadin...')
        }
        else{
            console.log('LOADED');
            console.log(this.props.data);
        }
        if(this.props.data.authenticate==false){
            localStorage.clear("token")
            return <Redirect to= "logout"/>
        }
        return (
            <Redirect to = {"user/"+localStorage.getItem('username')}/>
        )
    }
}