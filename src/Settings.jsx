import { useState, useEffect } from 'react'
import { Nav } from './App.jsx'
import { Link } from 'react-router-dom'
import { saveItemLocalStorage, getItemLocalStorage } from './localStorage.js'

export default function Settings() {
	const [chance, setChance] = useState(0)
	const [min, setMin] = useState(0)
	const [max, setMax] = useState(0)
	const [gameSettings, setGamesSettings] = useState('')
	const onChanceChange = (e) => setChance(e.target.value)
	const onMinChange = (e) => setMin(e.target.value)
	const onMaxChange = (e) => setMax(e.target.value)

	useEffect(() => {
		const settings = getItemLocalStorage('settings') || { min: 0, max: 10, chance: 3 }

		if(settings.min) {
			setMin(settings.min)
			setMax(settings.max)
			setChance(settings.chance)
		}

	}, [])

	useEffect(() => {
		saveItemLocalStorage('settings', { min, max, chance })
	}, [min, max, chance])


	return (
		<div>
			<div className="nav"><Link to="/">Back to game</Link></div>
			{/*https://www.compart.com/en/unicode/U+2699*/}
			<h1>settings &#9881;</h1> 
			<div className="card">
				<h2>Set how many chances you get</h2>
				<input type="number" onChange={onChanceChange} value={chance} />
			</div>
			<div className="card">
				<h2>Pick a range for the mystery number</h2>
				<input type="number" onChange={onMinChange} value={min} />
				<p><em>-to-</em></p>
				<input type="number" onChange={onMaxChange} value={max} />
			</div>
		</div>
	)
}