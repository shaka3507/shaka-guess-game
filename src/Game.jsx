import { useState, useEffect } from 'react'
import GameStatus from './GameStatus'
import './App.css'

function Game({ settingsChances = 20 }) {
  const [num, setNum] = useState(null)
  const [guess,setGuess] = useState(null)
  const [status, setStatus] = useState(null)
  const [chances, setChances] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  
  useEffect(() => {
    if(!num) {
      const random = Math.floor(Math.random() * 101)
      setNum(random)
    }
  }, [num])

  const trackGuess = (e) => {
    setGuess(e.target.value)
  }

  const evaluateGuess = () => {
    setChances(chances + 1)
    if(Number(guess) > num) {
      setStatus('too high')
    } else if (Number(guess) < num) {
      setStatus('too low')
    } else if (Number(guess) === num){
      setStatus('you won!')
      setGameOver(true)
    }
    if(chances === settingsChances) {
      setGameOver(true)
    }
  }

  const resetGame = () => {
    setGameOver(false)
    setNum(null)
  }

  return (
    <>
      <h1>guessing game</h1>
      <div>
        <div id="guess-num">{num}</div>
        <p>what number am i thinking of?</p>
        <GameStatus status={status} chances={chances} />
        <input type="text" maxLength="3" onChange={trackGuess} />
        <br />
        <button onClick={evaluateGuess}>guess</button>
        <br />
        {gameOver && <button onClick={resetGame}>reset game </button>}
      </div>
    </>
  )
}

export default Game
