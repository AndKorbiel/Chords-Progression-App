import React, { Component } from 'react';
import './radio-button.css';

class RadioButton extends Component {
    render() {

        const {buttonName, currentValue, onChange } = this.props;

        return (
                <form className="radio-option" onChange={onChange}>    
                    <span className="radio-title">{buttonName}</span>
                    <input type="radio" name="Strumming-pattern" value="down" checked={currentValue == 'down'} /> <span className="radio-val">Down</span> 
                    <input type="radio" name="Strumming-pattern" value="up" checked={currentValue == 'up'}/> <span className="radio-val">Up</span> 
                    <input type="radio" name="Strumming-pattern" value="pass" checked={currentValue == 'pass'} /> <span className="radio-val">Pass</span> 
                </form>
        )
    }
}

export default RadioButton;