import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Game from './Game.jsx'
import Settings from './Settings.jsx'
import Stats from './Stats.jsx'


export const Nav = ({ gameData, statsData }) => {
	return (
		<ul id='main-nav'>
			<li><Link to="/">Game</Link></li>
			<li><Link to="/settings">Settings</Link></li>
		</ul>
	);
}

export default function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Game />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/stats" element={<Stats />} />
			</Routes>
		</BrowserRouter>
	)
}