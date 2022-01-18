import ScreensController from "./ScreensController.js";
import PopupModal from "./PopupModal.js";
import SoundController from "./SoundController.js";
import { invalidateUserName } from "./Utils.js";
import { GameController } from "./GameController.js";
import { uiElements } from "./Elements.js";

/* ----- * ----- Global Data ----- * ----- */

const userData = {
  name: ""
}

/* ----- * ----- UI Components ----- * ----- */

const alertModal = new PopupModal("alertModal");

/* ----- * ----- Controller ----- * ----- */

const soundController = new SoundController();
const screenController = new ScreensController();
const gameController = new GameController(screenController, soundController, userData);

/* ----- * ----- Functions ----- * ----- */

setTimeout(() => {
  screenController.showScreen(uiElements.screens.welcomePanel);
}, 1000);

/* ----- * ----- Events ----- * ----- */

uiElements.enterGameButton.addEventListener("click", function () {
  let result = invalidateUserName(uiElements.nameInput.value);
  if (result.success) {
    userData.name = result.userName;
    soundController.playBackgroundMusic();
    screenController.enterTheGame(userData.name);
  } else {
    alertModal.show("Error", result.message, "error");
  }
});

uiElements.backToWelcomeButton.addEventListener("click", function () {
  soundController.pauseBackgroundMusic();
  screenController.showWelcomePanel();
});

uiElements.startPlayingButton.addEventListener("click", function () {
  screenController.showGameScreen();
  gameController.startNewGame();
});

