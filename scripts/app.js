const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let editedPlayer = 0;
let activePlayer = 0; 
let currentRound = 1; 
let gameIsOver = false;

const players = [
  {
    name: '', 
    symbol: 'X'
  },
  {
    name: '',
    symbol: 'O'
  },
];

const playerConfigOverlay = document.getElementById('configure');
const backdrop = document.getElementById('backdrop');
const formElement = document.querySelector('form');
const errorsOutput = document.getElementById('config-errors');
const gameArea = document.getElementById('active-game');
const activePlayerName = document.getElementById('active-player-name');
const gameOver = document.getElementById('game-over');

const  editPlayer1Btn = document.getElementById('edit-player-1');
const  editPlayer2Btn = document.getElementById('edit-player-2');
const cancelConfigBtn = document.getElementById('cancel-config');
const startNewGameBtn = document.getElementById('start-game-btn');
const gameFieldElements = document.querySelectorAll('#game-board li');
const gameBoard = document.getElementById('game-board')

editPlayer1Btn.addEventListener('click', openPlayerConfig);  // to open choose player div
editPlayer2Btn.addEventListener('click', openPlayerConfig);

cancelConfigBtn.addEventListener('click', closePlayerConfig); // to close choose player div either by clicking on cancel btn or 
backdrop.addEventListener('click', closePlayerConfig); // by clicking on background

formElement.addEventListener('submit', savePlayerConfig);

startNewGameBtn.addEventListener('click', startNewGame);

for (const gameFieldElemet of gameFieldElements) {
  gameFieldElemet.addEventListener('click', selectGameField);
}