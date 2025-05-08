# Guessing Game

## Changed Files

- App.jsx: for handling routing for the app
- Game.jsx: for the actual game component - saves current game state and reads from local storage for settings and stats
- Settings.jsx: for the settings view. Also allows player to reset game, if they want to change the game during an ongoing game. Also includes error messaging for user who tries to make min or max number below zero, the same number or chances <= 0.
- Stats.jsx: For tracking the number of games won, the average plays it takes the player to win, and game loss count
- StatsCard: Child component for Stats to show a stats acard
- localStorageUtil.js: functions available to be imported into each component for getting, saving and deleting local storage keys for settings, stats and game state
- GameStatus.jsx: component for displaying the current state of the game
- App.css and index.css: includes all css changes from original vite project.
- Nav.jsx: File for shared nav bar across views


