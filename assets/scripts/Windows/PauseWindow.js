import { uiElements } from "../Elements.js";
import PopupModal from "../PopupModal.js";

export default class PauseWindow {
  #gameController;

  constructor(gameController) {
    this.#gameController = gameController;
    this.pauseMenu = new PopupModal("gamePauseMenu", false);
    this.pauseMenu.setTitle("Paused");
    this.pauseMenu.setTitleColor("light");
    // this.pauseMenu.show();
    this.#initializeButtons();
  }

  #initializeButtons() {
    uiElements.pauseMenu.continueButton.addEventListener("click", () => {
      this.hide();
      this.#gameController.continueGame();
    });

    uiElements.pauseMenu.restartButton.addEventListener("click", () => {
      this.hide();
      this.#gameController.restartGame();
    });

    uiElements.pauseMenu.homeButton.addEventListener("click", () => {
      this.hide();
      this.#gameController.stopGame();
    });
  }

  show() {
    this.pauseMenu.show();
  }

  hide() {
    this.pauseMenu.hide();
  }
}
