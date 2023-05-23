import { WINNER_COMBOS } from "../constants"
//Verifica si hay gador o empate
export const checkWinnerFrom = (boardToCheck) => {
    //Revisa las combinaciones
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if(
        boardToCheck[a]&&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    // En caso de empate
    return null
}

export const checkEndGame = (newBoard) =>{
    // Verifica el empate, si no hay conbinaciones ganadoras en el tablero
    return newBoard.every((Square) => Square != null)
  }