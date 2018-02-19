import React from 'react';
import styles from './Login.scss';
import Title from '../../components/Title/Title.jsx';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

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
        console.log('submitting')
        var query = gql` mutation($UserID: String!, $Pass: String!){
            createSession(UserID:$UserID, Pass: $Pass)
        }`
        this.setState({
            loginResult: graphql(query, {
                options: {
                    variables: {
                        UserID: 'userid',
                        Pass: 'password'
                    }
                }
            })(LoginComponent)
        })
    }

    render() {
        if (this.state.loginResult == undefined) {
            console.log('yep')
            return (
                <form className={styles.loginContainer}>
                    <Title title='Login' className={styles.text}/>
                    <div className={styles.inputContainer}>
                        <input type="username" id="username" value={this.state.username} onChange={this.usernameChange} className={styles.usernameIn} placeholder="Username" />
                        <input type="password" id="password" value={this.state.pass} onChange={this.passChange} className={styles.passwordIn} placeholder="Password" />
                    </div>
                    <input type="button" id="submit" value="Login" className={styles.submit} onClick={this.submit} />
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
    render() {
        this.props.mutate().then((res)=>{
            console.log(res);
        })
        return (
        <div className={styles.loginContainer}>
            <Title title='Hello Retard'/>
        </div>
        )
    }
}