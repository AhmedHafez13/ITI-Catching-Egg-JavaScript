import { defaults } from "./Defaults.js";

let backgroundMusic = new Audio("../assets/sounds/Country_Music_Farm_Game.mp3");

let soundEffect1 = new Audio("../assets/sounds/effects/click1.wav");
let soundEffect2 = new Audio("../assets/sounds/effects/click2.wav");
let soundEffect3 = new Audio("../assets/sounds/effects/rollover4.wav");
let eggBasketEffect = new Audio("../assets/sounds/effects/switch17.wav");
let eggBreakEffect = new Audio("../assets/sounds/effects/switch34.wav");
let congratsSound = new Audio(
  "../assets/sounds/effects/voice_congratulats.ogg"
);
let congratsEffect = new Audio("../assets/sounds/effects/jingles_STEEL10.ogg");
let gameOverSound = new Audio("../assets/sounds/effects/voice_game_over.ogg");
let gameOverEffect = new Audio("../assets/sounds/effects/jingles_SAX07.ogg");
let levelUpSound = new Audio("../assets/sounds/effects/voice_level_up.ogg");

export default class SoundController {
  #isSoundOn = defaults.isSoundsOn;
  #soundButton;
  constructor() {
    document.querySelectorAll(".sound-1").forEach((element) => {
      element.addEventListener("mousedown", () => {
        if (this.#isSoundOn) soundEffect1.play();
      });
      element.addEventListener("mouseenter", () => {
        if (this.#isSoundOn) soundEffect3.play();
      });
    });

    document.querySelectorAll(".sound-2").forEach((element) => {
      element.addEventListener("mousedown", () => {
        if (this.#isSoundOn) soundEffect2.play();
      });
      element.addEventListener("mouseenter", () => {
        if (this.#isSoundOn) soundEffect3.play();
      });
    });

    this.#soundButton = document.getElementById("soundButton");
    this.#soundButton.addEventListener("click", () => {
      this.toggleSound();
    });
  }

  /**
   * @param {boolean} value
   */
  set sound(value) {
    this.#isSoundOn = value;
    this.playBackgroundMusic();
    this.#updateButtonUI();
  }

  /**
   * @return {boolean}
   */
  get sound() {
    return this.#isSoundOn;
  }

  toggleSound() {
    this.#isSoundOn = !this.#isSoundOn;
    this.playBackgroundMusic();
    this.#updateButtonUI();
  }

  #updateButtonUI() {
    this.#soundButton.setAttribute(
      "src",
      `../assets/images/buttons/sound_${this.#isSoundOn ? "on" : "off"}.png`
    );
  }

  makeEggSound(onBasket) {
    if (this.#isSoundOn) {
      if (onBasket) eggBasketEffect.play();
      else eggBreakEffect.play();
    }
  }

  makeScoreSound(isWinner) {
    if (this.#isSoundOn) {
      if (isWinner) {
        congratsSound.play();
        congratsEffect.play();
      } else {
        gameOverSound.play();
        gameOverEffect.play();
      }
    }
  }

  makeLevelUpSound() {
    if (this.#isSoundOn) levelUpSound.play();
  }

  playBackgroundMusic() {
    if (this.#isSoundOn) backgroundMusic.play();
    else backgroundMusic.pause();
  }

  pauseBackgroundMusic() {
    backgroundMusic.pause();
  }
}
