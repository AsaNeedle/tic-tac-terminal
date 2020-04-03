// return position of best possible move 
const perfectMove = function(){
  let bestmove = [null, -2]
  for(let i in emptyFields(curGameState)){
    nextGameState = curGameState.slice()
    nextGameState[i] = "O"
    score = checkForWin(nextGameState)
    if(score > bestmove[1]){
      bestmove[0] = i
      bestmove[1] = score
    }
  }
  if(bestmove[0] != null){
    return bestmove
  }
}
const computerMove = function(curGameState, newFieldState, gameImage, getRandomVal, emptyFields){
  
  // let pos = getRandomVal(emptyFields(curGameState))
  curGameState[pos] = newFieldState
  if (newFieldState === "X"){
    newFieldState = "O"
  } else if (newFieldState === "O"){
    newFieldState = "X"
  }
  console.log(gameImage(curGameState))
}

module.exports = {
  computerMove: computerMove
};