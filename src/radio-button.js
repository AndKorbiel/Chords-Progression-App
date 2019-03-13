import React, { Component } from 'react';
import './radio-button.css';

const RADIOBUTTONS = ['1', '1and', '2', '2and', '3', '3and', '4', '4and'];

class RadioButton extends Component {
    render() {

        const { getStrummingPattern } = this.props;

        return (
            <div className="">
                {RADIOBUTTONS.map((button) => {
                    return (
                        <form className="radio-option" key={button} onChange={e => getStrummingPattern(e, button)}>    
                            <span className="radio-title">{button}</span>
                            <input type="radio" name="Strumming-pattern" value="down" /> <span className="radio-val">Down</span> 
                            <input type="radio" name="Strumming-pattern" value="up" /> <span className="radio-val">Up</span> 
                            <input type="radio" name="Strumming-pattern" value="pass" /> <span className="radio-val">Pass</span> 
                        </form>
                    )
                })}
            </div>
        )
    }
}

export default RadioButton;