import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import GameStatus from './GameStatus'
import './App.css'
import { Nav } from './App.jsx'
import { getItemLocalStorage, saveItemLocalStorage } from './localStorage.js'

function Game() {
  const [num, setNum] = useState(null)
  const [guess, setGuess] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [userPlays, setUserPlays] = useState(0)
  const [status, setStatus] = useState('')
  const [gamesWon, setGamesWon] = useState(0)
  const [gamesLoss, setGamesLoss] = useState(0)
  const [guessSum, setGuessSum] = useState(0)
  const [settings, setSettings] = useState({
    min: 0,
    max: 10,
    chance: 5
  })

  useEffect(() => {
    // if saved settings, use them from local storage, otherwise keep it at original state defaults
    const savedSettings = getItemLocalStorage('settings')
    if(savedSettings) {
      setSettings(savedSettings)
    }
  }, [])
  
  useEffect(() => {
    if(!num) {
      // uses min and max to get random number
      const random = Math.floor(Math.random(settings.min) * settings.max)
      const minCeiled = Math.ceil(settings.min)
      const maxFloored = Math.floor(settings.max)
      const guessNum = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
      setNum(guessNum)
    }
  }, [num, settings.min])

  useEffect(() => {
    // checks to ensure user only plays with chances allocated for game
    if(userPlays - settings.chance === 0) {
      setGameOver(true)
      setGamesLoss(gamesLoss + 1)
      setStatus('game over')
    }
  }, [userPlays])

  const trackGuess = (e) => setGuess(e.target.value)

  const evaluateGuess = () => {
    setUserPlays(userPlays + 1)
    if(Number(guess) > num) {
      setStatus('too high')
    } else if (Number(guess) < num) {
      setStatus('too low')
    } else if (Number(guess) === num){
      setStatus('won')
      setGameOver(true)
      setGamesWon(gamesWon + 1)
      setGuessSum(guessSum + userPlays)
    }
  }

  const resetGame = () => {
    setGameOver(false)
    setNum(null)
    setStatus('')
    setUserPlays(0)
    setGuess(0)
  }

  useEffect(() => {
    if(status.includes('won')) {
      let currentStats = getItemLocalStorage('stats') || { gamePlayCount: [], gamesWon: 0, gamesLoss: 0 }
      currentStats.gamePlayCount = [...currentStats.gamePlayCount, userPlays]
      currentStats.gamesWon = currentStats.gamesWon + 1
      saveItemLocalStorage('stats', currentStats)
    }

    if(status.includes('over')) {
      let currentStats = getItemLocalStorage('stats') || { gamePlayCount: [], gamesWon: 0, gamesLoss: 0 }
      currentStats.gamesLoss = currentStats.gamesLoss + 1
      saveItemLocalStorage('stats', currentStats)
    }
    
  }, [status])

  return (
    <>
      <div className="nav">
        <Link to="/stats">Stats</Link>
        <Link to="/settings">Settings</Link>
      </div>
      <div className="game">
      <h1>take a chance &#9860;</h1>
      {gameOver && `mystery number is ${num}`}
      <div>
        <div id="guess-num">{num}</div>
        <p>what number am i thinking of?</p>
        <GameStatus status={status} chances={userPlays} maxChances={settings.chance} />
        <input type="text" maxLength="3" onChange={trackGuess} value={guess} />
        <br />
        <button disabled={gameOver} onClick={evaluateGuess}>GUESS</button>
        <br />
        {gameOver && <button onClick={resetGame}>reset game </button>}
      </div>
      </div>
    </>
  )
}

export default Game
