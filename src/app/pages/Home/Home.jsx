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
                    <div className={style.blocks}>
                        <ColorBlock className={style.left} color={palette.colorWhite} width='40px' height='40px' skew='20deg'/>
                        <ColorBlock className={style.right} color={palette.colorWhite} width='40px' height='40px' skew='20deg'/>
                    </div>
                </ParticleBackground>
            </div>
        )
    }
}