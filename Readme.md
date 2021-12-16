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
    -   name: string
    -   score: int
