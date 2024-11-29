import { isNumber, sleep } from "./helpers.js";
import { events } from "./events.js";

/**
 * @typedef {"log" | "warn" | "error" | "mus" | "debug" | "italic" | "bold" | "x2size" | "x3size" | "classic" | "break" | "pointsdisplay"} LogStyle
 */

export class Terminal {
    /** @type {string[]} */
    #logs = [];
    /** @type {string[]} */
    #history = [];
    /** @type {number} */
    #historyIndex = 0;
    /** @type {HTMLInputElement} */
    #inputElement;
    /** @type {HTMLElement} */
    #logsElement;
    /** @type {{[key: string]: () => void}} */
    #commands = {};
    /** @type {string?} */
    #commandTyped = null;
    #ElementP = document.createElement("p");
    #joinLine = "\n\n";

    /** @type {boolean} */
    #isClassic = false;

    /**
     * @param {HTMLElement} terminalElement
     */
    constructor(terminalElement) {
        this.#inputElement = terminalElement.querySelector("#terminal #input");
        this.#logsElement = terminalElement.querySelector("#terminal #log");

        let notTyping = 0;
        this.#inputElement.addEventListener("keydown", async (e) => {
            switch (e.key) {
                case "ArrowUp":
                    e.preventDefault();
                    if (this.#commandTyped === null) {
                        this.#commandTyped = this.#inputElement.value;
                    }
                    if (this.#historyIndex <= 0) return;
                    this.#inputElement.value =
                        this.#history[--this.#historyIndex];
                    return;
                case "ArrowDown":
                    e.preventDefault();
                    if (this.#historyIndex >= this.#history.length) return;
                    if (++this.#historyIndex === this.#history.length) {
                        this.#inputElement.value = this.#commandTyped || "";
                        this.#commandTyped = null;
                        if (this.#historyIndex === this.#history.length) return;
                    }
                    this.#inputElement.value =
                        this.#history[this.#historyIndex];
                    return;
                case "Enter":
                    const command = this.#inputElement.value;
                    if (command === "") return;
                    this.#commandTyped = null;
                    if (command !== this.#history.at(-1)) {
                        this.#history.push(command);
                    }
                    this.#historyIndex = this.#history.length;
                    this.#inputElement.value = "";
                    this.#run(command);
                    return;
            }

            notTyping++;
            await sleep(400);
            if ((notTyping -= 1) >= 1) return;
            // code there will be run only after the user has stopped typing

            this.#commandTyped = this.#inputElement.value;
        });
    }

    addCommand(func) {
        const name = func.name;
        if (!name) throw new Error("Command function must have a name.");

        if (this.#commands[name]) {
            throw new Error(`Command ${name} already exists.`);
        }
        this.#commands[name] = func;
    }
    changeCommand(func) {
        const name = func.name;
        if (!name) throw new Error("Command function must have a name.");

        if (!this.#commands[name]) {
            throw new Error(`Command ${name} does not exist.`);
        }
        this.#commands[name] = func;
    }
    removeCommand(name) {
        if (!this.#commands[name]) {
            throw new Error(`Command ${name} does not exist.`);
        }
        delete this.#commands[name];
    }

    #run(rawCommand) {
        let [command, ...args] = rawCommand.split(" ");

        if (!this.#commands[command]) {
            this.error(`Command ${command} does not exist.`);
            return;
        }

        args = args.map((arg) => (isNumber(arg) ? Number(arg) : arg));

        try {
            this.#commands[command](...(args || []));
        } catch (err) {
            this.error(err);
        }
    }

    toggleClassic() {
        this.#isClassic = !this.#isClassic;
    }

    /**
     * @param {LogStyle} style
     * @param  {...any} args
     */
    write(style, ...args) {
        if (this.#logsElement.children.length > 100) {
            this.#logsElement.removeChild(this.#logsElement.lastChild);
        }

        this.#ElementP.innerText = args.join(this.#joinLine);
        this.#ElementP.classList.add(style);
        this.#logsElement.innerHTML = this.#ElementP.outerHTML +
            this.#logsElement.innerHTML;
        this.#ElementP.classList.remove(style);
    }
    log(...args) {
        this.write(this.#isClassic ? "classic" : "log", ...args);
    }
    warn(...args) {
        this.write(this.#isClassic ? "classic" : "warn", this.#isClassic ? "⚠ " + args.join(this.#joinLine) : args.join(this.#joinLine));
    }
    error(...args) {
        this.write(this.#isClassic ? "classic" : "error", this.#isClassic ? "⮾ " + args.join(this.#joinLine) : args.join(this.#joinLine));
    }
    mus(...args) {
        this.write("mus", "Now playing: " + args.join(this.#joinLine));
    }
    debug(...args) {
        this.write("debug", ...args);
    }
    break() {
        this.write("break", "\n");
    }
    display(varname, givenvar) {
        this.write("pointsdisplay", varname + ": " + givenvar);
    }
    clear() {
        for (let i = 0; i < 100; i++) {
            this.write("break", "\n")
        } 
    }
}
