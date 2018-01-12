import react from 'react';
import style from './Particles.scss';
import Part from 'react-particles-js';

export default class Particles extends react.Component{
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
            <Part params={par} />
        )
    }
}