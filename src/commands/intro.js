import { Command } from "../terminal.js";

export const start = Command(function start(game) {
  game.terminal.clear();
});
