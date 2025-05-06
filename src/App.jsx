import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Game from './Game.jsx'
import Settings from './Settings.jsx'
import Stats from './Stats.jsx'
import './App.css'

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