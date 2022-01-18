import { uiElements } from "../Elements.js";

export default class Basket {
  #body;
  #halfBasketWidth;
  #minLeft;
  #maxLeft;
  constructor() {
    this.#body = uiElements.game.basket;
    this.#setMouseMoveEvent();
    this.#setKeysEvent();

    this.#halfBasketWidth = this.#body.offsetWidth / 2;
    this.#minLeft = this.#halfBasketWidth + 10;
    this.#maxLeft =
      uiElements.game.contianer.offsetWidth - this.#halfBasketWidth - 10;
  }

  #setMouseMoveEvent() {
    uiElements.game.contianer.addEventListener("mousemove", (event) => {
      this.#moveTo(event.clientX);
    });
  }

  #setKeysEvent() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        this.#moveTo(this.#body.offsetLeft + this.#halfBasketWidth - 15);
      } else if (event.key === "ArrowRight") {
        this.#moveTo(this.#body.offsetLeft + this.#halfBasketWidth + 15);
      }
    });
  }

  #moveTo(target) {
    if (target < this.#minLeft) target = this.#minLeft;
    if (target > this.#maxLeft) target = this.#maxLeft;
    this.#body.style.left = target - this.#halfBasketWidth + "px";
  }

  getCurrentBoundaries() {
    return {
      left: this.#body.offsetLeft,
      right: this.#body.offsetLeft + this.#body.offsetWidth
    }
  }
}
