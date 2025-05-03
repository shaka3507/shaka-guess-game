import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getItemLocalStorage, deleteItemLocalStorage } from './localStorage.js'

export default function Stats(){
	const [winCount, setWinCount] = useState(0)
	const [avg, setAvg] = useState(0)
	const [loss, setLoss] = useState(0)
	useEffect(() => {
		const savedStats = getItemLocalStorage('stats')
		if(savedStats.gamesWon) {
			setWinCount(savedStats.gamesWon)
		}
		if(savedStats.gamesLoss) {
			setLoss(savedStats.gamesLoss)
		}
		if(savedStats.gamePlayCount) {
			const { gamePlayCount } = savedStats
			let avgCalc = 0
			let len = gamePlayCount.length
			console.log("savedS", savedStats.gamePlayCount)
			for(let i = 0; i < len; i++) {
				avgCalc += gamePlayCount[i]
			}
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
			let result = Math.round(avgCalc/len * 100) / 100
			setAvg(result)
		}
	}, [])

	const reset = () => {
		deleteItemLocalStorage('stats')
		setAvg(0)
		setWinCount(0)
		setLoss(0)
	}
	return (
	<div>
		<div className="nav">
			<Link to="/">back to game </Link>
		</div>
		<h1>stats &#128202;</h1>
		<div className="card">
			<h3>congrats, you won <span className="emphasis-stat">{winCount}</span> games so far!</h3>
		</div>
		<div className="card">
			<h3>On average it takes you <span className="emphasis-stat">{avg}</span> guesses</h3>
		</div>
		<div className="card">
			<h3>And the number of L's... <span className="emphasis-stat">{loss}</span></h3>
		</div>
		<button onClick={reset}>reset stats</button>
	</div>)
}