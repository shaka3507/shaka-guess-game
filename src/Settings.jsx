import { useState, useEffect } from 'react'

import Nav from './Nav.jsx'
import { Link } from 'react-router-dom'
import { saveItemLocalStorage, getItemLocalStorage, deleteItemLocalStorage } from './localStorageUtil.js'

export default function Settings() {
	const [chance, setChance] = useState(5)
	const [min, setMin] = useState(0)
	const [max, setMax] = useState(10)
	const [gameSettings, setGamesSettings] = useState('')
	const [gameInProgress, setGameInProgress] = useState(false)
	const [error, setError] = useState('')
	const onMaxChange = (e) => {
		if(e.target.value >=0 && e.target.value !== min) {
			setMax(e.target.value)
			if (error) setError('')
		} else if (e.target.value === min) {
			setError('The max and min number cannot be the same')
		} else {
			setError('The maximum cannot be less than 0')
		}
	}
	const onMinChange = (e) => {
		// only allow positive numbers or 0
		// shows error message if user tries to make mininum number negative
		if(e.target.value >= 0 && e.target.value !== max) {
			setMin(e.target.value)
			if (error) setError('')
		} else if (e.target.value === max){
			setError('The max and min number cannot be the same')
		} else {
			setError('The minimum cannot be less than 0')
		}

	}
	const onChanceChange = (e) => {
		if(e.target.value < 1) {
			setError('User must get at least 1 chance')
		} else {
			setChance(e.target.value)
			setError('')
		}
	}

	useEffect(() => {
		const settings = getItemLocalStorage('settings')
		const gameState = getItemLocalStorage('game-state') || null

		// if game state saved in local storage, give user option to start a new game
		if(gameState) {
			setGameInProgress(true)
		}

		console.log('setting_', settings)

		// if no settings found, returns default settings of 0, 10 and 3 chances
		if(settings) {
			setMin(settings.min)
			setMax(settings.max)
			setChance(settings.chance)
		}

	}, [])


	// updates local storage in settings, using min, max and chance as dependencies for checking
	useEffect(() => {
		saveItemLocalStorage('settings', { min, max, chance })
	}, [min, max, chance])

	// for users who want to reset game from settings page
	const resetGame = () => {
		deleteItemLocalStorage('game-state')
		setGameInProgress(false)
	}

	return (
		<div>
			<Nav>
				<Link to="/">Back to game</Link>
      		</Nav>
			<div className="error-container">
				{gameInProgress && 'game in progress - cannot change settings'}
				{gameInProgress && <button onClick={resetGame}>reset game</button>}
				{error && <p className="error-msg">Error: {error}</p>}
			</div>
			{/*https://www.compart.com/en/unicode/U+2699*/}
			<h1>settings &#9881;</h1> 
			<div className="card">
				<h2>Set how many chances you get</h2>
				<input type="number" onChange={onChanceChange} value={chance} disabled={gameInProgress}/>
			</div>
			<div className="card">
				<h2>Pick a range for the mystery number</h2>
				<input type="number" onChange={onMinChange} value={min} disabled={gameInProgress} />
				<p><em>-to-</em></p>
				<input type="number" onChange={onMaxChange} value={max} disabled={gameInProgress}/>
			</div>
		</div>
	)
}