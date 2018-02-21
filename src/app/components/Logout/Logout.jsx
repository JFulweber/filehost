import React from 'react';
import MasterLayout from '../../layouts/MasterLayout/MasterLayout.jsx';
import Title from '../../components/Title/Title.jsx';
import styles from './Logout.scss';

export default class Logout extends React.Component {
    render() {
        console.log('beep beep img a sheep :)')
        return (
            <MasterLayout>
                <Title title='LogginG Out..' />
            </MasterLayout>
        )
    }
}