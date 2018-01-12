import react from 'react';
import style from './Particles.scss';

export default class Particles extends react.Component{
    render() {
        return(
            <script src="/dist/particles.min.js"></script>
            <div id="particle-js"> 
                
            </div>
        )
    }
}