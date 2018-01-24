import React from 'react';
import styles from './Login.scss';

export default class Login extends React.Component{
 render(){
     return(
         <div className={styles.loginContainer}>
             <p className={styles.username}>Username</p>
             <input type="Username" value="" className={styles.usernameIn} placeholder="Username"/>
             <p className={styles.password}>Password</p>
         </div>
     )
 }
}