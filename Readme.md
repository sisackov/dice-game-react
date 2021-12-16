# Dice game

## Pseudo code:

### The app will include the following general features:

-   PlayerObject class:
    -   name: string
    -   score: int
    -   isActive: bool

### The app will include the following Components:

-   App component that holds the whole game logic

    -   state:

        -   winningScore: int (default: 100)
        -   players: array of PlayerObjects
        -   currentPlayer: PlayerObject

    -   render:

    ```
        <div>
            <ButtonComponent value='New Game'/>
            <PlayerComponent value='Player1'/>
            <DiceComponent value='Dice'/>
            <PlayerComponent value='Player2'/>
            <ButtonComponent value='Roll Dice'/>
            <ButtonComponent value='Hold'/>
            <input type="text" value='100'/>
        </div>
    ```

    -   functions:
        -   renderPlayers: function
        -   renderCurrentPlayer: function
        -   renderRollDice: function
        -   renderNewGame: function
        -   renderWinningScore: function
        -   renderGameOver: function
        -   renderGame: function

-   Player component that holds the player's state

    -   player: PlayerObject
    -   isActive: bool
    -   currentRoll: int
    -   currentCumulativeRoll: int

    -   render:

    ```
        <div className="player">
            <div className="player-name">
                <h2>{player.name}</h2>
            </div>
            <div className="player-score">
                <h3>{currentCumulativeRoll}</h3>
            </div>
            {/*
                <div className="player-dice">
                    <h3>Dice: {player.dice}</h3>
                </div>
            */}
            <div className="player-roll">
                <h3>Current Roll</h3>
                <span>{currentRoll}</span>
            </div>
      </div>
    ```

    -   functions:
        -   checkRoll: function
        -   renderContent: function

-   Dice component that holds the dice's state

    -   state

        -   roll_1: int
        -   roll_2: int
        -   sum: int

    -   render:

        ```
            <div className=`die-image`>
                <img src={`/images/dice-${roll_1}.png`} alt="dice-1" />
            </div>
        ```

    -   functions:
        -   updateRollInParent: function
