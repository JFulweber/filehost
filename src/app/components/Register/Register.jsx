import React from 'react';
import styles from './Register.scss';
import Title from '../../components/Title/Title.jsx';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.username = '';
        this.state.pass = '';
        this.state.email = '';
        this.state.passConf = '';
        this.state.loggedIn = false;

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
        var checkQuery = gql`query($UserID:String!){
            user(UserID:$UserID)
        }`;
        this.setState({
            usernameInUse: graphql(checkQuery, {
                options: {
                    variables: {
                        UserID: this.state.username
                    }
                }
            })(UsernameValid)
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
        if (this.state.passConf == this.state.pass) {
            var query = gql`mutation($email: String!, $username: String!, $pass: String!){
                register(email:$email, username: $username, pass: $pass)
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
                        <input type="email" id="email" value={this.state.email} onChange={this.emailChange} className={styles.passwordIn} placeholder="Email" />
                        <input type="username" id="username" value={this.state.username} onChange={this.usernameChange} className={styles.usernameIn} placeholder="Username" />
                        <input type="password" id="password" value={this.state.pass} onChange={this.passChange} className={styles.passwordIn} placeholder="Password" />
                        <input type="passwordConf" id="passwordConf" value={this.state.passConf} onChange={this.passConfChange} className={styles.passwordIn} placeholder="Confirm Password" />
                    </div>
                    <input type="button" id="submit" value="Register" className={styles.submit} onClick={this.submit} />
                    <a href="/" className={styles.link}>Login Here</a>
                </form>
            )
        }
    }
}

class RegisterResponse extends React.Component {
    render() {
        if (this.props.data.status == "success") {
            return (<p> You're registered reatard </p>)
        }
    }
}

class UsernameValid extends React.Component {
    render() {
        if (this.props.data.usernameInUse == true) {
            console.log('youre good');
            return (<p> yep you good </p>)
        }
        else {
            console.log('username in use');
            return (<p> nope youre not good friend </p>)
        }
    }
}