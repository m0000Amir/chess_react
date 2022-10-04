import React, { FC, useEffect, useState } from 'react';
import { Board } from "../models/Board";
import { Cell } from '../models/Cell';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';
import CellComponent from "./CellComponent";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void; 
  currentPlayer: Player | null;
  swapPlayer: () => void;

}

const BoardComponent: FC<BoardProps> = (
  {board, setBoard, currentPlayer, swapPlayer}
  ) => {

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell) {

    if (selectedCell 
      && selectedCell !== cell 
      && selectedCell.figure?.canMove(cell)) {

      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
      
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  }

  function highlightCells() {
      board.highlightCells(selectedCell);
      updateBoard()
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  useEffect(() => {
    highlightCells();
  }, [selectedCell])

  return (
    <div>
      <h3>
        Ход {currentPlayer?.color === Colors.WHITE ? 'Белых' : 'Черных' }
      </h3>
      <div className="board">
        {board.cells.map((row, index) =>
          <React.Fragment key={index}>
            {row.map(cell =>
              <CellComponent
                selected = {cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                cell={cell}
                key={cell.id}
                click={click}
              />)}
          </React.Fragment>
        )}
    </div>
    </div>

  );
};

export default BoardComponent;