import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { saveItemLocalStorage, getItemLocalStorage, deleteItemLocalStorage } from './localStorageUtil.js'
import StatsCard from './StatsCard.jsx'

export default function Stats(){
	const [winCount, setWinCount] = useState(0)
	const [avg, setAvg] = useState(0)
	const [loss, setLoss] = useState(0)
	useEffect(() => {
		const savedStats = getItemLocalStorage('stats') || { gamesLoss: 0, winningGameGuessCount: []}

		setLoss(savedStats.gamesLoss)

		setWinCount(savedStats.winningGameGuessCount.length)
		const { winningGameGuessCount } = savedStats
		let avgCalc = 0
		let len = winningGameGuessCount.length
		if(len === 0) {
			setAvg(0)
			return
		}
		for(let i = 0; i < len; i++) {
			avgCalc += winningGameGuessCount[i]
		}
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
		let result = Math.round(avgCalc/len * 100) / 100
		setAvg(result)
	}, [])

	const reset = () => {
		deleteItemLocalStorage('stats')
		deleteItemLocalStorage('game-state')
		deleteItemLocalStorage('settings')
		setAvg(0)
		setWinCount(0)
		setLoss(0)
	}
	return (
		<div>
			<div className="nav">
				<Link to="/"> back to game </Link>
			</div>
			<h1>stats &#128202;</h1>
			<StatsCard stat={winCount} description="Game win count: "/>
			<StatsCard stat={avg} description="Average guesses count to win: "/>
			<StatsCard stat={loss} description="Game loss count: "/>
			<button className="reset-btn" onClick={reset}>CLEAR ALL SAVED DATA</button>
		</div>
	)
}