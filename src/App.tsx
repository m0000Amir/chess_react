import React, {useEffect, useState} from 'react';
import './App.css';
import BoardComponent from "./components/BoardComponent";
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';
import {Board} from "./models/Board";
import { Colors } from './models/Colors';
import { Player } from './models/Player';

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK)); 
  const [currentPlayer, setCurrentPlayer] =  useState<Player | null>(null);
  
  useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer);
  }, []);

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures()
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  }

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
      );
  }

  return (
    <div className="app">
      <Timer
        currentPlayer={currentPlayer}
        restart={restart}
      />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />

      <div>
        <LostFigures
            title={"Белые фигуры"}
            figures={board.lostWhiteFigures}
        />

        <LostFigures
          title={"Черные фигуры"}
          figures={board.lostBlackFigures}
        />
        
      </div>

    </div>
  );
}

export default App;
