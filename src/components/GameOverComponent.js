import React from 'react';
import './styles/GameOverComponent.css';

class GameOverComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: this.props.players[this.props.winner],
            loser: this.props.loser[(this.props.winner + 1) % 2],
        };
    }

    render() {
        return (
            <div className='component-container'>
                <h1>{`${this.state.winner.name} WON!!!!!!`}</h1>
                <div className='win-image'>Yayy</div>
                <h2>{`${this.state.loser.name} Go cry in a corner`}</h2>
            </div>
        );
    }
}

export default GameOverComponent;
