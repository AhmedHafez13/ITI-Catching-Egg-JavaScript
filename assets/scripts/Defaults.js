export const difficultyLevels = {
  easy: { pushEgg: 1000, eggMove: 50, target: 10 },
  normal: { pushEgg: 1500, eggMove: 30, target: 5 },
  hard: { pushEgg: 2000, eggMove: 10, target: 30 },
};

export const defaults = {
  gameTime: 15,
  gameTarget: 1,
  difficulty: difficultyLevels.normal,
  offlineMode: true,
  eggsFallingTick: 500, // 500 ms
  isSoundsOn: true
}