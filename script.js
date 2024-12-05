'use strict';
//defining elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// const current0El = document.querySelector('#current--0');
// const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//starting code

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//current score
let currentScore = 0;
let totalScore = [0, 0];
let activePlayer = 0;
let playing = true;

//function to switch players
const switchPlayers = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      console.log(currentScore);
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      totalScore[activePlayer] = 0;
      document.querySelector(`#score--${activePlayer}`).textContent =
        totalScore[activePlayer];
      switchPlayers();
    }
  }
});
console.log(currentScore);

btnHold.addEventListener('click', function () {
  if (playing) {
    totalScore[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    if (totalScore[activePlayer] >= 50) {
      playing = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector(`#name--${activePlayer}`).textContent = 'YOU WON';
      diceEl.classList.add('hidden');
    } else {
      switchPlayers();
    }
  }

  //if player wins
});

//resetting the game
btnNew.addEventListener('click', function () {
  diceEl.classList.add('hidden');
  totalScore = [0, 0];
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`#name--${activePlayer}`).textContent = `PLAYER ${
    activePlayer + 1
  }`;

  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  playing = true;
  activePlayer = 0;
});

//for the button to get rules
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const showModal = document.querySelector('.show-modal');
const getModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const removeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

showModal.addEventListener('click', getModal);
overlay.addEventListener('click', removeModal);

closeModal.addEventListener('click', removeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    removeModal();
  }
});
