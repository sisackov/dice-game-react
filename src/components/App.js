import React from 'react';
import './styles/App.css';
import { PlayerObject } from '../data/PlayerObject';
import ButtonComponent from './ButtonComponent';
import PlayerComponent from './PlayerComponent';
import GameOverComponent from './GameOverComponent';
import InputText from './InputText';

const DISPLAY_STATE = {
    INITIAL: 'initial',
    PLAYING: 'playing',
    ENDED: 'ended',
};

const WINDOW_SIZE = {
    //TODO move to config
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
};

export const BAD_DICE_ROLLS = [12]; //these are the dice rolls that will reset the player's score to turn's starting score

export function getWindowWidth() {
    return window.innerWidth > 720 ? WINDOW_SIZE.LARGE : WINDOW_SIZE.SMALL;
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.players = this.getNewPlayers(2);
        this.state = {
            displayState: DISPLAY_STATE.INITIAL,
            windowWidth: getWindowWidth(),
            diceRoll: [0, 0],
            currentPlayer: 0, // index of the player whose turn it is
            targetScore: 20, // the winning score - will be defined on new game
        };
    }

    componentDidMount() {
        this.initializeGame();
    }

    getNewPlayers(numPlayers) {
        const players = [];
        for (let i = 0; i < numPlayers; i++) {
            players.push(new PlayerObject(`Player ${i + 1}`, 0, i === 0));
        }
        return players;
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
        console.log('onHoldClick');
        this.setState(() => {
            this.players[this.state.currentPlayer].isActive = false;
            const nextPlayer =
                (this.state.currentPlayer + 1) % this.players.length;
            this.players[nextPlayer].isActive = true;
            return {
                currentPlayer: nextPlayer,
                diceRoll: [0, 0],
            };
        });
        // }
    };

    handleGameOver = () => {
        this.setState({ displayState: DISPLAY_STATE.ENDED });
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
        if (this.state.displayState === DISPLAY_STATE.ENDED) {
            return (
                <GameOverComponent
                    key={'game-over-component'}
                    players={this.players}
                    winner={this.state.currentPlayer}
                />
            );
        } else if (this.state.windowWidth === WINDOW_SIZE.SMALL) {
            return (
                <PlayerComponent
                    key={`player-${currentPlayer.name}`}
                    player={currentPlayer}
                    target={this.state.targetScore}
                    rolls={this.state.diceRoll}
                    onGameOver={this.handleGameOver}
                />
            );
        } else {
            return [
                <PlayerComponent
                    key={'player-1-component'}
                    player={this.players[0]}
                    target={this.state.targetScore}
                    rolls={this.state.diceRoll}
                    onGameOver={this.handleGameOver}
                />,
                <PlayerComponent
                    key={'player-2-component'}
                    player={this.players[1]}
                    target={this.state.targetScore}
                    rolls={this.state.diceRoll}
                    onGameOver={this.handleGameOver}
                />,
            ];
        }
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
        if (getWindowWidth() === WINDOW_SIZE.LARGE) {
            return (
                <div key='main-component' className='main-container'>
                    {this.renderMain()}
                    <div className='main-fold'>
                        <nav className='nav-container'>
                            <ButtonComponent
                                label='New Game'
                                image='new'
                                parentClickHandler={this.initializeGame}
                            />
                            {this.state.displayState ===
                            DISPLAY_STATE.INITIAL ? (
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
                        {this.state.displayState === DISPLAY_STATE.PLAYING ? (
                            <div className='bottom-bar'>
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
                        ) : null}
                    </div>
                </div>
            );
        }
        return [this.renderTopBar(), this.renderMain(), this.renderBottomBar()];
    }

    render() {
        return <div className='app-container'>{this.renderContent()}</div>;
    }
}

export default App;
