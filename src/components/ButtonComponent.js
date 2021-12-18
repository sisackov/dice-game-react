import React from 'react';
import './styles/ButtonComponent.css';
import new_24 from '../images/new-24.png';
import new_48 from '../images/new-48.png';
import hold_32 from '../images/hold-32.png';
import hold_48 from '../images/hold-48.png';
import dice_32 from '../images/dice-32.png';
import dice_48 from '../images/dice-48.png';
import { getWindowWidth } from '../data/config';

class ButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.images = {
            new_small: new_24,
            new_large: new_48,
            hold_small: hold_32,
            hold_large: hold_48,
            dice_small: dice_32,
            dice_large: dice_48,
        };
        const size = getWindowWidth();
        this.state = {
            size: size,
            btnImage: this.images[`${this.props.image}_${size}`],
            btnLabel: props.label,
        };
    }

    render() {
        return (
            <button
                className='button-container'
                onClick={(e) => {
                    this.props.parentClickHandler(e);
                }}
            >
                <img
                    className={`button-image--${this.state.size}`}
                    src={this.state.btnImage}
                    alt={this.state.btnLabel}
                />
                <span className='button-label'>{this.state.btnLabel}</span>
            </button>
        );
    }
}

export default ButtonComponent;
