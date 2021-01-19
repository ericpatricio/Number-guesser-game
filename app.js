// UI Element
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessInput = document.querySelector('#guess-input');
const guessBtn = document.querySelector('#guess-btn');
const message = document.querySelector('.message');


// Game values
let min = 1;
let max = 10;
let winningNum = randomNumber(min, max);
let guessesLeft = 3;

// Guess number value
minNum.textContent = min;
maxNum.textContent = max;


// Event listeners

// Listen for guess on click
guessBtn.addEventListener('click', (e) => {
  let guess = +(guessInput.value);
  
  // Validate guess input
  if(isNaN(guess) || guess < min || guess < max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  } 
  
  // check if user won 
  if(guess === winningNum) {
    // Game over - won
    gameOver(true, `${winningNum} is correct, YOU WIN`);
  } else {
    // wrong number
    guessesLeft -= 1;

    if(guessesLeft === 0) {
      // Game over - lost
      gameOver(false, `Game over, YOU LOST!. The correct number was ${winningNum}`);
    } else {
      // change border color
      guessInput.style.borderColor = 'red';
      // clear input
      guessInput.value = '';
      // its wrong number
      setMessage(`The number ${guess} is not correct, ${guessesLeft} guess left.`, 'red');
    }
  }
});

// Play again listener
game.addEventListener('mousedown', (e) => {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
})


// Functions 

// Game over function
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';

  // disable input
  guessInput.disabled = true;
  // change border color
  guessInput.style.borderColor = color;
  // set text color
  message.style.color = color;
  // set message
  setMessage(msg);

  // play again
  guessBtn.value = 'Play again';
  guessBtn.className += 'play-again';
}

// Random winning number
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Message
function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}

  
