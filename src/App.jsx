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

function App() {
  // Cuadricula del Tablero
  const [board, setBoard] = useState(Array(9).fill(null))

  // Estado para los turnos
  const [turn, setTurn] = useState(TURNS.X)

  const updateBoard = (index) =>{
    // No actualizar posicion si esta ocupada
    if(board[index])return
    //Atualiza el Board
    const newBoard = [...board]
    newBoard[index]= turn
    setBoard(newBoard)

    //Condicion para cambiar turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
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
    </main>
  ) 
}

export default App
