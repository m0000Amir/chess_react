import React, { FC, useEffect, useRef, useState } from 'react'
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

export const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
  }, [currentPlayer])

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback = currentPlayer?.color == Colors.WHITE
      ? decrementWhiteTimer : decrementBlackTimer;

    timer.current = setInterval(callback, 1000);
  }

  function decrementBlackTimer() {
    setBlackTime(prev => prev - 1);
  }

  function decrementWhiteTimer() {  
    setWhiteTime(prev => prev - 1);
  }

  const handlerRestart = () => {
    setBlackTime(300);
    setWhiteTime(300);
    restart();
  }

  return (
    <div>
      <div>
        <button onClick={handlerRestart}>Restart game</button>
      </div>
    
      <h2>Черные - {blackTime}</h2>
      <h2>Белые - {whiteTime}</h2>
    </div>
  )
}

export default Timer;