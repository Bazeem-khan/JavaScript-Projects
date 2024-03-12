'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//Starting conditions
let score, currentScore, activePlyear, playing;
const init = function () {
  diceEl.classList.add('hidden');

  score = [0, 0];
  currentScore = 0;
  activePlyear = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init(); // Call the initializer to start game

const switchPlayer = function () {
  document.getElementById(`current--${activePlyear}`).textContent = 0;
  activePlyear = activePlyear === 0 ? 1 : 0;
  currentScore = 0;
  //Change background color for active Player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Dice roll
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Random number between 1 and 6
    const dice = Math.trunc(Math.random() * 6) + 1;
    //   console.log(dice);

    //Dispaly dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    //Check if dice is rolled 1
    if (dice !== 1) {
      //Add to the current player's score
      currentScore += dice;
      document.getElementById(`current--${activePlyear}`).textContent =
        currentScore;

      //current0El.textContent = currentScore1;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

//hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to the total score of the active player
    score[activePlyear] += currentScore;
    document.getElementById(`score--${activePlyear}`).textContent =
      score[activePlyear];

    if (score[activePlyear] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlyear}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlyear}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

//Reseting game

btnNew.addEventListener('click', function () {
  init();
});
