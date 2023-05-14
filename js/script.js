"use strict";

const onLoad = (function () {
  const startGameBtn = document.getElementById("start-game-btn");
  //Screen shown as Game launched.
  const startScreen = document.querySelector(".start-screen");

  //for single player game
  const singlePlayerNameInput = document.getElementById("player");
  const s_p_link = document.getElementById("s-p-link");
  const singlePlayerDiv = document.getElementById("single-player");

  //for two player game
  const player1NameInput = document.getElementById("player1");
  const player2NameInput = document.getElementById("player2");
  const twoPlayerDiv = document.getElementById("two-player");
  const t_p_link = document.getElementById("t-p-link");

  //Score Display
  const p1Display = document.querySelector(".score-one");
  const p2Display = document.querySelector(".score-two");

  const container = document.querySelector(".container");
  const upperPad = document.querySelector(".upper-pad");
  const lowerPad = document.querySelector(".lower-pad");
  const ball = document.querySelector(".ball");

  var isSPGame = "";

  var game = new PingPongGame(
    container,
    upperPad,
    lowerPad,
    ball,
    p1Display,
    p2Display
  );
  var moveBall = game.moveBall.bind(game, game.container);

  //function to set playing key for singler player game
  function singlePlayer(event) {
    if (event.key === "Enter" && !game.isGameOn) {
      game.gameInterval = setInterval(moveBall, 15);
    }

    if (event.key === "a" || event.key === "A") {
      if (game.ball.offsetTop < screen.availHeight / 2 - 30) {
        game.moveLeft.call(game.upperPad, game.container);
      } else {
        game.moveLeft.call(game.lowerPad, game.container);
      }
    } else if (event.key === "d" || event.key === "D") {
      if (game.ball.offsetTop < screen.availHeight / 2 - 30) {
        game.moveRight.call(game.upperPad, game.container);
      } else {
        game.moveRight.call(game.lowerPad, game.container);
      }
    }
  }

  //function to set playing key for two player game
  function twoPlayer(event) {
    if (event.key === "Enter" && !game.isGameOn) {
      game.gameInterval = setInterval(moveBall, 15);
    }

    if (event.key === "a" || event.key === "A") {
      game.moveLeft.call(game.lowerPad, game.container);
    } else if (event.key === "d" || event.key === "D") {
      game.moveRight.call(game.lowerPad, game.container);
    }

    if (event.key === "j" || event.key === "J") {
      game.moveLeft.call(game.upperPad, game.container);
    } else if (event.key === "l" || event.key === "L") {
      game.moveRight.call(game.upperPad, game.container);
    }
  }

  //function to set player name on playing pad
  function setPlayerName() {
    if (isSPGame) {
      game.upperPad.textContent = singlePlayerNameInput.value.trim();
      game.lowerPad.textContent = singlePlayerNameInput.value.trim();
    } else {
      game.upperPad.textContent = player2NameInput.value.trim();
      game.lowerPad.textContent = player1NameInput.value.trim();
    }
  }

  //function to set player score
  function setScore() {
    var score1 = game.p1_score;
    var score2 = game.p2_score;

    if (isSPGame) {
      const playerName = game.lowerPad.textContent;
      let score = score1 > score2 ? score1 : score2;
      let previousScore = localStorage.getItem(playerName);
      if (previousScore) {
        score = previousScore > score ? previousScore : score;
      }
      localStorage.setItem(playerName, score);
    } else {
      const player1Name = game.lowerPad.textContent;
      const player2Name = game.upperPad.textContent;

      let previousScore = localStorage.getItem(player1Name);
      if (previousScore) {
        score1 = previousScore > score1 ? previousScore : score1;
      }
      previousScore = localStorage.getItem(player2Name);
      if (previousScore) {
        score2 = previousScore > score2 ? previousScore : score2;
      }

      localStorage.setItem(player1Name, score1);
      localStorage.setItem(player2Name, score2);
    }
    return;
  }

  //function to get player score and show alert on game over
  function getScore() {
    if (isSPGame) {
      const playerName = game.lowerPad.textContent;
      let score = localStorage.getItem(playerName);
      if (score) {
        alert("Your Highest Score was : " + score);
      } else {
        alert("You are new here.");
      }
    } else {
      const player1Name = game.lowerPad.textContent;
      const player2Name = game.upperPad.textContent;
      let score1 = localStorage.getItem(player1Name);
      let score2 = localStorage.getItem(player2Name);
      if (score1 && score2) {
        alert(
          player1Name +
            ", Your Highest Score was : " +
            score1 +
            "\n" +
            player2Name +
            ", Your Highest Score was : " +
            score2
        );
      } else if (score1) {
        alert(
          player1Name +
            ", Your Highest Score was : " +
            score1 +
            "\n" +
            player2Name +
            ", You are new here."
        );
      } else if (score2) {
        alert(
          player1Name +
            ", You are new here." +
            "\n" +
            player2Name +
            ", Your Highest Score was : " +
            score2
        );
      } else {
        alert("You, both are new here.");
      }
    }
    return;
  }

  function startgame() {
    if (isSPGame === "") {
      alert("Please choose game type Single/Two Player .!");
      return;
    }

    if (isSPGame && singlePlayerNameInput.value.trim() === "") {
      alert("Please Enter Your Name.!");
      return;
    }

    if (
      !isSPGame &&
      (player1NameInput.value.trim() === "" ||
        player2NameInput.value.trim() === "")
    ) {
      alert("Please Enter Players Name.!");
      return;
    }
    startScreen.style.display = "none";
    setPlayerName();
    getScore();
    document.addEventListener("keypress", handleKeypress);

    function handleKeypress(event) {
      console.log(event.key);
      if (event.key === "e" || event.key === "E") {
        setScore();
        game.exitGame();
        startScreen.removeAttribute("style");
        document.removeEventListener("keypress", handleKeypress);
        return;
      }

      if (isSPGame) {
        singlePlayer(event);
      } else {
        twoPlayer(event);
      }
    }
  }

  function onLoadHandler() {
    s_p_link.addEventListener("click", function () {
      isSPGame = true;
      singlePlayerDiv.classList.add("show-content");
      twoPlayerDiv.classList.remove("show-content");
    });

    t_p_link.addEventListener("click", function () {
      isSPGame = false;
      singlePlayerDiv.classList.remove("show-content");
      twoPlayerDiv.classList.add("show-content");
    });

    startGameBtn.addEventListener("click", startgame);
  }

  return onLoadHandler;
})();
