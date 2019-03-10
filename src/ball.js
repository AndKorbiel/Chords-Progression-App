import React, { Component } from 'react';
import './Balls.css';

const BALLS = ['bal1', 'bal2', 'bal3', 'bal4']

class Balls extends Component {

  ballJump = () => {
      let balls = document.querySelectorAll('.ball')
      let i = 0;
      let speed = 'one'

      console.log('This props value:', this.props.BPM)

      if (this.props.BPM == 1500) {
          speed = 'one'
      }

      else if (this.props.BPM == 1716) {
        speed = 'two'
      }

      else if (this.props.BPM == 2000) {
            speed = 'three'
      }

      else if (this.props.BPM == 2180) {
            speed = 'four'
      }

      else if (this.props.BPM == 2668) {
          speed = 'five'
      }

      else if (this.props.BPM == 3000) {
          speed = 'six'
      }

      else {}

      let jump = () => {
          if (i > 0) {
              balls[i-1].classList.remove('bouncing', `${speed}`)
              balls[i].classList.add('bouncing', `${speed}`)
              i++
          }

          else if (i == balls.length) {
              balls[i].classList.remove('bouncing', `${speed}`)
              i = 0
              jump()

          }
          else {
              balls[i].classList.add('bouncing', `${speed}`)
              i++
          }

          setTimeout(jump, this.props.BPM / 4);
      }

      jump()

  }
  
  render() {
    const { BPM } = this.props;

    return (
        <div className="ball-cont">
            {BALLS.map((ball) => {
                return <div className='ball' key={ball}> </div>
            })}
        </div>
    );
  }
}

export default Balls;