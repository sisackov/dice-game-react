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
        this.setState({ displayState: DISPLAY_STATE.PLAYING }); //TODO set back to Initial
    };

    setTargetScore = (score) => {
        this.setState(() => {
            return { targetScore: score, displayState: DISPLAY_STATE.PLAYING };
        });
    };

    renderTopBar() {
        return (
            <nav key='top-navbar' className='nav-container'>
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
            <PlayerComponent
                player={this.players[this.state.currentPlayer]}
                rolls={[0, 0]}
            />
        );
    };

    renderBottomBar = () => {
        return this.state.displayState === DISPLAY_STATE.PLAYING ? (
            <div className='bottom-bar'>
                <ButtonComponent
                    label='Roll Dice'
                    image='dice'
                    onClick={this.rollDice}
                />
                <ButtonComponent
                    label='Hold'
                    image='hold'
                    onClick={this.hold}
                />
            </div>
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
