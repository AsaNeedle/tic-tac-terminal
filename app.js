const helpers = require("./helpers")
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// listens to keystrokes
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else if (0 < parseInt(str) && parseInt(str) < 10){
    let curPos = parseInt(str) - 1
    if (curGameState[curPos] === " "){
      curGameState[curPos] = newFieldState
      if (newFieldState === "X"){
        newFieldState = "O"
      } else if (newFieldState === "O"){
        newFieldState = "X"
      }
      console.log(gameImage(curGameState))
      let winMessage = checkForWin()
      if (!!winMessage){
        console.log(winMessage)
      } else {
        helpers.computerMove(curGameState, newFieldState, gameImage, getRandomVal, emptyFields)
        let winMessage = checkForWin()
        if (!!winMessage){
          console.log(winMessage)
        }
      }
    } else {
      console.log("Someone already moved there!")
    }
  }
});

const checkForWin = function(){
  let rows = getRows(curGameState)
  let columns = getColumns(curGameState)
  let diags = getDiags(curGameState)
  let hasWon = isWinState(rows, columns, diags)
  if (hasWon !== null){
    return `The ${hasWon} team has been victorious!`
  } else {
    return false
  }
}

// take gamestate => list of indexes
const emptyFields = function(gs){
  console.log(gs)
  let emptyFieldArr = []
  for (let field in gs){
    let curField = gs[field]
    if (curField === " "){
      emptyFieldArr.push(parseInt(field))
    }
  }
  console.log(emptyFieldArr)
  return emptyFieldArr
}

const getRandomVal = function(arr){
  return arr[Math.floor(Math.random() * arr.length)]
}


const isWinSeries = function(pos1, pos2, pos3){
  if (pos1 !== " " && pos1 === pos2 && pos2 === pos3){
    return pos1
  } else {
    return null
  }
}

const getRows= function(arr){
  let rows = [];
  for (r = 0; r < arr.length; r += gameSize) {
    let curRow = []
    for (i = r; i < r + gameSize; ++i) {
      let curCell = arr[i]
      curRow.push(curCell)
    }
    rows.push(curRow)
  }
  return rows
}

const getColumns = function(arr){
  let columns = [];
  for (c = 0; c < gameSize; ++c) {
    let curColumn = []
    for (i = c; i < arr.length; i += gameSize) {
      let curCell = arr[i]
      curColumn.push(curCell)
    }
    columns.push(curColumn)
  }
  return columns
}

const getDiags = function(){
  let diag1 = []
  let diag2 = []
  let rows = getRows(curGameState) 
  for (i = 0; i < rows.length; ++i){
    diag1.push(rows[i][i])
    diag2.push(rows[i][rows.length - (i + 1)])
  }7
  return [diag1, diag2]
}

const isWinState = function(rows, columns, diags){
  let allSeries = [...rows, ...columns, ...diags]
  for (series of allSeries){
    const hasWon = isWinSeries(...series)
    if (hasWon !== null){
      return hasWon
    }
  }
  return null
}

// a fieldstate is 
// "X"
// "O"
// or " "
let newFieldState = "X"

const gameSize = 3

// a gamestate is
// an array of fieldstates of length gameSize ** 2

const initGameState = function(){
  let result = []
  for (let i = 0; i < gameSize ** 2; i++){
    result.push(" ")
  }
  return result 
}
let curGameState = initGameState()

// takes a gamestate, returns an image of the game
let gameImage = function(arr){
  const rows = getRows(curGameState)
  let image = ``
  for(let row in rows){
    let curRow = rows[row]
    if (row != 0){for (let i = 0; i < curRow.length; i++){
      image += ` ---`
      }
    }
    image += `\n`
    for (let cell in curRow) {
      let curCell = curRow[cell]
      if (cell == 0){
        image += `  ${curCell} `
      } else {
        image += `| ${curCell} `
      }
    }
    image += `\n`
  }
  return image
}

console.log(gameImage(curGameState))

