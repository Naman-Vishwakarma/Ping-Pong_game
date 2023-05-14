"use strict";

class PingPongGame {
  constructor(
    container,
    upperPad,
    lowerPad,
    ball,
    scoreDisplay1,
    scoreDisplay2
  ) {
    this.container = container;
    this.upperPad = upperPad;
    this.lowerPad = lowerPad;
    this.ball = ball;
    this.gameInterval;
    this.keepIncreasingLeft = true;
    this.keepIncreasingTop = false;
    this.lowerPadHitBall = this.ball.classList.contains("ball-to-lower-pad");
    this.isGameOn = false;
    this.p1_score = 0;
    this.p2_score = 0;
    this.scoreDisplay1 = scoreDisplay1;
    this.scoreDisplay2 = scoreDisplay2;
  }

  setScore() {
    this.scoreDisplay1.textContent = this.p1_score;
    this.scoreDisplay2.textContent = this.p2_score;
  }

  moveRight(container) {
    var coord = this.getBoundingClientRect();
    if (coord.right >= container.offsetWidth) {
      return;
    }
    this.style.left = this.offsetLeft + 15 + "px";
  }

  moveLeft(container) {
    if (this.offsetLeft <= container.offsetLeft) {
      return;
    }
    this.style.left = this.offsetLeft - 15 + "px";
  }

  moveBall(container) {
    this.isGameOn = true;
    const ballCoord = this.ball.getBoundingClientRect();
    const upperPadCoord = this.upperPad.getBoundingClientRect();
    const lowerPadCoord = this.lowerPad.getBoundingClientRect();

    if (
      ballCoord.bottom > lowerPadCoord.top - -5 ||
      ballCoord.top < upperPadCoord.bottom - 5
    ) {
      clearInterval(this.gameInterval);
      this.isGameOn = false;
      if (ballCoord.bottom > lowerPadCoord.top - -5) {
        this.ball.classList.remove("ball-to-lower-pad");
        this.ball.classList.add("ball-to-upper-pad");
        this.p2_score++;
      } else {
        this.ball.classList.add("ball-to-lower-pad");
        this.ball.classList.remove("ball-to-upper-pad");
        this.p1_score++;
      }
      this.ball.removeAttribute("style");
      this.upperPad.removeAttribute("style");
      this.lowerPad.removeAttribute("style");
      this.setScore();
      alert("Game Over.!!");
      return;
    }

    if (this.keepIncreasingLeft) {
      this.ball.style.left = this.ball.offsetLeft + 5 + "px";
    } else {
      this.ball.style.left = this.ball.offsetLeft - 5 + "px";
    }

    if (this.keepIncreasingTop) {
      this.ball.style.top = this.ball.offsetTop + 2 + "px";
    } else {
      this.ball.style.top = this.ball.offsetTop - 2 + "px";
    }

    if (this.ball.offsetLeft >= container.offsetWidth - 25) {
      this.keepIncreasingLeft = false;
    } else if (this.ball.offsetLeft <= "0") {
      this.keepIncreasingLeft = true;
    }

    if (this.lowerPadHitBall) {
      this.keepIncreasingTop = this.collisionWithUpperPad();
    } else {
      this.keepIncreasingTop = this.collisionWithLowerPad();
    }
  }

  collisionWithUpperPad() {
    const ballCoord = this.ball.getBoundingClientRect();
    const upperPadCoord = this.upperPad.getBoundingClientRect();
    if (
      ballCoord.left >= upperPadCoord.left &&
      ballCoord.right <= upperPadCoord.right &&
      ballCoord.top <= upperPadCoord.bottom
    ) {
      this.lowerPadHitBall = false;
      return true;
    } else {
      return false;
    }
  }

  collisionWithLowerPad() {
    const ballCoord = this.ball.getBoundingClientRect();
    const lowerPadCoord = this.lowerPad.getBoundingClientRect();
    if (
      ballCoord.left >= lowerPadCoord.left &&
      ballCoord.right <= lowerPadCoord.right &&
      ballCoord.bottom >= lowerPadCoord.top
    ) {
      this.lowerPadHitBall = true;
      return false;
    } else {
      return true;
    }
  }

  getWinner() {
    if (this.p1_score === this.p2_score) {
      return "no-one";
    }
    if (this.p1_score > this.p2_score) {
      return this.lowerPad.textContent;
    } else {
      return this.upperPad.textContent;
    }
  }

  exitGame() {
    clearInterval(this.gameInterval);
    alert("Winner is " + this.getWinner());
    this.p1_score = 0;
    this.p2_score = 0;
    this.setScore();
    this.ball.removeAttribute("style");
    this.upperPad.removeAttribute("style");
    this.lowerPad.removeAttribute("style");
    this.isGameOn = false;
  }
}
