import React from 'react';
import styles from './Login.scss';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.username = '';
        this.state.pass = '';
        this.state.onLogin = null;

        this.usernameChange = this.usernameChange.bind(this);
        this.passChange = this.passChange.bind(this);
    }

    usernameChange(event) {
        this.setState({ username: event.target.value })
    }

    passChange(event) {
        this.setState({ pass: event.target.value });
    }
    render() {

        return (
            <div className={styles.loginContainer}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <p className={styles.username}>Username</p>
                            </td>
                            <td>
                                <input type="username" id="username" value={this.state.username} onChange={this.usernameChange} className={styles.usernameIn} placeholder="Username" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className={styles.password}>Password</p>
                            </td>
                            <td>
                                <input type="password" id="password" value={this.state.pass} onChange={this.passChange} className={styles.passwordIn} placeholder="Password" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}