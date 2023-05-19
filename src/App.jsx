import { useState } from "react"

const TURNS = {
  X: 'X',
  O: 'O'
}
// --Funcionamiento del tablero--

//Funciones para los turnos
const Square = ({ children, isSelected, updateBoard, index }) => {
  // Condicion para los turnos
  const className = `square ${isSelected ? 'is-selected' : ''}`

  //
  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

//Conbinaciones ganadoras
const WINNER_COMBOS =[
  //Horizontales
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //Verticales
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //Diagonales
  [0, 4, 8],
  [2, 4, 6]

]
function App() {
  // Cuadricula del Tablero
  const [board, setBoard] = useState(Array(9).fill(null))

  // Estado para los turnos
  const [turn, setTurn] = useState(TURNS.X)
  // Estado del ganador
  const [winner, setWinner] = useState(null) // null = No hay ganador, false = empate

  //Verifica si hay gador o empate
  const checkWinner = (boardToCheck) => {
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
    // Revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner) {
      setWinner(newWinner)
    }
  }

  return (
    <main className='board'>
      <h1>Juego del Gato</h1>
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

      {
        winner != null && (
          <section className="winner">
            <div className="text">
              <h2>
                {

                  winner === false
                    ? 'Empate'
                    : 'Gano:'
                }
              </h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  ) 
}

export default App
