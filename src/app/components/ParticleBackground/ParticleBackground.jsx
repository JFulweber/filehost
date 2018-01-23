import React from 'react';
import style from './background.scss';
import Part from 'react-particles-js';
import params from '../Particles/ParticleSettings';

export default class ParticleBackground extends React.Component{
    render(){
        return( 
            <div id="container" className={style.container}>
                <div className={style.divParticle}>
                    <Part params={params} id='particles' className={style.particles} width="1920" height="1080"/>
                </div>
                <div className={style.overlay}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}