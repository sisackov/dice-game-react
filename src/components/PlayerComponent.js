import React from 'react';
import PlayerScore from './PlayerScore';
import DiceComponent from './DiceComponent';

class PlayerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: props.player,
            isActive: props.isActive,
            currentRollSum: 0,
            currentScore: props.player.score,
            currentRolls: props.rolls,
            rollHappened: false,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.rolls !== this.props.rolls) {
            const rollSum = this.props.rolls.reduce((a, b) => a + b, 0);
            this.setState({
                currentRolls: this.props.rolls,
                currentRollSum: rollSum,
                rollHappened: rollSum !== 0,
            });
        }
    }

    render() {
        return (
            <div className='player-container'>
                <div className='player-name'>{this.state.player.name}</div>
                <div className='player-roll'>{this.state.currentRollSum}</div>
                <DiceComponent
                    showDice={this.state.rollHappened}
                    roll1={this.state.currentRolls[0]}
                    roll2={this.state.currentRolls[1]}
                />
                <PlayerScore label='Current' score={this.state.currentScore} />
            </div>
        );
    }
}

export default PlayerComponent;
