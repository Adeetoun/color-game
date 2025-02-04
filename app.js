const container = document.querySelector(".container");
const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelectorAll('[data-testid="colorOption"]');
const newGame = document.querySelector('[data-testid="newGameButton"]');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreText = document.querySelector('[data-testid="score"]');
const trialsText = document.querySelector(".trial");
let trials = 3;
let score = 1;
let correctColor = "";

function getContrastingColor() {
  let r = Math.floor(Math.random() * 156) + 100;
  let g = Math.floor(Math.random() * 156) + 100;
  let b = Math.floor(Math.random() * 156) + 100;

  return `rgb(${r}, ${g}, ${b})`;
}

function shuffleColors() {
  let shuffled = [];
  while (shuffled.at.length < 6) {
    const color = getContrastingColor();
    if (!shuffled.includes(color)) {
      shuffled.push(color);
    }
  }
  return shuffled;
}

function setColor() {
  let shuffledColors = shuffleColors();

  colorOptions.forEach((option, index) => {
    option.style.backgroundColor = shuffledColors[index];
    option.dataset.color = shuffledColors[index];

    option.onclick = () => confirmColor(option.dataset.color);
  });

  correctColor = shuffledColors[0];
  colorBox.style.backgroundColor = correctColor;
}

function confirmColor(selectedColor) {
  if (trials > 0) {
    if (selectedColor === correctColor) {
      score++;
      trials--;
      gameStatus.textContent = "You are Correct! 🎉";

      gameStatus.classList.add("celebrate");
      setTimeout(() => {
        gameStatus.classList.remove("celebrate");
      }, 1000);

      if (trials > 0) {
        setTimeout(updateColor, 500);
      } else {
        gameStatus.textContent = "You are Correct! 🎉. Game over!";
        disableOptions();
      }
    } else {
      trials--;
      gameStatus.textContent = "Wrong❌, Try Again.";
    }
    trialsText.textContent = trials;
    scoreText.textContent = score;

    if (trials === 0 && selectedColor !== correctColor) {
      gameStatus.textContent = "Game over! 😔";
      disableOptions();
    }
  }
}
function disableOptions() {
  colorOptions.forEach((option) => {
    option.classList.remove("fadeOut");
    option.style.pointerEvent = "none";
  });

  setTimeout(() => {
    colorOptions.forEach((option) => {
      option.classList.add("fadeOut");
    });
  }, 10);
}

function updateColor() {
  setColor();
}

newGame.addEventListener("click", () => {
  trials = 3;
  score = 0;
  trialsText.textContent = trials;
  scoreText.textContent = score;
  gameStatus.textContent = "";

  setColor();

  colorOptions.forEach((option) => {
    option.style.pointerEvent = "auto";
  });
});

setColor();
