import React from 'react';
import style from './Particles.scss';
import Part from 'react-particles-js';

export default class Particles extends React.Component{
    render(){
        var par = {
            particles: {
                line_linked: {
                    shadow: {
                        enable: true,
                        color: "#3CA9D1",
                        blur: 5
                    }
                }
            }
        }
        return( 
            <Part params={par} id='particles' className={style.particles}/>
        )
    }
}