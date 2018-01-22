import React from 'react';
import style from './background.scss';
import Part from '../Particles/Particles.jsx';
import params from '../Particles/ParticleSettings';

export default class ParticleBackground extends React.Component{
    render(){
        return( 
            <div>
                <Part/>
                <div className={style.foreground}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}