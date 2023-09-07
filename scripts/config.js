function openPlayerConfig(event) {
	editedPlayer = +event.target.dataset.playerid; // + converts string type to number
	playerConfigOverlay.style.display = "block";
	backdrop.style.display = "block";
}

function closePlayerConfig() {
	playerConfigOverlay.style.display = "none";
	backdrop.style.display = "none";
	formElement.firstElementChild.classList.remove("error");
	errorsOutput.textContent = "";
	document.getElementById("playername").value = "";
}

function savePlayerConfig(event) {
	event.preventDefault();
	const formData = new FormData(event.target);
	const enteredPlayerName = formData.get("playername").trim();

	if (!enteredPlayerName) {
		event.target.firstElementChild.classList.add("error");
		errorsOutput.textContent = "Please Enter a Valid Name!";
		return;
	}

	const updatedPlayerData = document.getElementById(
		"player-" + editedPlayer + "-data"
	);
	updatedPlayerData.children[1].textContent = enteredPlayerName;

	// if (editedPlayer === 1) {
	//   players[0].name = enteredPlayerName;
	// } else {
	//   players[1].name = enteredPlayerName;
	// }
	players[editedPlayer - 1].name = enteredPlayerName;

	closePlayerConfig();
}
