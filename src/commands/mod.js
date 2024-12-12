import { Command } from "../terminal.js";
import * as terminalCmds from "./terminal.js"
import * as saveCmds from "./saves.js"
import { serialize } from "../lib/save.js";

const foo = Command(function welcome(game) {
  let date = new Date();
  if (!Math.floor(Math.random() * 10000)) {
    game.terminal.write("italic", "Unwelcome to AntiTerminus.")
  } else if (date.getMonth() == 0 && getDate() == 1) {
    game.terminal.write ("Happy New Year! Welcome to Terminus.");
  } else if (date.getMonth() == 8 && date.getDate() == 15) {
    game.terminal.write(`It's Terminus.JS anniversary! Welcome!`);
  }
  return;
})

const help1 = Command(function help(game) {
  game.terminal.log(JSON.stringify([terminalCmds, saveCmds, firstStage, help]))
  game.terminal.useCommand(help2)
})

const help2 = Command(function help(game) {
  game.terminal.log("no helpful info for you :3")
})

const firstStage = { foo, help1 }
const secondStage = { help2 }

export { terminalCmds, saveCmds, firstStage }
