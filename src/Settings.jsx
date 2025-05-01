import { useState } from 'react'
export default function Settings() {
	const [guessSetting, setGuessSetting] = useState(10)
	const [lower, setLower] = useState(0)
	const [higher, setHigher] = useState(20)
	const trackGuesses = (e) => {
		setGuessSetting(e.target.value)
	}

	const trackLower = (e) => {
		setLower(e.target.value)
	}
	const trackHigher = (e) => {
		setHigher(e.target.value)
	}
	return (
		<div>
			<h1>your settings</h1> 
			<div className="setting-card">
				<h2>Guesses allowed:</h2>
				<input type="number" onChange={trackGuesses} value={guessSetting} />
			</div>
			<div className="setting-card">
				<h2>Number range</h2>
				<input type="number" onChange={trackLower} value={lower} />
				<p><em>-to-</em></p>
				<input type="number" onChange={trackHigher} value={higher} />
			</div>
		</div>
	)
}