"use strict";

const modal = document.querySelector(".modal");
const showModalBtn = document.querySelector(".show-modal");
const overlay = document.querySelector(".overlay");
const hidden = document.querySelector(".hidden");
const closeModalBtn = document.querySelector(".close-modal");
const body = document.querySelector("body");
const messageClass = document.querySelector(".message");
const secretNumber = document.querySelector(".number");
const score = document.querySelector(".score");
const highScore = document.querySelector(".highscore");
const inputField = document.querySelector(".guess");
const checkButton = document.querySelector(".check");
const againButton = document.querySelector(".again");
let number = Math.trunc(Math.random() * 20 + 1);
let startingScore = 20;
let playerHighScore = 0;

function changeMsg(str) {
  messageClass.textContent = str;
}
function checkAns() {
  const guess = Number(inputField.value);
  console.log(guess, typeof guess);

  // When player doesn't provide any input
  if (!guess) {
    changeMsg("🤷‍♀️ No number was entered");

    // When player wins
  } else if (guess === number) {
    secretNumber.textContent = number;
    // messageClass.textContent = `Correct!!`;
    changeMsg("Correct!!");
    body.style.backgroundColor = "#60b347";
    secretNumber.style.width = "100%";
    if (startingScore > playerHighScore) {
      highScore.textContent = startingScore;
    }
  }
  if (startingScore > 1) {
    // When guess is too high
    if (guess !== number) {
      // messageClass.textContent = guess > number ? 'Too high!' : 'too low!';
      changeMsg(guess > number ? "Too high!" : "too low!");
      startingScore--;
      score.textContent = startingScore;
    }
    // When player loses :(
  } else {
    // messageClass.textContent = `You lost 😥`;
    changeMsg("You lose 😥");
    secretNumber.textContent = number;
    score.textContent = 0;
    body.style.backgroundColor = "#e3574d";
  }
}
function resetGame() {
  startingScore = 20;
  score.textContent = startingScore;
  inputField.value = "";
  number = Math.trunc(Math.random() * 20 + 1);
  // messageClass.textContent = `Start guessing...`;
  changeMsg("Start guessing...");
  secretNumber.textContent = "?";
  secretNumber.style.width = "15rem";
  body.style.backgroundColor = "#e3e2de";
}
function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}
// Resets the game so user can play again.
againButton.addEventListener("click", resetGame);
// Chekcs the input to progress the game.
checkButton.addEventListener("click", checkAns);
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkAns();
  }
});

// Open the 'About' window for information about the game.
showModalBtn.addEventListener("click", openModal);

// Methods to close modal
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});
