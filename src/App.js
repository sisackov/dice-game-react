import { render } from "react-dom"


PlayerComponent = {
  state = {
    player: playerObject, 
    // showDice: true,
    isActive: true,
    currentRoll: 0,
    currentCumulativeRoll: 0,
  }


 render = () => {
    const { player, isActive, currentRoll, currentCumulativeRoll } = this.state;
    return (
      <div className="player">
        <div className="player-name">
          <h2>{player.name}</h2>
        </div>
        <div className="player-score">
          <h3>{currentCumulativeRoll}</h3>
        </div>
        {/* <div className="player-dice">
          <h3>Dice: {player.dice}</h3>
        </div> */}
        <div className="player-roll">
          <h3>Current Roll: {currentRoll}</h3>
        </div>
        <div className="player-cumulative-roll">
          <h3>Cumulative Roll: {currentCumulativeRoll}</h3>
        </div>
      </div>
    );
  }
}


DiceComponent = {
  state = {
    roll_1: 0,
    roll_2: 0,
    sum: 0,
  }
}

ButtonComponent = {
  //see homework for button component
}

App = {
  state = {
    winningScore: 100,
    currentPlayer: playerObject,
    players:[playerObject1, playerObject2],
  }

  render => {
    return (
      <div>
        <ButtonComponent value='New Game'/>
        <PlayerComponent value='Player1'/>
        <DiceComponent value='Dice'/>
        <PlayerComponent value='Player2'/>
        <ButtonComponent value='Roll Dice'/>
        <ButtonComponent value='Hold'/>
        <input type="text" value='100'/>
      </div>
    )
  }
}


playerObject = {
  name: '',
  score: 0,
  isActive: true,
}