import React from 'react';
import styles from './Login.scss';
import Title from '../../components/Title/Title.jsx';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router'
import Promise from 'bluebird';


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.username = '';
        this.state.pass = '';
        this.state.loggedIn = false;

        this.usernameChange = this.usernameChange.bind(this);
        this.passChange = this.passChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    usernameChange(event) {
        this.setState({ username: event.target.value })
    }

    passChange(event) {
        this.setState({ pass: event.target.value });
    }

    submit(e) {
        if( this.state.username==''){
            alert('Please enter a username.');
        }
        else if(this.state.pass==''){
            alert('Please enter a passwod. I swear if you made your password blank I will hurt you.');
        }
        else{
            console.log(`username :${this.state.username}`);
            console.log(`pass: ${this.state.pass}`)
            var query = gql`mutation($_usernamevar: String!, $_passvar: String!){
                createSession(username:$_usernamevar, pass: $_passvar){
                    Token
                    Username
                }
            }`;
            this.setState({
                loginResult: graphql(query, {
                    options: {
                        variables: {
                            _usernamevar: this.state.username,
                            _passvar: this.state.pass
                        }
                    }
                })(LoginComponent)
            })
        }
    }

    render() {
        if (this.state.loginResult == undefined) {
            return (
                <form className={styles.loginContainer} onSubmit={this.submit} >
                    <Title title='Login' className={styles.text} />
                    <div className={styles.inputContainer}>
                        <input type="username" id="username" value={this.state.username} onChange={this.usernameChange} className={styles.usernameIn} placeholder="Username" />
                        <input type="password" id="password" value={this.state.pass} onChange={this.passChange} className={styles.passwordIn} placeholder="Password" />
                    </div>
                    <input type="submit" id="submit" value="Login" className={styles.submit} />
                    <a href="/register" className={styles.link}>Register Here</a>
                </form>
            )
        }
        else {
            return <this.state.loginResult />;
        }
    }
}

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.props.mutate().then((res)=>{
            localStorage.setItem('username', res.data.createSession.Username);
            localStorage.setItem('token', res.data.createSession.Token);
            this.setState({username:res.data.createSession.Username})
        })
    }

    render() {
        if(this.state.username!=undefined){
            return(<Redirect to={`/user/${this.state.username}`}/>);
        }
        return(<Title title="Logging In..." className={styles.redirect}/>);
    }
}