import React from 'react';
import './styles/DiceComponent.css';
import dice_1 from '../images/dice-1.png';
import dice_2 from '../images/dice-2.png';
import dice_3 from '../images/dice-3.png';
import dice_4 from '../images/dice-4.png';
import dice_5 from '../images/dice-5.png';
import dice_6 from '../images/dice-6.png';
import { BAD_DICE_ROLLS } from '../data/config';

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

    componentDidUpdate(prevProps) {
        if (prevProps.showDice !== this.props.showDice) {
            this.setState({ areDiceShown: this.props.showDice });
        }
        if (prevProps.roll1 !== this.props.roll1) {
            this.setState({ rollOne: this.props.roll1 });
        }
        if (prevProps.roll2 !== this.props.roll2) {
            this.setState({ rollTwo: this.props.roll2 });
        }
    }

    render() {
        const isBadRoll = BAD_DICE_ROLLS.includes(
            this.state.rollOne + this.state.rollTwo
        );
        if (this.state.areDiceShown) {
            return (
                <div
                    className={`dice-container ${
                        isBadRoll ? 'bg-error' : 'bg-dice'
                    }`}
                >
                    <img
                        className='die-image'
                        src={this.images[this.state.rollOne - 1]}
                        alt='First roll'
                    />
                    <img
                        className='die-image'
                        src={this.images[this.state.rollTwo - 1]}
                        alt='Second roll'
                    />
                </div>
            );
        }
        return <div className='dice-container bg-dice' />;
    }
}

export default DiceComponent;
