import { Command } from "../terminal.js";

export const clear = Command(function clear(game) {
  game.terminal.clear()
})
