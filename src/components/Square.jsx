//Funciones para los turnos
export const Square = ({ children, isSelected, updateBoard, index }) => {
    // Condicion para los turnos
    const className = `square ${isSelected ? 'is-selected' : ''}`;
  
    //
    const handleClick = () => {
      updateBoard(index);
    };
  
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    );
  };