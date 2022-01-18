import { getUserData, saveUserData } from "./APIUtils.js";
import { defaults, difficultyLevels } from "./Defaults.js";
import { uiElements } from "./Elements.js";
import Basket from "./Objects/Basket.js";
import Egg from "./Objects/Egg.js";
import { formatSeconds } from "./Utils.js";
import GamePauseMenu from "./Windows/PauseWindow.js";
import ScoreWindow from "./Windows/ScoreWindow.js";

/* ----- * ----- * Global Data * ----- * ----- */

let gameData = {};

/* ----- * ----- * GameController (class) * ----- * ----- */

export class GameController {
  /* ----- * Variables * ----- */
  #secondsCounter;
  #counterInterval;
  #pushingEggsInterval;
  #difficulty;

  /* ----- * Ref * ----- */
  #screenContoller;
  #soundController;
  #userData;

  constructor(screenContoller, soundController, userData) {
    this.#screenContoller = screenContoller;
    this.#soundController = soundController;
    this.#userData = userData;
    this.basket = new Basket();
    this.pauseMenu = new GamePauseMenu(this);
    this.scoreWindow = new ScoreWindow(this);
    this.#initializeGameMenuButton();
  }

  #initializeGameMenuButton() {
    uiElements.gameMenuButton.addEventListener("click", () => {
      this.pauseGame();
      this.pauseMenu.show();
    });
  }

  /* ----- * Game Controls * ----- */

  startNewGame(currentLevel = 1, difficulty = defaults.difficulty) {
    getUserData(this.#userData.name);

    this.#difficulty = difficulty;

    this.#resetAllValues(currentLevel);
    this.#resetAllUI();

    if (!this.#pushingEggsInterval) {
      this.#pushNewEgg();

      this.#pushingEggsInterval = setInterval(() => {
        if (this.isGameRunning) this.#pushNewEgg();
      }, this.#difficulty.pushEgg);


      this.#counterInterval = setInterval(() => {
        if (this.isGameRunning) {
          if (--this.#secondsCounter < 0) this.#showScore();
          else this.#updateCounterUI();
        }
      }, 1000);
    }
  }

  pauseGame() {
    this.isGameRunning = false;
  }

  continueGame() {
    this.isGameRunning = true;
  }

  restartGame() {
    this.#endTheGame();
    setTimeout(() => {
      this.startNewGame();
    }, 1000);
  }

  stopGame() {
    this.#endTheGame();
    this.#screenContoller.showMainMenu();
  }

  startNextLevel(nextLevel) {
    this.#soundController.makeLevelUpSound();
    this.startNewGame(nextLevel);
  }

  get soundController() {
    return this.#soundController;
  }

  /* ----- * Reset all values to the defaut values * ----- */

  #resetAllValues(level = 1) {
    gameData = {
      score: 0,
      target: this.#difficulty.target,
      level: level,
      eggsArray: [],
    };

    this.isGameRunning = true;
    this.#secondsCounter = defaults.gameTime;
    this.#counterInterval = null;
    this.#pushingEggsInterval = null;

    this.#resetAllUI();
  }

  #resetAllUI() {
    this.#updateCounterUI();
    this.#updateScoreUI();
    this.#updateLevelInfoUI();
  }

  /* ----- * UI * ----- */

  #updateCounterUI() {
    let formatedTime = formatSeconds(this.#secondsCounter);
    uiElements.game.timer.innerHTML = formatedTime;
  }

  #updateScoreUI() {
    uiElements.game.score.innerText = gameData.score;
  }

  #updateLevelInfoUI() {
    uiElements.game.target.innerHTML = gameData.target;
    uiElements.game.level.innerHTML = gameData.level;
  }

  /* ----- * Game Actions * ----- */

  #pushNewEgg() {
    gameData.eggsArray.push(
      new Egg(this.#difficulty, this)
    );
  }

  onEggReachGround = function (onBasket) {
    if (onBasket) {
      gameData.score++;
      this.#updateScoreUI();
    }
  };

  #showScore() {
    // TODO: make a post request ddd
    // Get the next level before resetting all values
    saveUserData(this.#userData.name);

    if (gameData.score >= gameData.target) {
      let nextLevel = gameData.level + 1;
      this.#soundController.makeScoreSound(true);
      this.scoreWindow.showWinner(nextLevel);
    } else {
      this.#soundController.makeScoreSound(false);
      this.scoreWindow.showLoser();
    }
    this.#endTheGame();
  }

  #endTheGame() {
    // Reset all values and destroy all eggs
    gameData.eggsArray.forEach((egg) => {
      if (egg) egg.destroyEggObject();
    });
    clearInterval(this.#counterInterval);
    clearInterval(this.#pushingEggsInterval);
  }
}
