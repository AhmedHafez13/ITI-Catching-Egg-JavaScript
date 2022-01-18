import { uiElements } from "../Elements.js";
import { getRandomOffset } from "../Utils.js";

export default class Egg {
  #fallingInterval;
  #clearingTimeout;
  #difficulty;
  #body;
  #eggLeft;
  #eggRight;
  #gameController;
  constructor(difficulty, gameController) {
    this.#difficulty = difficulty;
    this.#gameController = gameController;
    this.#initializeBody();
    this.#calcBodyBoundaries();
    this.#startFalling();
  }

  #initializeBody() {
    this.#body = document.createElement("img");
    this.#body.setAttribute(
      "src",
      "../assets/images/objects/object_012_egg.png"
    );
    this.#body.classList.add("game-egg");
    this.#body.style.left = this.#generateRandomLeft() + "px";
    this.#body.style.top = "-100px";
    uiElements.game.contianer.prepend(this.#body);
  }

  #calcBodyBoundaries() {
    this.#eggLeft = this.#body.offsetLeft;
    this.#eggRight = this.#body.offsetLeft + this.#body.offsetWidth;
  }

  #startFalling() {
    this.#fallingInterval = setInterval(() => {
      if (this.#gameController.isGameRunning) {
        if (this.#body.offsetTop < uiElements.game.basket.offsetTop + 20) {
          this.#body.style.top = this.#body.offsetTop + 5 + "px";
        } else {
          this.#stopFalling();
        }
      }
    }, getRandomOffset(this.#difficulty.eggMove, 10));
  }

  #stopFalling() {
    if (this.#fallingInterval) {
      clearInterval(this.#fallingInterval);
      this.#fallingInterval = null;
    }
    let basketBounds = this.#gameController.basket.getCurrentBoundaries();
    if (
      this.#eggLeft > basketBounds.left &&
      this.#eggRight < basketBounds.right
    ) {
      // The egg is within the basket boundaires
      this.#gameController.soundController.makeEggSound(true);
      this.#destroyEggBody();
      this.#gameController.onEggReachGround(true);
    } else {
      this.#gameController.soundController.makeEggSound(false);
      this.#body.style.top = this.#body.offsetTop + 20 + "px";
      this.#body.setAttribute(
        "src",
        "../assets/images/objects/object_012_broken_egg.png"
      );
      this.#clearingTimeout = setTimeout(() => {
        this.#destroyEggBody();
      }, 3000);
    }
  }

  #destroyEggBody() {
    if (this.#body) {
      this.#body.remove();
      this.#body = undefined;
    }
  }

  destroyEggObject() {
    if (this.#fallingInterval) {
      clearInterval(this.#fallingInterval);
      this.#fallingInterval = null;
    }
    if (this.#clearingTimeout) {
      clearTimeout(this.#clearingTimeout);
      this.#clearingTimeout = null;
    }
    this.#destroyEggBody();
  }

  #generateRandomLeft() {
    let min = 80;
    let max =
      uiElements.game.contianer.offsetWidth - this.#body.offsetWidth - 80;
    return Math.floor(min + (Math.random() * (max - min)));
  }
}
