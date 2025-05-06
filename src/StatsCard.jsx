export default function StatsCard({ stat, description }) {
	return (
		<div className="card stat"><h2>{description} {stat}</h2></div>
	)
}