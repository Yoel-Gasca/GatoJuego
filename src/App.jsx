import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import { TURNS } from "./constants"
import { checkWinnerFrom, checkEndGame } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"
// --Funcionamiento del tablero--
function App() {
  // Cuadricula del Tablero
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board') 
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)})

  // Estado para los turnos
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  // Estado del ganador
  const [winner, setWinner] = useState(null) // null = No hay ganador, false = empate

  //Resetea la partida y reinicia el juego
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) =>{
    // No actualizar posicion si esta ocupada
    if(board[index] || winner) return
    //Atualiza el Board
    const newBoard = [...board]
    newBoard[index]= turn
    setBoard(newBoard)
    //Condicion para cambiar turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //Guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    // Revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // Empate
    }
  }

  return (
    <main className='board'>
      <h1>Juego del Gato</h1>
      <button onClick={resetGame}>Volver a iniciar</button>
      <section className="game">
        {
          board.map((_, index) =>{
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      
      <section className="turn">
        <Square isSelected= {turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected= {turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  ) 
}

export default App
