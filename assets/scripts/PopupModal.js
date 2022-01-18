export default class PopupModal {
  #isClosable;
  #modalId;

  #modal;
  #modalBody;
  #modalHeader;
  #modalClose;
  #types = {
    normal: "black",
    error: "red",
    light: "white",
    dark: "brown",
  };

  constructor(modalId, isClosable = true) {
    this.#modalId = modalId;
    this.#isClosable = isClosable;

    this.#initializeModal();
    this.#setClickEvents();
  }

  #initializeModal() {
    this.#modal = document.getElementById(this.#modalId);
    this.#modalHeader = this.#modal.querySelector(".modal-header>p");
    this.#modalBody = this.#modal.querySelector(".modal-body");
    this.#modalClose = this.#modal.querySelector(".close");
    this.#modalClose.style.display = this.#isClosable ? "block" : "none";
  }

  #setClickEvents() {
    this.#modalClose.onclick = () => {
      if (this.#isClosable) this.hide();
    };
    window.addEventListener("click", (event) => {
      if (event.target == this.#modal) {
        if (this.#isClosable) this.hide();
      }
    });
  }

  get modalId() {
    return this.#modalId;
  }

  get header() {
    return this.#modalHeader;
  }

  show(title, bodyContent, type) {
    if (type) this.setTitleColor(type);
    if (title) this.setTitle(title);
    if (bodyContent) this.setBodyContent(bodyContent);
    document.getElementById(this.modalId).style.display = "block";
  }

  hide() {
    this.#modal.style.display = "none";
  }

  setTitle(modalTitle) {
    this.#modalHeader.innerHTML = modalTitle;
  }

  setTitleColor(type) {
    if (type in this.#types) {
      this.#modalHeader.style["color"] = this.#types[type];
    }
  }

  setClosable(isClosable) {
    this.#isClosable = isClosable;
    this.#modalClose.style.display = this.#isClosable ? "block" : "none";
  }

  setBodyContent(bodyContent) {
    if (typeof bodyContent === "object") {
      this.#modalBody.append(bodyContent);
    } else {
      this.#modalBody.innerHTML = bodyContent;
    }
  }
}
