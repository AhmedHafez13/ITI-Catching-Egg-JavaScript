export const uiElements = {
  nameInput: document.querySelector("div.name-input>input"),
  enterGameButton: document.getElementById("enterGameBtn"),
  backToWelcomeButton: document.getElementById("backToWelcome"),
  startPlayingButton: document.getElementById("startPlaying"),
  gameMenuButton: document.getElementById("gameMenuButton"),
  menuPlayerName: document.querySelector("#mainMenu .user-name"),
  screens: {
    loadingIndicator: document.querySelector(".loadingIndicator"),
    welcomePanel: document.getElementById("welcomePanel"),
    mainMenu: document.getElementById("mainMenu"),
    game: document.getElementById("gameScreen"),
  },
  game: {
    contianer: document.querySelector(".game-play"),
    basket: document.querySelector("#gameScreen .game-basket"),
    playerName: document.querySelector("#playerName"),
    lastDate: document.querySelector("#lastGameDate"),
    timer: document.querySelector("#timerCounter"),
    level: document.querySelector("#gameLevel"),
    target: document.querySelector("#gameTarget"),
    score: document.querySelector("#gameScore"),
  },
  pauseMenu: {
    continueButton: document.querySelector(
      "#gamePauseMenu .modal-body .continue"
    ),
    restartButton: document.querySelector(
      "#gamePauseMenu .modal-body .restart"
    ),
    homeButton: document.querySelector("#gamePauseMenu .modal-body .home"),
  },
  scoreWindow: {
    nextLevel: document.querySelector("#gameScoreWindow .next"),
    restart: document.querySelector("#gameScoreWindow .restart"),
    home: document.querySelector("#gameScoreWindow .home"),
    winnerDiv: document.querySelector("#gameScoreWindow .winner"),
    loserDiv: document.querySelector("#gameScoreWindow .loser"),
  }
};
