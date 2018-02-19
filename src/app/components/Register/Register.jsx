import React from 'react';
import styles from './Register.scss';
import Title from '../../components/Title/Title.jsx';

export default class extends React.Component {
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
        this.submit = this.submit.bind(this);
    }

    usernameChange(event) {
        this.setState({ username: event.target.value })
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
        console.log('Lol fix this B later')
    }

    render() {
        return (
            <form className={styles.loginContainer}>
                <Title title='Register' />
                <div className={styles.inputContainer}>
                    <input type="email" id="email" value={this.state.email} onChange={this.emailChange} className={styles.passwordIn} placeholder="Email" />
                    <input type="username" id="username" value={this.state.username} onChange={this.usernameChange} className={styles.usernameIn} placeholder="Username" />
                    <input type="password" id="password" value={this.state.pass} onChange={this.passChange} className={styles.passwordIn} placeholder="Password" />
                    <input type="passwordConf" id="passwordConf" value={this.state.passConf} onChange={this.passConfChange} className={styles.passwordIn} placeholder="Confirm Password" />
                </div>
                <input type="button" id="submit" value="Register" className={styles.submit} onClick={this.submit} />
            </form>
        )
    }
}
