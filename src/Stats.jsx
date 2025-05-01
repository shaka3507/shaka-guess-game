export default function Stats({ gamesWon = 0, avgGuesses = 0 }){
	return (<div>
		<h1>your stats</h1>

		<h3>games won: {gamesWon}</h3>
		<h3>average guesses: {avgGuesses}</h3>
	</div>)
}