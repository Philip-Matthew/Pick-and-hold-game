'use strict';

let scores, currentScore, activePlayer, playing;
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const diceElement = document.querySelector('.dice');
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');

const init = function () {
  document.querySelector('.dice').classList.add('hidden');
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0; //player 1
  playing = true;
};

// Start the game.
init();

// Switch Player function.
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  // Active Player background switch.
  player2.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
};

// Making dice hidden
diceElement.classList.add('hidden');

// Setting scores to 0
score0Element.textContent = 0;
score1Element.textContent = 0;

// Roll the dice (Event 1)
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (playing) {
    diceElement.classList.remove('hidden');

    //   Generate a random dice number.
    let diceNumber = Math.trunc(Math.random() * 6) + 1;

    //   Display the right dice image.
    diceElement.src = `./img/dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
      //   Add the dice number to score.
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switching Players.
      switchPlayer();
    }
  }
});

// Hold the score.
document.querySelector('.btn--hold').addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //   Winning Condition.
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector('.dice').classList.add('hidden');
    }
    // Switch Player.
    switchPlayer();
  }
});

// Resetting (New Game Button).
document.querySelector('.btn--new').addEventListener('click', init);
