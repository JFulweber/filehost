import React from 'react';
import style from './Home.scss';
import ParticleBackground from '../../components/ParticleBackground/ParticleBackground.jsx'

export default class Home extends React.Component {
    render() {
        return(
            <div id="home-main" className={style.Home}>
                <ParticleBackground>
                    <h1>MY NAME JEFF</h1>
                </ParticleBackground>
            </div>
        )
    }
}