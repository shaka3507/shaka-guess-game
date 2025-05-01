export default function GameStatus({ status, chances, maxChances = 20 }) {
	return (
		<div>
			<p>you have {maxChances - chances} chances left</p>
			<h3>{status}</h3>
		</div>
	)
}