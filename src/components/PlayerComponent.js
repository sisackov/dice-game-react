import React from 'react';
import './styles/PlayerComponent.css';
import PlayerScore from './PlayerScore';
import DiceComponent from './DiceComponent';

class PlayerComponent extends React.Component {
    constructor(props) {
        super(props);
        const player = this.props.player;
        this.state = {
            playerName: player.name,
            isActive: player.isActive,
            playerScore: player.score,
            currentRollSum: 0,
            currentRolls: props.rolls,
        };
        this.targetScore = props.target;
        this.initialScore = player.score;
        this.playerObj = player;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.rolls !== this.props.rolls) {
            const rollSum = this.props.rolls.reduce((a, b) => a + b);
            if (rollSum === 12) {
                // rolled 6-6 -> resets the score to the initial value
                this.playerObj.score = this.initialScore;
                this.setState({
                    currentRolls: this.props.rolls,
                    currentRollSum: 0,
                    playerScore: this.initialScore,
                });
            } else {
                this.setState(() => {
                    this.playerObj.updateScore(rollSum);
                    if (this.playerObj.score >= this.targetScore) {
                        //TODO: end game
                    }
                    return {
                        currentRolls: this.props.rolls,
                        currentRollSum: this.state.currentRollSum + rollSum,
                        playerScore: this.state.playerScore + rollSum,
                    };
                });
            }
        }
    }

    render() {
        return (
            <div className={`player-container`}>
                <h2 className='player-name'>{this.state.playerName}</h2>
                <div className='player-roll'>{this.state.currentRollSum}</div>
                <DiceComponent
                    showDice={this.state.currentRolls[0] !== 0}
                    roll1={this.state.currentRolls[0]}
                    roll2={this.state.currentRolls[1]}
                />
                <PlayerScore
                    label='Current Score'
                    score={this.state.playerScore}
                />
            </div>
        );
    }
}

export default PlayerComponent;
