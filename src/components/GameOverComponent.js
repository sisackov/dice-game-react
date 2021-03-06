import React from 'react';
import './styles/GameOverComponent.css';
import winnerImg from '../images/winner.png';
import loserImg from '../images/loser.png';

class GameOverComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: this.props.players[this.props.winner],
            loser: this.props.players[(this.props.winner + 1) % 2],
        };
    }

    render() {
        return (
            <div className='component-container'>
                <h1>{`${this.state.winner.name} WON!!!!!!`}</h1>
                <img
                    className='game-over-image'
                    src={winnerImg}
                    alt='winner comic'
                />
                <h2>{`${this.state.loser.name} Go cry in a corner`}</h2>
                <img
                    className='game-over-image'
                    src={loserImg}
                    alt='loser comic'
                />
            </div>
        );
    }
}

export default GameOverComponent;
