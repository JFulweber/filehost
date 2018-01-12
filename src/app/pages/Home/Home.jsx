import React from 'react';
import style from './Home.scss';
import Particles from '../../components/Particles/Particles.jsx';

export default class home extends React.Component {
    render() {
        return(
            <div id="home-main" className={style.Home}>
                <Particles/>
            </div>
        )
    }
}