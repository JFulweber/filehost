import React from 'react';
import style from './Home.scss';
import ParticleBackground from '../../components/ParticleBackground/ParticleBackground.jsx';    
import Login from '../../components/Login/Login.jsx';
import ColorBlock from '../../components/ColorBlock/ColorBlock.jsx';
import palette from '../../palette.scss'; 

export default class Home extends React.Component {
    render() {
        return(
            <div id="home-main" className={style.Home}>
                <ParticleBackground>
                    <Login/>
                    <div>
                        <ColorBlock color={palette.colorWhite}/>
                        <ColorBlock color={palette.colorWhite}/>
                    </div>
                </ParticleBackground>
            </div>
        )
    }
}