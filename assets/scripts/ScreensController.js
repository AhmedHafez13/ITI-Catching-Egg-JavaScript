import { uiElements } from "./Elements.js";

export default class ScreensController {
  #userName;

  enterTheGame(username) {
    this.#userName = username;
    this.showMainMenu();
  }
  showMainMenu() {
    uiElements.menuPlayerName.innerHTML = this.#userName;
    this.showScreen(uiElements.screens.mainMenu);
  }
  showWelcomePanel() {
    welcomePanel.querySelector("input[name=userName]").value = "";
    this.showScreen(uiElements.screens.welcomePanel);
  }
  showGameScreen() {
    uiElements.game.playerName.innerHTML = this.#userName;
    this.showScreen(uiElements.screens.game);
  }
  showScreen(screen) {
    for (let currentScreen in uiElements.screens) {
      uiElements.screens[currentScreen].style["display"] = "none";
    }
    screen.style["display"] = "block";
  }
}
