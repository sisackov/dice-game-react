import React from 'react';
import dice_1 from './images/dice-1.png';
import dice_2 from './images/dice-2.png';
import dice_3 from './images/dice-3.png';
import dice_4 from './images/dice-4.png';
import dice_5 from './images/dice-5.png';
import dice_6 from './images/dice-6.png';

class DiceComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areDiceShown: props.showDice,
            rollOne: props.roll1,
            rollTwo: props.roll2,
        };
        this.images = [dice_1, dice_2, dice_3, dice_4, dice_5, dice_6];
    }

    render() {
        return (
            <div className='dice-container'>
                <img
                    className='die-image'
                    src={this.images[this.state.rollOne]}
                    alt='First roll'
                />
                <img
                    className='die-image'
                    src={this.images[this.state.rollTwo]}
                    alt='Second roll'
                />
            </div>
        );
    }
}

export default DiceComponent;
