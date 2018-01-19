import React from 'react';
import style from './background.scss';
import Part from 'react-particles-js';
import params from '../Particles/ParticleSettings';

export default class ParticleBackground extends React.Component{
    render(){
        return( 
            <div>
                <Part params={params} id='particles' className={style.background}/>
                <div className={style.foreground}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}