export const invalidateUserName = function (userInput) {
  if (!userInput) {
    return {
      success: false,
      message: "You have to enter your name first!",
    };
  } else if (/[^a-zA-Z\s]/g.test(userInput)) {
    return {
      success: false,
      message: "Just characters and space is allowed [a-Z] & [0-9]",
    };
  } else if (userInput.length > 15 || userInput.length < 3) {
    return {
      success: false,
      message:
        "The name is too long, your name must be between 3 and 15 characters!",
    };
  }
  return {
    success: true,
    userName: userInput,
  };
};

export const formatSeconds = function (seconds) {
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  // let h = Math.floor(seconds / 3600);
  let m = Math.floor(seconds / 60); /* -  * 60h */
  let s = Math.floor(seconds /* - h  * 3600*/ - m * 60);
  return /* pad(h) + ":" + */ pad(m) + ":" + pad(s);
};

export const getRandomOffset = function (number, offset) {
  let min = number - offset;
  let max = number + offset;
  return min + (Math.random() * (max - min));
};
