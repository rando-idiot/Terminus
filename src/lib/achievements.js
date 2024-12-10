import { isDefined } from './helpers.js'
import { Terminal } from './terminal.js'

/**
 * @typedef {number} AchievementId
 */

export class Achievements {
  #all = []
  /** @type {Terminal} */
  #terminal = undefined

  constructor(/** @type {{terminal: Terminal} */ parameters) {
    this.#terminal = parameters.terminal
  }

  /**
   * @example
   * const new_achievement = achievements.add({
   *     name: "New achievement.",
   *     description: "Achievement example.",
   *     eventValue: "points",
   *     criteria: (p) => p >= 1,
   *     action: () => terminal.log("New Achievement: Well, it's a start."),
   * })
   * @param {object} parameters
   * @param {number} parameters.name
   * @param {string} parameters.description
   * @param {Array<AchievementId>?} parameters.requirements
   * @param {(criteria: any, func: () => void, options: {once: boolean}) => any} parameters.eventSubscription
   * @param {(value) => boolean} parameters.criteria
   * @param {() => void} parameters.action
   * @returns {AchievementId}
   */
  add(parameters) {
    const achievement = new Achievement({
      id: this.#all.length,
      name: parameters.name,
      description: parameters.description,
      requirements: [],
      terminal: this.#terminal,
      achievements: this,
      eventSubscription: parameters.eventSubscription,
    });

    this.#all.push(achievement)

    return achievement.id
  }

  get(/** @type {AchievementId} */ id) {
    return this.#all[id]
  }

  toString() {
    return (
      'Achievements\n\n' +
      this.#all
        .filter((/** @type {Achievement} */ a) => a.visible)
        .map(String)
        .join('\n--------------------\n')
    )
  }
}

export class Achievement {
  id
  name
  description
  criteria
  parents = []
  children = []
  achieved = false
  #visible = false
  /**
   * @example
   * new Achievement({
   *     id: 0,
   *     name: "New achievement.",
   *     description: "Achievement example.",
   *     
   * })
   * @param {object} parameters
   * @param {number} parameters.id
   * @param {number} parameters.name
   * @param {string} parameters.description
   * @param {Array<AchievementId>} parameters.requirements
   * @param {(criteria: any, func: () => void, options: {once: boolean}) => any} parameters.eventSubscription
   * @param {Terminal} parameters.terminal
   * @param {Achievements} parameters.achievements
   */
  constructor(parameters) {
    const { terminal, achievements } = parameters
    this.name = parameters.name
    this.description = parameters.description

    if (isDefined(parameters.requirements)) {
      parameters.requirements.forEach((parent) => {
        this.parents.push(parent.id)
        parent.children.push(this.id)
      })
    } else this.#visible = true

    this.criteria = parameters.eventSubscription(
      (foo) => {
        return parameters.criteria(foo)
      },
      () => {
        this.achieved = true
        this.#visible = true
        this.children.forEach((child) => {
          const other = achievements.get(child)
          if (
            !other.#visible &&
            other.parents.every((p) => achievements.get(p).achieved)
          )
            other.#visible = true
        })
        terminal.log('New Achievement: ' + this.name)
        parameters.action()
      },
      { once: true }
    )

  }

  get visible() {
    return this.#visible;
  }

  toString() {
    return `${this.achieved ? '✔' : '✘'} ${this.name}\n` + this.description
  }
}
