function resetGameStatus() {
	activePlayer = 0;
	currentRound = 1;
	gameIsOver = false;
	gameOver.firstElementChild.innerHTML = 
	'<span id="winner-name">Player Name</span> Won!';
	gameOver.style.display = 'none';

	let gameBoardIndex = 0;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			gameData[i][j] = 0;
			const gameBoardItem = gameBoard.children[gameBoardIndex];
			gameBoardItem.textContent = '';
			gameBoardItem.classList.remove('disabled');
			gameBoardIndex++;
		}
	}
}

function startNewGame() {
	if (players[0].name === "" || players[1].name === "") {
		alert("Please enter valid Playernames for both the players.");
		return;
	}

	resetGameStatus();

	activePlayerName.textContent = players[activePlayer].name;
	gameArea.style.display = "block";
}

function switchPlayer() {
	if (activePlayer === 0) {
		activePlayer = 1;
	} else {
		activePlayer = 0;
	}

	activePlayerName.textContent = players[activePlayer].name;
}

function selectGameField(event) {
	if (event.target.tagName !== 'LI' || gameIsOver) {
		return;
	}

	const selectedCol = event.target.dataset.col - 1;
	const selectedRow = event.target.dataset.row - 1;

	if (gameData[selectedRow][selectedCol] > 0) {
		alert("The field has already been selected.");
		return;
	}

	event.target.textContent = players[activePlayer].symbol;
	event.target.classList.add("disabled");

	gameData[selectedRow][selectedCol] = activePlayer + 1;

	const winnerId = checkForGameOver();
  
  if (winnerId !== 0) {
    endGame(winnerId);
  }

	currentRound++;
	switchPlayer();
}

function checkForGameOver() {
	for (let i = 0; i < 3; i++) {
		// Checking for the rows equality
		if (
			gameData[i][0] > 0 &&
			gameData[i][0] === gameData[i][1] &&
			gameData[i][1] === gameData[i][2]
		) {
			return gameData[i][0];
		}
	}

	for (let i = 0; i < 3; i++) {
		// Checking for the columns equality
		if (
			gameData[0][i] > 0 &&
			gameData[0][i] === gameData[1][i] &&
			gameData[0][i] === gameData[2][i]
		) {
			return gameData[0][i];
		}
	}
	// Diagonal: Top left to bottom right
	if (
		gameData[0][0] > 0 &&
		gameData[0][0] === gameData[1][1] &&
		gameData[1][1] === gameData[2][2]
	) {
		return gameData[0][0];
	}

	//Diagonal: Bottom left to Top right
	if (
		gameData[2][0] > 0 &&
		gameData[2][0] === gameData[1][1] &&
		gameData[1][1] === gameData[0][2]
	) {
		return gameData[2][0];
	}

	if (currentRound === 9) {
		return -1;
	}
	return 0;
}

function endGame(winnerId) {
	gameIsOver = true;
	gameOver.style.display = "block";

	if (winnerId > 0) {
		const winnerName = players[winnerId - 1].name;
		document.getElementById("winner-name").textContent = winnerName;
	} else {
    gameOver.firstElementChild.textContent = "It's a Draw!"
  }
}
