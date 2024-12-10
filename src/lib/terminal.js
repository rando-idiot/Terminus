import { assert, debounce, hash, isDefined, isNumber, sleep } from './helpers.js'
import { events } from './events.js'
import { serialize, makeClassGlobal } from './save.js'

/**
 * @typedef {"log" | "warn" | "error" | "mus" | "debug" | "italic" | "bold" | "x2size" | "x3size" | "classic" | "break" | "pointsdisplay"} LogStyle
 */

export class Terminal {
  /** @type {string[]} */
  #logs = []
  /** @type {string[]} */
  #history = []
  /** @type {number} */
  #historyIndex = 0
  /** @type {HTMLInputElement} */
  #inputElement
  /** @type {HTMLElement} */
  #logsElement
  /** @type {{[key: string]: () => void}} */
  #commands = {}
  /** @type {string?} */
  #commandTyped = null
  #ElementP = document.createElement('p')
  #joinLine = '\n\n'

  /**
   * @param {HTMLElement} terminalElement
   */
  constructor(terminalElement) {
    this.#inputElement = terminalElement.querySelector('#terminal #input')
    this.#logsElement = terminalElement.querySelector('#terminal #log')

    const afterTyping = debounce(() => {
      this.#commandTyped = this.#inputElement.value
    }, 400)

    this.#inputElement.addEventListener('keydown', async (e) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          if (this.#commandTyped === null) {
            this.#commandTyped = this.#inputElement.value
          }
          if (this.#historyIndex <= 0) return false
          this.#inputElement.value =
            this.#history[--this.#historyIndex]
          return false
        case 'ArrowDown':
          e.preventDefault()
          if (this.#historyIndex >= this.#history.length) return false
          if (++this.#historyIndex === this.#history.length) {
            this.#inputElement.value = this.#commandTyped || ''
            this.#commandTyped = null
            if (this.#historyIndex === this.#history.length) return false
          }
          this.#inputElement.value = this.#history[this.#historyIndex]
          return false
        case 'Enter':
          const command = this.#inputElement.value
          if (command === '') return false
          this.#commandTyped = null
          if (command !== this.#history.at(-1)) {
            this.#history.push(command)
          }
          this.#historyIndex = this.#history.length
          this.#inputElement.value = ''
          this.#run(command)
          return false
      }
      afterTyping()
    })
  }

  addCommand(func) {
    const name = func.name
    if (!name) throw new Error('Command function must have a name.')

    if (this.#commands[name]) {
      throw new Error(`Command ${name} already exists.`)
    }
    this.#commands[name] = func
  }
  changeCommand(func) {
    const name = func.name
    if (!name) throw new Error('Command function must have a name.')

    if (!this.#commands[name]) {
      throw new Error(`Command ${name} does not exist.`)
    }
    this.#commands[name] = func
  }
  removeCommand(name) {
    if (!this.#commands[name]) {
      throw new Error(`Command ${name} does not exist.`)
    }
    delete this.#commands[name]
  }

  #run(rawCommand) {
    this.log('> ' + rawCommand)

    let [command, ...args] = rawCommand.split(' ')

    if (!this.#commands[command]) {
      this.error(`Command ${command} does not exist.`)
      return
    }

    args = args.map((arg) => (isNumber(arg) ? Number(arg) : arg))

    try {
      this.#commands[command](...(args || []))
    } catch (err) {
      this.error(err)
      console.error(err)
    }
  }

  /**
   * @param {LogStyle} style
   * @param  {...any} args
   */
  write(style, ...args) {
    if (this.#logsElement.children.length > 100) {
      this.#logsElement.removeChild(this.#logsElement.lastChild)
      this.#logs.pop()
    }

    this.#logs.push([style, ...args])

    this.#ElementP.innerText = args.join(this.#joinLine)
    this.#ElementP.classList.add(style)
    this.#logsElement.innerHTML =
      this.#ElementP.outerHTML + this.#logsElement.innerHTML
    this.#ElementP.classList.remove(style)
  }

  log(...args) {
    this.write('log', ...args)
  }

  warn(...args) {
    this.write('warn', args.join(this.#joinLine)
    )
  }

  error(...args) {
    this.write('error', args.join(this.#joinLine)
    )
  }

  debug(...args) {
    this.write('debug', ...args)
  }

  break() {
    this.write('break', '\n')
  }

  clear() {
    this.#logs = []
    this.#logsElement.innerHTML = ""
  }

  toJson() {
    return serialize({
      class: "Terminal",
      logs: this.#logs,
      history: this.#history,
      historyIndex: this.#historyIndex,
      commands: this.#commands,
      commandTyped: this.#commandTyped,
      joinLine: this.#joinLine
    })
  }

  /**
   * Doesn't take a json string, but a parsed object.
   */
  fromJson(src) {
    console.log(this, src)
    for (const [style, args] of src.logs) {
      this.write(style, args)
    }
    this.#history = src.history ?? this.#history
    this.#historyIndex = src.historyIndex ?? this.#historyIndex
    for (const [key, val] of Object.entries(this.#commands)) {
      if (!isDefined(src.commands[key])) {
        console.warn(`Command \`${key}\` not found in save`)
        continue
      }
      if (hash(val.toString()) !== src.commands[key]) {
        console.warn(`Command \`${key}\` is changed`)
      }
    }
    this.#commandTyped = src.commandTyped ?? this.#commandTyped
    this.#joinLine = src.joinLine ?? this.#joinLine
    if (this.#historyIndex !== this.#history.length) {
      this.#inputElement.value = this.#history[this.#historyIndex]
    } else {
      this.#inputElement.value = this.#commandTyped ?? ""
    }
    console.log(this.#inputElement.value, this)
  }
}
makeClassGlobal(Terminal)
