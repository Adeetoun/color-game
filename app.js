const colors = [
  "#ff4500",
  "#f99e7c",
  "#804747",
  "#7a0246",
  "#f5e1ec",
  "#7cd8f9",
];
const container = document.querySelector(".container");
const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelectorAll('[data-testid="colorOption"]');
const newGame = document.querySelector('[data-testid="newGameButton"]');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreText = document.querySelector('[data-testid="score"]');
const trialsText = document.querySelector(".trial");
let trials = 3;
let score = 1;
let correctColor = chooseCorrectColor();

colorBox.style.background = "";

function setColor() {
  colorOptions.forEach((option, index) => {
    option.style.backgroundColor = colors[index];
  });
}

colorOptions.forEach((option) => {
  option.addEventListener("click", () =>
    confirmColor(option.style.backgroundColor)
  );
});

function rgbToHex(rgb) {
  const result = rgb.match(/^rgb\((\d+), (\d+), (\d+)\)$/);
  if (result) {
    const r = parseInt(result[1]).toString(16).padStart(2, "0");
    const g = parseInt(result[2]).toString(16).padStart(2, "0");
    const b = parseInt(result[3]).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  }
  return rgb;
}

function confirmColor(selectedColor) {
  const selectedColorHex = rgbToHex(selectedColor);

  if (trials > 0) {
    if (selectedColorHex === correctColor) {
      colorBox.style.display = "block";
      colorBox.style.backgroundColor = selectedColor;
      score++;
      trials--;
      gameStatus.textContent = "You are Correct! 🎉";

      gameStatus.classList.add("celebrate");
      setTimeout(() => {
        gameStatus.classList.remove("celebrate");
      }, 1000);
    } else {
      trials--;
      gameStatus.textContent = "Wrong❌, Try Again.";
    }
    trialsText.textContent = trials;
    scoreText.textContent = score;

    if (trials === 0 && selectedColorHex === correctColor) {
      const selectedColorHex = rgbToHex(selectedColor);
      console.log(correctColor);
      console.log(selectedColorHex);

      gameStatus.textContent = "You are Correct! 🎉. Game over!";
      gameStatus.classList.add("celebrate");
      setTimeout(() => {
        gameStatus.classList.remove("celebrate");
      }, 1000);
      disableOptions();
    } else if (trials === 0) {
      gameStatus.textContent = "Game over! 😔";
      disableOptions();
    }
  }
}

function chooseCorrectColor() {
  const correctColor = colors[Math.floor(Math.random() * colors.length)];
  console.log(correctColor);
  return correctColor;
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

newGame.addEventListener("click", () => {
  trials = 3;
  score = 0;
  trialsText.textContent = trials;
  scoreText.textContent = score;
  gameStatus.textContent = "";

  correctColor = chooseCorrectColor();
  colorBox.style.display = "none";
  colorBox.style.backgroundColor = "";
  container.style.backgroundColor = "aliceblue";

  setColor();

  colorOptions.forEach((option) => {
    option.style.pointerEvent = "auto";
  });
});

setColor();
