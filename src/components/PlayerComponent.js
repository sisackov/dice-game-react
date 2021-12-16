import React from 'react';
import './styles/PlayerComponent.css';
import PlayerScore from './PlayerScore';
import DiceComponent from './DiceComponent';

class PlayerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerName: this.props.playerName,
            isActive: props.isActive,
            playerScore: this.props.playerScore,
            currentRollSum: 0,
            currentRolls: props.rolls,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.rolls !== this.props.rolls) {
            const rollSum = this.props.rolls.reduce((a, b) => a + b, 0);
            this.setState({
                currentRolls: this.props.rolls,
                currentRollSum: this.state.currentRollSum + rollSum,
                playerScore: this.state.playerScore + rollSum,
            });
        }
    }

    render() {
        return (
            <div className='player-container'>
                <h2 className='player-name'>{this.state.playerName}</h2>
                <div className='player-roll'>{this.state.currentRollSum}</div>
                <DiceComponent
                    showDice={this.state.currentRollSum !== 0}
                    roll1={this.state.currentRolls[0]}
                    roll2={this.state.currentRolls[1]}
                />
                <PlayerScore label='Current' score={this.state.playerScore} />
            </div>
        );
    }
}

export default PlayerComponent;
