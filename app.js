"use strict";

const body = document.querySelector("body");

const checkBtn = document.querySelector(".check");
const guess = document.querySelector(".guess");
const message = document.querySelector(".message");
const score = document.querySelector(".score");
const number = document.querySelector(".number");
const againBtn = document.querySelector(".again");
const highscore = document.querySelector(".highscore");
const glow = document.querySelector(".glow");
const heading = document.querySelector("h1");

//  secret number⬇

let secretNumber = Math.trunc(Math.random() * 20) + 1;

let scoreValue = 20;

let highscoreValue = 0;

guess.focus();

let typingInProgress = false;

function displayMessage(ourMessage) {
  if (typingInProgress) {
    clearTimeout(typeWriter);
    message.textContent = ourMessage;
    typingInProgress = false;
  } else {
    typeWriter(ourMessage);
  }
}

function typeWriter(newMessage) {
  typingInProgress = true;

  let i = 0;
  const speed = 80;

  function type() {
    if (i < newMessage.length) {
      message.textContent += newMessage.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      i = 0;
      setTimeout(() => {
        message.textContent = "";
        typingInProgress = false;
      }, 1000);
    }
  }

  type();
}

// DOM
function gameLogic() {
  let guessValue = +guess.value;
  // when there is no input
  if (!guessValue) {
    displayMessage("⛔ No number!");
  } else if (guessValue === secretNumber) {
    function startFireworksAnimation() {
      (async () => {
        await loadFireworksPreset(tsParticles);

        tsParticles.load("fireworks-container", {
          preset: "fireworks",
        });
      })();
    }

    function stopFireworksAnimation() {
      const fireworksContainer = document.getElementById("fireworks-container");
      fireworksContainer.parentNode.removeChild(fireworksContainer);
      message.innerHTML = '<i class="fa-solid fa-star fa-beat"></i> You won!';
    }

    startFireworksAnimation();

    setTimeout(() => {
      stopFireworksAnimation();
    }, 4000);

    body.style.overflow = "hidden";

    number.textContent = secretNumber;
    body.style.backgroundColor = "#60b347";
    number.style.width = "30rem";
    guess.setAttribute("disabled", "");
    checkBtn.disabled = true; // Disable the "Check!" button
    number.classList.add("active");
    if (scoreValue > highscoreValue) {
      highscoreValue = scoreValue;
      highscore.textContent = highscoreValue;
    }
    // when guess is wrong
  } else if (guessValue !== secretNumber) {
    if (scoreValue > 1) {
      displayMessage(
        guessValue > secretNumber
          ? "⬆️Too high, Try less"
          : "⬇️ Too low, Try high"
      );
      scoreValue--;
      score.textContent = scoreValue;
      guess.focus();
      guess.value = "";
    } else {
      message.innerHTML =
        '<i class="fa-solid fa-bomb fa-beat-fade"></i>  You lost the game!';
      score.textContent = 0;
      guess.setAttribute("disabled", "");
      checkBtn.disabled = true;
      body.classList.add("loser");
      guess.style.color = "#fff";
      message.style.color = "#fff";
      guess.style.borderColor = "#fff";
    }
  }
}
guess.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    gameLogic();
  }
});

checkBtn.addEventListener("click", function () {
  gameLogic();
});

// locic
againBtn.addEventListener("click", function () {
  body.style.overflow = "visible";
  body.classList.remove("loser");
  number.classList.remove("active");
  scoreValue = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  message.innerHTML = "";
  displayMessage(" G u e s s i n g . . . ");
  score.textContent = scoreValue;
  number.textContent = "?";
  let guessValue = (guess.value = "");
  body.style.backgroundColor = "#222";
  number.style.width = "15rem";
  guess.removeAttribute("disabled");
  checkBtn.disabled = false; // enable the "Check!" button
  guess.focus();
  guess.style.color = "#360033";
  message.style.color = "#360033";
  guess.style.borderColor = "#360033";

  // console.log( secretNumber );
});

typeWriter("  G u e s s i n g . . .  ");
