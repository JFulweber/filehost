import React from 'react';
import style from './Particles.scss';
import Part from 'react-particles-js';
import params from './ParticleSettings';

export default class Particles extends React.Component{
    render(){
        console.log(style);
        return( 
            <div className={style.divParticle}>
                <p> whats up </p>
                <Part params={params} id='particles' className={style.particles}/>
            </div>
        )
    }
}