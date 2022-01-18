import { uiElements } from "./Elements.js";
import { defaults } from "./Defaults.js"

export const getUserData = function (username) {
  if (defaults.offlineMode) {
    updateDateElement();
    return;
  }

  fetch(`???/${username}`)
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      updateDateElement(data.date);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function updateDateElement(date) {
  // TODO: format the date
  date = date ? new Date(date).toLocaleString("en-US") : "Offline Mode";
  uiElements.game.lastDate.innerHTML = date;
}


// ----- * ----- * ----- * ----- * ----- * -----

export const saveUserData = function (username) {
  if (defaults.offlineMode) {
    updateDateElement();
    return;
  }

  const data = { name: username };

  fetch('???/games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

