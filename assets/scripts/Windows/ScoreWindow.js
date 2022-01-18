import { uiElements } from "../Elements.js";
import PopupModal from "../PopupModal.js";

export default class ScoreWindow {
  #nextLevel;

  #gameController;

  constructor(gameController) {
    this.#gameController = gameController;
    this.scoreWindow = new PopupModal("gameScoreWindow", false);
    this.scoreWindow.setTitle("LoseR");
    this.scoreWindow.setTitleColor("dark");
    // this.scoreWindow.show();
    this.#initializeButtons();
  }

  #initializeButtons() {
    uiElements.scoreWindow.nextLevel.addEventListener("click", () => {
      this.hide();
      this.#gameController.startNextLevel(this.#nextLevel);
    });

    uiElements.scoreWindow.restart.addEventListener("click", () => {
      this.hide();
      this.#gameController.restartGame();
    });

    uiElements.scoreWindow.home.addEventListener("click", () => {
      this.hide();
      this.#gameController.stopGame();
    });
  }

  showWinner(nextLevel) {
    this.#nextLevel = nextLevel;

    uiElements.scoreWindow.loserDiv.style.display = "none";
    uiElements.scoreWindow.winnerDiv.style.display = "block";
    uiElements.scoreWindow.nextLevel.style.display = "";

    this.scoreWindow.header.className = "win";
    this.scoreWindow.setTitle("WinneR");
    this.scoreWindow.show();
  }

  showLoser() {
    uiElements.scoreWindow.loserDiv.style.display = "block";
    uiElements.scoreWindow.winnerDiv.style.display = "none";
    uiElements.scoreWindow.nextLevel.style.display = "none";
    
    this.scoreWindow.header.className = "loss";
    this.scoreWindow.setTitle("LoseR");
    this.scoreWindow.show();
  }

  hide() {
    this.scoreWindow.hide();
  }
}
