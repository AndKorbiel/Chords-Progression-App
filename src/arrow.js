import React, { Component } from 'react';
import './arrows.css';

const arrowS = ['arrow1', 'arrow2', 'arrow3', 'arrow4', 'arrow5', 'arrow6', 'arrow7', 'arrow8']

class arrows extends Component {

  arrowHighlight = () => {
      let arrows = document.querySelectorAll('.arrow')
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

      let highlight = () => {
          if (i > 0) {
              arrows[i-1].classList.remove('highlight', `${speed}`)
              arrows[i].classList.add('highlight', `${speed}`)
              i++
          }

          else if (i == arrows.length) {
              arrows[i].classList.remove('highlight', `${speed}`)
              i = 0
              highlight()

          }
          else {
              arrows[i].classList.add('highlight', `${speed}`)
              i++
          }

          setTimeout(highlight, this.props.BPM / 8);
      }

      highlight()

  }
  
  render() {
    const { BPM, strummingPattern } = this.props;

    return (
        <div className="arrow-cont">
            {strummingPattern.map((element) => {
                return <div className={'arrow fas fa-arrow-'+element.value} key={element.id}> </div>
            })}
        </div>
    );
  }
}

export default arrows;