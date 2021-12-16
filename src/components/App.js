import React from 'react';
import { PlayerObject } from '../data/PlayerObject';
import ButtonComponent from './ButtonComponent';
import PlayerComponent from './PlayerScore';
import InputText from './InputText';

const DISPLAY_STATE = {
    INITIAL: 'initial',
    PLAYING: 'playing',
    ENDED: 'ended',
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.players = [
            new PlayerObject('Player One', 0, true),
            new PlayerObject('Player Two', 0, false),
        ];
        this.state = {
            displayState: 'start',
            diceRoll: [0, 0],
            playerOne: this.players[0],
            playerTwo: this.players[1],
            currentPlayer: 0, // index of the player whose turn it is
            winningScore: 100, // the winning score - will be defined on new game
        };
    }

    //TODO: add onClick handler, image to buttons
    renderContent() {
        if (this.state.displayState === DISPLAY_STATE.INITIAL) {
            return [
                <nav className='nav-container'>
                    <ButtonComponent
                        label='New Game'
                        image='new'
                        parentClickHandler={this.initializeGame}
                    />
                    <InputText
                        label='Target Score'
                        onSubmit={this.setWinningScore}
                    />
                </nav>,
                <PlayerComponent player={this.state.playerOne} />,
                <aside className='buttons-container'>
                    <ButtonComponent
                        label='Roll Dice'
                        image='dice'
                        parentClickHandler={this.handleRollDice}
                    />
                    <ButtonComponent
                        label='Hold'
                        image='hold'
                        parentClickHandler={this.handleHoldClick}
                    />
                </aside>,
            ];
        } else if (this.state.displayState === DISPLAY_STATE.PLAYING) {
            return [
                <PlayerComponent player={this.state.playerOne} />,
                <aside className='buttons-container'>
                    <ButtonComponent
                        btnLabel='Roll Dice'
                        btnImage='images/roll.png'
                        onClick={this.rollDice}
                    />
                    <ButtonComponent
                        btnLabel='Hold'
                        btnImage='images/hold.png'
                        onClick={this.hold}
                    />
                </aside>,
            ];
        } else if (this.state.displayState === DISPLAY_STATE.ENDED) {
            return [
                <PlayerComponent player={this.state.playerOne} />,
                <PlayerComponent player={this.state.playerTwo} />,
                <nav className='nav-container'>
                    <ButtonComponent
                        btnLabel='New Game'
                        btnImage='images/new-game.png'
                        onClick={this.newGame}
                    />
                </nav>,
            ];
        }
    }

    render() {
        return <div className='app-container'>{this.renderContent()}</div>;
    }
}

export default App;
