# Dice game

My first React app!

## Netlify

https://dice-game-sisackov.netlify.app/

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
        -   currentPlayer: PlayerObject / index in players array
        -   currentRoll: int

    -   render:

    ```
        <div>
            <ButtonComponent value='New Game'/>
            <PlayerComponent value='Player1' propPlayer={PlayerObject}/>
            <DiceComponent value='Dice'/>
            <PlayerComponent value='Player2' propPlayer={PlayerObject}/>
            <ButtonComponent value='Roll Dice'/>
            <ButtonComponent value='Hold'/>
            <input type="text" value='100'/>
        </div>
    ```

    -   functions:
        -   renderGame: function
        -   renderRollDice: function
        -   renderNewGame: function
        -   renderGameOver: function
        -   onHoldClick: function -> saves the current player's score and switches to the next player(changes state's currentPlayer)

-   Player component that holds the player's state

    -   state:

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

## Time management: total ~ 18 hours

|       Task       | Estimated Time |
| :--------------: | :------------: |
|   Pseudo Code    |   2.5 hours    |
|    Components    |
|    renderGame    |     1 hour     |
|  renderRollDice  |    1.5 hour    |
|  renderNewGame   |    0.5 hour    |
|  renderGameOver  |    0.5 hour    |
|   onHoldClick    |    0.5 hour    |
| Components Total |    4 hours     |
|     Styling      |   5-6 hours    |
|     Testing      |    2 hours     |
|    Deployment    |   0.5 hours    |
