import React from 'react';
import new_24 from './images/new-24.png';
import new_48 from './images/new-48.png';
import hold_32 from './images/hold-32.png';
import hold_48 from './images/hold-48.png';
import dice_32 from './images/dice-32.png';
import dice_48 from './images/dice-48.png';

class ButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            btnImage: new_24,
            btnLabel: props.
        };
        this
    }

    render() {
        return (
            <div className='button-container'>
                <img
                    src={this.props.btnImage}
                    alt={this.props.btnLabel + ' image'}
                />
                <span>{this.props.btnLabel}</span>
            </div>
        );
    }
}

export default ButtonComponent;
