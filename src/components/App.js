import React from 'react';
import './styles/App.css';
import { PlayerObject } from '../data/PlayerObject';
import {
    getRandomInRange,
    getWindowWidth,
    WINDOW_SIZE,
    NUM_OF_PLAYERS,
} from '../data/config';
import ButtonComponent from './ButtonComponent';
import PlayerComponent from './PlayerComponent';
import GameOverComponent from './GameOverComponent';
import InputText from './InputText';
import PlayerScore from './PlayerScore';

const DISPLAY_STATE = {
    INITIAL: 'initial',
    PLAYING: 'playing',
    ENDED: 'ended',
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.players = this.getNewPlayers();
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

    getNewPlayers() {
        const players = [];
        for (let i = 0; i < NUM_OF_PLAYERS; i++) {
            players.push(new PlayerObject(`Player ${i + 1}`, 0, i === 0));
        }
        return players;
    }

    initializeGame = (targetScore) => {
        const newTargetScore = parseInt(targetScore);
        if (isNaN(newTargetScore)) {
            this.setState({
                displayState: DISPLAY_STATE.INITIAL,
                diceRoll: [0, 0],
                currentPlayer: 0,
            });
        } else {
            this.players = this.getNewPlayers(2);
            this.setState({
                displayState: DISPLAY_STATE.PLAYING,
                targetScore: targetScore,
                diceRoll: [0, 0],
                currentPlayer: 0,
            });
        }
    };

    rollDice = () => {
        const diceRoll = [getRandomInRange(), getRandomInRange()];
        this.setState(() => {
            return { diceRoll: diceRoll };
        });
    };

    getNextPlayer = (player) => {
        return (player + 1) % NUM_OF_PLAYERS;
    };

    onHoldClick = () => {
        this.setState(() => {
            this.players[this.state.currentPlayer].isActive = false;
            const nextPlayer = this.getNextPlayer(this.state.currentPlayer);
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
                        parentSubmitHandler={this.initializeGame}
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
        const otherPlayer =
            this.players[this.getNextPlayer(this.state.currentPlayer)];
        if (this.state.displayState === DISPLAY_STATE.INITIAL) {
            return <div key='main-component' className='main-container'></div>;
        } else if (this.state.displayState === DISPLAY_STATE.ENDED) {
            return (
                <GameOverComponent
                    key={'game-over-component'}
                    players={this.players}
                    winner={this.state.currentPlayer}
                />
            );
        } else if (this.state.windowWidth === WINDOW_SIZE.SMALL) {
            return (
                <div key='main-component' className='main-container'>
                    <PlayerScore
                        isMain={true}
                        label={otherPlayer.name}
                        score={otherPlayer.score}
                    />
                    <PlayerComponent
                        key={`player-${currentPlayer.name}`}
                        player={currentPlayer}
                        target={this.state.targetScore}
                        rolls={this.state.diceRoll}
                        onGameOver={this.handleGameOver}
                    />
                </div>
            );
        } else {
            let [left, right] = [0, 1];
            if (NUM_OF_PLAYERS > 2) {
                left = this.state.currentPlayer;
                right = this.getNextPlayer(left);
            }
            return [
                <PlayerComponent
                    key={`player-${left}-component`}
                    player={this.players[left]}
                    target={this.state.targetScore}
                    rolls={this.state.diceRoll}
                    onGameOver={this.handleGameOver}
                />,
                <PlayerComponent
                    key={`player-${right}-component`}
                    player={this.players[right]}
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
                                    parentSubmitHandler={this.initializeGame}
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
