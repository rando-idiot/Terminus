class Terminal {
    /** @type {string[]} */
    #log = [];
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
                        console.log(
                            this.#commandTyped,
                            this.#inputElement.value,
                        );
                        this.#commandTyped = this.#inputElement.value;
                    }
                    if (this.#historyIndex <= 0) return;
                    this.#inputElement.value =
                        this.#history[--this.#historyIndex];
                    return;
                case "ArrowDown":
                    e.preventDefault();
                    console.log(this.#historyIndex + 1);
                    if (this.#historyIndex >= this.#history.length) return;
                    if (++this.#historyIndex === this.#history.length) {
                        this.#inputElement.value = this.#commandTyped || "";
                        this.#commandTyped = null;
                        if (this.#historyIndex === this.#history.length) return;
                    }
                    console.log("possibly undefined");
                    this.#inputElement.value =
                        this.#history[this.#historyIndex];
                    return;
                case "Enter":
                    const command = this.#inputElement.value;
                    if (command === "") return;
                    this.#history.push(command);
                    this.#historyIndex = this.#history.length;
                    this.#inputElement.value = "";
                    this.#run(command);
                    this.#commandTyped = null;
                    return;
            }

            notTyping++;
            await sleep(400);
            if ((notTyping -= 1) >= 1) return;
            // code there will be run only after the user has stopped typing

            this.#commandTyped = this.#inputElement.value;
            console.log("after typing: ", this);
        });
    }

    addCommand(name, action) {
        if (this.#commands[name]) {
            throw new Error(`Command ${name} already exists.`);
        }
        this.#commands[name] = action;
    }
    changeCommand(name, action) {
        if (!this.#commands[name]) {
            throw new Error(`Command ${name} does not exist.`);
        }
        this.#commands[name] = action;
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

        this.#commands[command]();
    }

    log(...args) {
        console.log("logged:", ...args);
        this.#ElementP.innerText = args.join("<br>");
        this.#logsElement.innerHTML = this.#ElementP.outerHTML +
            this.#logsElement.innerHTML;
    }
    warn(...args) {
        console.warn("logged:", ...args);
        this.#ElementP.innerText = args.join("<br>");
        this.#ElementP.classList.add("warn");
        this.#logsElement.innerHTML = this.#ElementP.outerHTML +
            this.#logsElement.innerHTML;
    }
    error(...args) {
        console.error("logged:", ...args);
        this.#ElementP.innerText = args.join("<br>");
        this.#ElementP.classList.add("error");
        this.#logsElement.innerHTML = this.#ElementP.outerHTML +
            this.#logsElement.innerHTML;
    }
}

const terminal = new Terminal(document.body.querySelector("#terminal"));
terminal.addCommand("warn", () => terminal.warn("warning"));
