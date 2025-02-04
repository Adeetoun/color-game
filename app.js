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

  return { r, g, b };
}

function getShade(baseColor) {
  let shade = [];
  for (let i = 0; i < 6; i++) {
    let r = Math.min(255, Math.max(0, baseColor.r + (Math.random() * 50 - 25)));
    let g = Math.min(255, Math.max(0, baseColor.g + (Math.random() * 50 - 25)));
    let b = Math.min(255, Math.max(0, baseColor.b + (Math.random() * 50 - 25)));
    shade.push(`rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`);
  }
  return shade;
}

function setColor() {
  let baseColor = getContrastingColor();
  let colorShades = getShade(baseColor);

  correctColor = colorShades[Math.floor(Math.random() * colorShades.length)];

  colorOptions.forEach((option, index) => {
    option.style.backgroundColor = colorShades[index];
    option.dataset.color = colorShades[index];

    option.onclick = () => confirmColor(option.dataset.color);
  });

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
    option.style.pointerEvents = "none";
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

  colorOptions.forEach((option) => {
    option.style.pointerEvents = "auto";
    option.classList.remove("fadeOut");
  });
});

setColor();
