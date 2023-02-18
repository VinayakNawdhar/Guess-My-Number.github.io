const bodyEl = document.querySelector("body");
const paraEl = document.getElementById("message");
const guessEl = document.getElementById("guess");
const againBtn = document.getElementById("again");
const checkBtn = document.getElementById("check");
const numberEl = document.querySelector("#number");
const scoreEl = document.querySelector("#score");
const highScoreEl = document.querySelector("#highscore");
const randomNumber = Math.trunc(Math.random() * 20) + 1;
checkBtn.addEventListener("click", checkGuess);
againBtn.addEventListener("click", reload);
let isCorrect = false;

let score = 20;
let highScore = 0;

if (localStorage.getItem("highScore")) {
  highScore = localStorage.getItem("highScore");
  refreshScores();
}
function checkGuess() {
  if (!isCorrect && score>=0) {
    if(score <= 1){
        paraEl.textContent = "😭 Sorry! you Lose";
        score =0;
        refreshScores();
        return;
    }
    let inputValue = Number(guessEl.value);
    if (!inputValue) {
      paraEl.textContent = "⛔No Number!";
    } else if (inputValue === randomNumber) {
      correctGuess(randomNumber);
      paraEl.textContent = "🎉🎊 Wohooo correct guess!!";
      isCorrect = true;
    } else if (inputValue > randomNumber) {
      if (inputValue - randomNumber >= 4) {
        paraEl.textContent = "📈 Too high...";
        score--;
        refreshScores();
      } else {
        paraEl.textContent = "😊 high...";
        score--;
        refreshScores();
      }
    } else {
      if (randomNumber - inputValue >= 4) {
        paraEl.textContent = "📉 Too low...";
        score--;
        refreshScores();
      } else {
        paraEl.textContent = "😏 low...";
        score--;
        refreshScores();
      }
    }
  }
}

function correctGuess(num) {
  numberEl.textContent = num;
  bodyEl.style.backgroundColor = "#6da333";
  highScore = Math.max(highScore, score);
  localStorage.setItem("highScore", highScore);
  highScoreEl.textContent = highScore;
  numberEl.style.width = "20rem";
}

function reload() {
  location.reload();
}

function refreshScores() {
  scoreEl.textContent = score;
  highScoreEl.textContent = highScore;
}
