import React from 'react';
import style from './Home.scss';
import Particle from '../../components/Particle/Particle.jsx';
import Login from '../../components/Login/Login.jsx';
import ColorBlock from '../../components/ColorBlock/ColorBlock.jsx';
import palette from '../../palette.scss';
import Title from '../../components/Title/Title.jsx';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <nav><Title/></nav>
                </header>
                <div className={style.top}>
                    <Particle/>
                    <Login/>
                </div>
            </div>
        )
        /* <div id="home-main" className={style.Home}>
                <ParticleBackground>
                    <Title/>
                    <Login/>
                    <div className={style.blocks}>
                        <ColorBlock className={style.left} color={palette.colorRed} width='100vw' height='30vh' skew='-65deg'/>
                        <ColorBlock className={style.right} color={palette.colorDarkRed} width='100vw' height='30vh' skew='65deg'/>
                    </div>
                </ParticleBackground>
            </div> */
    }
}