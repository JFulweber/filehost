import p from '../../palette.scss';
let params = {};
export default params = {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 700
        }
      },
      color: {
        value: p.colorWhite
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.5,
        random: false
      },
      size: {
        value: 2,
        random: true
      },
      line_linked: {
        enable: true,
        distance: 200,
        color: p.colorWhite,
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 7,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "bubble"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 5,
          duration: 2,
          opacity: 1,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
 }
