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
        this.players = [];
        this.state = {
            displayState: DISPLAY_STATE.INITIAL,
            diceRoll: [0, 0],
            // playerOne: this.players[0],
            // playerTwo: this.players[1],
            currentPlayer: 0, // index of the player whose turn it is
            targetScore: 100, // the winning score - will be defined on new game
        };
    }

    componentDidMount() {
        this.initializeGame();
    }

    initializeGame = () => {
        console.log('initializeGame');
        this.players = [
            new PlayerObject('Player One', 0, true),
            new PlayerObject('Player Two', 0, false),
        ];
        this.setState({ displayState: DISPLAY_STATE.INITIAL });
    };

    setTargetScore = (targetScore) => {
        console.log('setTargetScore', targetScore);
        let score = parseInt(targetScore);
        if (score) {
            console.log('score is a number');
        } else {
            console.log('score is not a number');
        }
        // this.setState({ winningScore: targetScore });
    };

    renderTopBar() {
        return (
            <nav className='nav-container'>
                <ButtonComponent
                    label='New Game'
                    image='new'
                    parentClickHandler={this.initializeGame}
                />
                {this.state.displayState === DISPLAY_STATE.INITIAL ? (
                    <InputText
                        label='Target Score'
                        parentSubmitHandler={this.setTargetScore}
                        inputValidator={(text) => {
                            let score = parseInt(text);
                            return score && score > 0;
                        }}
                    />
                ) : null}
            </nav>
        );
    }

    renderMain = () => {
        return (
            <PlayerComponent player={this.players[this.state.currentPlayer]} />
        );
    };

    renderBottomBar = () => {
        return this.state.displayState === DISPLAY_STATE.PLAYING ? (
            <aside className='bottom-bar'>
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
            </aside>
        ) : null;
    };

    //TODO: add onClick handler, image to buttons
    renderContent() {
        return [this.renderTopBar(), this.renderMain(), this.renderBottomBar()];
    }

    render() {
        return <div className='app-container'>{this.renderContent()}</div>;
    }
}

export default App;
