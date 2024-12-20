import { assert, debounce, hash, isDefined, isNumber, sleep } from './lib/helpers.js'
import { events } from './lib/events.js'
import { serialize, makeClassGlobal } from './lib/save.js'
import { Game } from './game.js'

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
  /** @type {{[name: string]: id: number}} */
  #commands = {}
  /** @type {string?} */
  #commandTyped = null
  #ElementP = document.createElement('p')
  #joinLine = '\n\n'

  /**
   * @param {HTMLElement} terminalElement
   * @param {Game} game 
   */
  constructor(terminalElement, game) {
    newCommandLock()
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
          this.#run(command, game)
          return false
      }
      afterTyping()
    })
  }

  useCommands(commands) {
    if (!(commands instanceof Array))
      commands = Object.values(commands)

    for (const cmd of commands) {
      this.useCommand(cmd)
    }
  }

  /** @param {{name: string, id: number}} command  */
  useCommand(command) {
    assert(typeof command !== "function", "Supplying functions is forbidden")
    assert(isDefined(command.name) && isDefined(command.id), 'Command must have a name and id.')

    this.#commands[command.name] = command.id// COMMANDS[command.name][command.id]
  }

  removeCommand(name) {
    assert(isDefined(this.#commands[name]), `Command ${name} does not exist.`)

    delete this.#commands[name]
  }

  #run(rawCommand, game) {
    let [command, ...args] = rawCommand.split(' ')

    
    if (this.#commands[command] === undefined)
      return void this.error(`Command ${command} does not exist.`)

    args = args.map((arg) => (isNumber(arg) ? Number(arg) : arg))

    try {
      this.log('> ' + rawCommand)
      COMMANDS[command][this.#commands[command]](game, ...(args || []))
    } catch (err) {
      if (!err) return
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
    this.write('warn', args.join(this.#joinLine))
  }

  error(...args) {
    this.write('error', args.join(this.#joinLine))
  }

  debug(...args) {
    this.write('debug', ...args)
  }

  break() {
    this.write('break', '\n')
  }

  clear(lines = -1, throws = true) {
    if (lines < 0) {
      this.#logs = []
      this.#logsElement.innerHTML = ""
    } else for (;lines > 0; lines--) {
      this.#logs.pop()
      this.#logsElement.removeChild(this.#logsElement.firstChild)
    }
    
    if (throws) throw false
  }

  toJson() {
    return serialize({
      class: "Terminal",
      logs: this.#logs,
      history: this.#history,
      historyIndex: this.#historyIndex,
      commands: this.#commands,
      commandTyped: this.#commandTyped,
      joinLine: this.#joinLine,
      globalCommands: COMMANDS,
    })
  }

  /**
   * Doesn't take a json string, but a parsed object.
   */
  fromJson(src) {
    this.clear(-1, false)
    for (const [style, args] of src.logs) {
      this.write(style, args)
    }
    this.#history = src.history ?? this.#history
    this.#historyIndex = src.historyIndex ?? this.#historyIndex
    this.#commands = src.commands ?? this.#commands
    for (const [name, hashes] of Object.entries(src.globalCommands).filter(([n, _]) => n !== "class")) {
      COMMANDS[name]
        ?.filter((f, id) => (f.hash !== hashes[id]))
        ?.forEach((cond, id) => void console.warn(`Command ${serialize([name, id])} got changed.`))
    }
    this.#commandTyped = src.commandTyped ?? this.#commandTyped
    this.#joinLine = src.joinLine ?? this.#joinLine
    if (this.#historyIndex !== this.#history.length) {
      this.#inputElement.value = this.#history[this.#historyIndex]
    } else {
      this.#inputElement.value = this.#commandTyped ?? ""
    }
  }
}
makeClassGlobal(Terminal)

/** @type {{[name: string]: Array<(game: Game, ...args: (string | number)[]) => void>} */
const COMMANDS = {}
let NEW_COMMANDS_ALLOWED = true

function newCommandLock() {
  NEW_COMMANDS_ALLOWED = false
}

export function Command(/** @type {(game: Game, ...args: (string | number)[]) => void>} */ fn) {
  assert(NEW_COMMANDS_ALLOWED, "Creating commands after game initialization is forbidden")
  assert(isDefined(fn.name), "Command function must have a name")

  fn.hash = hash(fn.toString())

  let id = COMMANDS[fn.name]?.findIndex(f => f.hash === fn.hash) ??
    (COMMANDS[fn.name] = [], -1)

  if (id === -1) {
    id = COMMANDS[fn.name].length
    COMMANDS[fn.name].push(fn)
  }

  return { name: fn.name, id }
}
