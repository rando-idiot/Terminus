import { spawn, sleep } from "./lib/helpers.js";
import { Command, Terminal } from "./terminal.js";
import * as CMD from "./commands/mod.js";
import { serialize, load, save } from "./lib/save.js";

export class Game {
  /** @type {Terminal} */
  terminal;
  /** @type {string} */
  version;

  constructor() {
    this.terminal = new Terminal(
      document.body.querySelector("#terminal"),
      this
    );
    this.version = "0.0.0-dev";

    this.#init();
    this.#run();
  }

  #init() {
    const { terminal } = this;
    console.log(CMD);
    terminal.useCommands(CMD.terminalCmds);
    terminal.useCommands(CMD.saveCmds);
  }

  #run() {
    const { terminal } = this;

    spawn(async () => {
      await sleep(250);
      if (load("game", this)) return; // void console.log("loaded", this)
      terminal.write("italic", "Welcome to Terminus.JS");
      await sleep(1750);
      terminal.log("This is an early development build.");
      await sleep(1750);
      terminal.log(
        "This means that many things is unfinished and you may encounter bugs.\n"
      );
      await sleep(3000);
      terminal.log("Enter 'start' to begin");
      terminal.useCommands(CMD.intro);
      save("game", this);
    });
  }

  toJson() {
    return serialize({
      class: "Game",
      terminal: this.terminal,
      version: this.version,
    });
  }

  fromJson(obj) {
    console.log(this, obj);
    this.terminal.fromJson(obj.terminal);
    if (this.version !== obj.version)
      console.warn(
        `Loading save from version: ${obj.version}, current: ${this.version}`
      );
    this.version = obj.version;
  }
}
