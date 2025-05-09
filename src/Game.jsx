import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import GameStatus from './GameStatus'
import Nav from './Nav.jsx'
import { saveItemLocalStorage, getItemLocalStorage, deleteItemLocalStorage } from './localStorageUtil.js'


function Game() {
  const [num, setNum] = useState(null)
  const [guess, setGuess] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [userPlays, setUserPlays] = useState(0)
  const [status, setStatus] = useState('')
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
    } else {
      // save default
      saveItemLocalStorage('settings', settings)
    }

    // if game state present from local storage, use it
    const gameState = getItemLocalStorage('game-state')

    if(gameState) {
      const { guessPlayNo, userPlays, currentGuess } = gameState
      setNum(guessPlayNo)
      setUserPlays(userPlays)
      setGuess(currentGuess)
    }
  }, [])


  
  useEffect(() => {
    // set random number to guess if none exists
    if(!num) {
      // uses min and max to get random number
      const random = Math.floor(Math.random(settings.min) * settings.max)
      const minCeiled = Math.ceil(settings.min)
      const maxFloored = Math.floor(settings.max)
      const guessNum = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
      setNum(guessNum)
    }
  }, [num, settings.min])

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
      setGuessSum(guessSum + userPlays)
    }
  }

  useEffect(() => {
    // if game is over and status has been set
    if(status.includes('won')) {
      // when a player has won, add to gamePlay array which keeps track of # of guesses for each winning round
      let currentStats = getItemLocalStorage('stats') || { winningGameGuessCount: [], gamesLoss: 0 }
      currentStats.winningGameGuessCount = [...currentStats.winningGameGuessCount, userPlays]
      saveItemLocalStorage('stats', currentStats)
      deleteItemLocalStorage('game-state')
    }

    if(status.includes('over')) {
      let currentStats = getItemLocalStorage('stats') || { winningGameGuessCount: [], gamesLoss: 0 }
      currentStats.gamesLoss = currentStats.gamesLoss + 1
      saveItemLocalStorage('stats', currentStats)
      deleteItemLocalStorage('game-state')
    }
    
  }, [status])

  useEffect(() => {
    if(userPlays > 0) {
      saveItemLocalStorage('game-state', { userPlays, guessPlayNo: num, currentGuess: guess })
    }
    // checks to ensure user only plays with chances allocated for game
    if(userPlays - settings.chance === 0) {
      setGameOver(true)
      setGamesLoss(gamesLoss + 1)
      setStatus('game over')
    } else if (userPlays - settings.chance === 0 && Number(guess) === num) {
      setStatus('winner!')
    }
  }, [userPlays])

  const resetGame = () => {
    deleteItemLocalStorage('game-state')
    setGameOver(false)
    setNum(null)
    setStatus('')
    setUserPlays(0)
    setGuess(0)
  }


  return (
    <>
      <Nav>
        <Link to="/stats">Stats</Link>
        <Link to="/settings">Settings</Link>
      </Nav>
      <div className="game">
        <h1>take a chance &#9860;</h1>
        {gameOver && `mystery number is ${num}`}
        <div>
          <div id="guess-num">{num}</div>
            {!gameOver && <p>what number am i thinking of?</p>}
            <GameStatus status={status} chances={userPlays} maxChances={settings.chance} />
            <input type="text" maxLength="3" onChange={trackGuess} value={guess} />
            <br />
            <button id="guess-btn" disabled={gameOver} onClick={evaluateGuess}>GUESS</button>
            <br />
            {gameOver && <button onClick={resetGame}>reset game</button>}
          </div>
      </div>
    </>
  )
}

export default Game
