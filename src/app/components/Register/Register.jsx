import React from 'react';
import styles from './Register.scss';
import Title from '../../components/Title/Title.jsx';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { createApolloFetch } from 'apollo-fetch';
import p from '../../palette.scss'; 
import {IP} from '../../const';

const uri = `${IP}/graphql`;
const apolloFetch = createApolloFetch({ uri });

apolloFetch.use(({ request, options }, next) => {
    next();
});
  
export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.username = '';
        this.state.pass = '';
        this.state.email = '';
        this.state.passConf = '';
        this.state.loggedIn = false;
        this.state.style = {};
        this.state.style.borderColor = p["color4"]
        this.usernameChange = this.usernameChange.bind(this);
        this.passChange = this.passChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.passConfChange = this.passConfChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    usernameChange(event) {
        // CHECK EMAIL IN USE, CHECK USERNAME IN USE
        // @ myles: use the UsernameValid component in this.state.usernameInUse to indicate if a username is in use
        // feel free to edit the render returns for that to do whatever 
        this.setState({ username: event.target.value })
        
        var query = `query{
            user(UserID:"   ${event.target.value}"){
                _id
            }
        }`;
        var variables = {
            name: event.target.username
        }
        apolloFetch({query,variables:variables}).then((res)=>{
            if(res.data.user!=null){
                // username exists on server
                this.setState({
                    style: {
                        borderColor:"red"
                    }
                })
            }
            else{
                // username doesn't exist
                this.setState({
                    style: {
                        borderColor:p["color4"]
                    }
                })
            }
        })
    }

    passChange(event) {
        this.setState({ pass: event.target.value });
    }

    emailChange(event) {
        this.setState({ email: event.target.value });
    }

    passConfChange(event) {
        this.setState({ passConf: event.target.value });
    }

    submit(e) {
        e.preventDefault();
        if(this.state.style.borderColor != p["color4"]){
            alert("Username is in use already, please try something else.");
            return;
        }
    if (this.state.passConf == this.state.pass && this.state.pass.length != 0 && this.state.email.length != 0 && /[a-zA-Z0-9 ]*/.test(this.state.pass)) {
            var query = gql`mutation($email: String!, $username: String!, $pass: String!){
                register(email:$email, username: $username, password: $pass)
            }
            `
            this.setState({
                registerResponse: graphql(query, {
                    options: {
                        variables: {
                            email: this.state.email,
                            pass: this.state.pass,
                            username: this.state.username
                        }
                    }
                })(RegisterResponse)
            });
        }
        else{
            alert('Make sure all fields are corectly filled out and you don\'t have any non-digit or non-letter characters.');
        }
    }

    render() {
        if (this.state.registerResponse) {
            return <this.state.registerResponse />
        }
        else {
            return (
                <form className={styles.loginContainer}>
                    <Title title='Register' className={styles.text} />
                    <div className={styles.inputContainer}>
                        {this.state.usernameInUse?<this.state.usernameInUse/>:null}
                        <input type="email" id="email" value={this.state.email} onChange={this.emailChange} className={styles.passwordIn} placeholder="Email" />
                        <input type="username" id="username" value={this.state.username} onChange={this.usernameChange} className={styles.usernameIn} style = {{borderColor: this.state.style.borderColor}} placeholder="Username" />
                        <input type="password" id="password" value={this.state.pass} onChange={this.passChange} className={styles.passwordIn} placeholder="Password" />
                        <input type="password" id="passwordConf" value={this.state.passConf} onChange={this.passConfChange} className={styles.passwordIn} placeholder="Confirm Password" />
                    </div>
                    <input type="button" id="submit" value="Register" className={styles.submit} onClick={this.submit} />
                    <a href="/" className={styles.link}>Login Here</a>
                </form>
            )
        }
    }
}

class RegisterResponse extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render() {
        if(!this.state.response){
            this.props.mutate().then((res)=>{
                this.setState({response:res});
            }).catch((err)=>{
                throw err;
            })
            return <p> Loading ... </p>
        }
        else{
            if(this.state.response.data.register==true){
                return <Title title="Successfully registered" className={styles.responseText}/>
            }
            else if(this.state.response.data.register==false){
                return <Title title="Username already exists" className={styles.responseText}/>
            }
        }
    }
}

class UsernameValid extends React.Component {
    render() {
        if (this.props.data.user==null) {
            return (<p> Username is not in use </p>)
        }
        else {
            return (<p> Username is in use. </p>)
        }
    }
}