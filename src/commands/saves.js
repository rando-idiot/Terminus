import { Command } from "../terminal.js";
import { save as save_, load as load_ } from "../lib/save.js"; 

export const save = Command(function save(game) {
  game.terminal.clear(1, false)
  save_("game", game);
})

export const load = Command(function load(game) {
  load_("game", game)
})

export const reset = Command(function hardReset() {
  localStorage.clear()
  location.reload()
})
