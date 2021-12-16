import React from 'react';
import './styles/App.css';
import { PlayerObject } from '../data/PlayerObject';
import ButtonComponent from './ButtonComponent';
import PlayerComponent from './PlayerComponent';
import InputText from './InputText';

const DISPLAY_STATE = {
    INITIAL: 'initial',
    PLAYING: 'playing',
    ENDED: 'ended',
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.players = this.getNewPlayers(2);
        this.state = {
            displayState: DISPLAY_STATE.INITIAL,
            diceRoll: [0, 0],
            currentPlayer: 0, // index of the player whose turn it is
            targetScore: 100, // the winning score - will be defined on new game
        };
    }

    getNewPlayers(numPlayers) {
        const players = [];
        for (let i = 0; i < numPlayers; i++) {
            players.push(new PlayerObject(`Player ${i + 1}`, 0, i === 0));
        }
        return players;
    }

    componentDidMount() {
        this.initializeGame();
    }

    initializeGame = (e) => {
        console.log('initializeGame');
        if (e) {
            this.players = this.getNewPlayers(2);
        }
        this.setState({ displayState: DISPLAY_STATE.PLAYING }); //TODO set back to Initial
    };

    setTargetScore = (score) => {
        this.setState(() => {
            return { targetScore: score, displayState: DISPLAY_STATE.PLAYING };
        });
    };

    rollDice = () => {
        const diceRoll = [
            Math.floor(Math.random() * 6) + 1,
            Math.floor(Math.random() * 6) + 1,
        ];
        this.setState(() => {
            return { diceRoll: diceRoll };
        });
    };

    onHoldClick = () => {
        const { currentPlayer, targetScore } = this.state;
        if (this.players[currentPlayer].score > targetScore) {
            //game over  TODO: add game over screen
            this.setState({ displayState: DISPLAY_STATE.ENDED });
        } else {
            this.setState(() => {
                return {
                    currentPlayer: (currentPlayer + 1) % this.players.length,
                    diceRoll: [0, 0],
                };
            });
        }
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
        const currentPlayer = this.players[this.state.currentPlayer];
        return (
            <PlayerComponent
                key={`player-${currentPlayer.name}`}
                player={currentPlayer}
                target={this.state.targetScore}
                rolls={this.state.diceRoll}
            />
        );
    };

    renderBottomBar = () => {
        return this.state.displayState === DISPLAY_STATE.PLAYING ? (
            <div key='bottom-bar' className='bottom-bar mb-1'>
                <ButtonComponent
                    label='Roll Dice'
                    image='dice'
                    parentClickHandler={this.rollDice}
                />
                <ButtonComponent
                    label='Hold'
                    image='hold'
                    parentClickHandler={this.onHoldClick}
                />
            </div>
        ) : null;
    };

    renderContent() {
        return [this.renderTopBar(), this.renderMain(), this.renderBottomBar()];
    }

    render() {
        return <div className='app-container'>{this.renderContent()}</div>;
    }
}

export default App;
