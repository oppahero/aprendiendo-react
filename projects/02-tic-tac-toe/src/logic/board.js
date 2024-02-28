import { WINNER_COMBOS} from '../constants.js'

export const checkWinnerFrom = (boardToCheck) => {
  //Revisa todas las posiciones ganadoras
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  return null;
}

export const checkEndGame = (boardToCheck) => {
  return boardToCheck.every((square) => square !== null)
}