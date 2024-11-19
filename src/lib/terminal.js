import { sleep } from "./helpers.js";

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
                    } else {
                        this.#inputElement.value =
                            this.#history[this.#historyIndex];
                    }
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

    #run(command) {
        if (!this.#commands[command]) {
            this.error(`Command ${command} does not exist.`);
            return;
        }

        this.log(`${command}:`);
        this.#commands[command]();
    }

    log(...args) {
        if (this.#logsElement.children.length > 100) {
            this.#logsElement.removeChild(this.#logsElement.lastChild);
        }

        this.#ElementP.innerText = args.join(this.#joinLine);
        this.#logsElement.innerHTML = this.#ElementP.outerHTML +
            this.#logsElement.innerHTML;
    }

    warn(...args) {
        if (this.#logsElement.children.length > 100) {
            this.#logsElement.removeChild(this.#logsElement.lastChild);
        }

        this.#ElementP.innerText = args.join(this.#joinLine);
        this.#ElementP.classList.add("warn");
        this.#logsElement.innerHTML = this.#ElementP.outerHTML +
            this.#logsElement.innerHTML;
        this.#ElementP.classList.remove("warn");
    }

    error(...args) {
        if (this.#logsElement.children.length > 100) {
            this.#logsElement.removeChild(this.#logsElement.lastChild);
        }

        this.#ElementP.innerText = args.join(this.#joinLine);
        this.#ElementP.classList.add("error");
        this.#logsElement.innerHTML = this.#ElementP.outerHTML +
            this.#logsElement.innerHTML;
        this.#ElementP.classList.remove("error");
    }

    mus(...args) {
        if (this.#logsElement.children.length > 100) {
            this.#logsElement.removeChild(this.#logsElement.lastChild);
        }

        this.#ElementP.innerText = "Now playing: " + args.join(this.#joinLine);
        this.#ElementP.classList.add("mus");
        this.#logsElement.innerHTML = this.#ElementP.outerHTML +
            this.#logsElement.innerHTML;
        this.#ElementP.classList.remove("mus");
    }

    debug(...args) {
        if (this.#logsElement.children.length > 100) {
            this.#logsElement.removeChild(this.#logsElement.lastChild);
        }

        this.#ElementP.innerText = args.join(this.#joinLine);
        this.#ElementP.classList.add("debug");
        this.#logsElement.innerHTML = this.#ElementP.outerHTML +
            this.#logsElement.innerHTML;
        this.#ElementP.classList.remove("debug");
    }

    break() {
        this.#ElementP.innerText = "\n";
        this.#ElementP.classList.add("break");
        this.#logsElement.innerHTML = this.#ElementP.outerHTML +
            this.#logsElement.innerHTML;
        this.#ElementP.classList.remove("break");
    }
}
