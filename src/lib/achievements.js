import { isDefined } from "./helpers.js";

export class Achievement {
    static #all = [];
    static #terminal = undefined;

    static init(parameters) {
        this.#terminal = parameters.terminal;
    }

    static all() {
        // horror
        return "Achievements\n\n" +
            Achievement.#all.filter((a) => a.#visible).map(String)
                .join("\n--------------------\n");
    }

    id;
    name;
    description;
    criteria;
    parents = [];
    children = [];
    achieved = false;
    #visible = false;
    /**
     * @example
     * new Achievement({
     *     name: "New achievement.",
     *     description: "Achievement example.",
     *     eventValue: "points",
     *     criteria: (p) => p >= 1,
     *     action: () => terminal.log("New Achievement: Well, it's a start."),
     * })
     * @param {Object} parameters
     * @param {Number} parameters.name
     * @param {String} parameters.description
     * @param {Array<Achievement>?} parameters.requirements
     * @param {String} parameters.eventValueSubscription
     * @param {(value) => boolean} parameters.criteria
     * @param {() => void} parameters.action
     */
    constructor(parameters) {
        this.id = Achievement.#all.length;
        this.name = parameters.name;
        this.description = parameters.description;
        this.criteria = parameters.eventValueSubscription(
            (foo) => {
                return parameters.criteria(foo);
            },
            () => {
                this.achieved = true;
                this.#visible = true;
                this.children.forEach((child) => {
                    const other = Achievement.#all[child];
                    if (
                        !other.#visible &&
                        other.parents.every((p) => Achievement.#all[p].achieved)
                    ) other.#visible = true;
                });
                Achievement.#terminal.log("--------------------------------------\nNew Achievement:"  + this.name);
                Achievement.#terminal.log("\n--------------------------------------");

                parameters.action();
            },
            { once: true },
        );

        if (isDefined(parameters.requirements)) {
            parameters.requirements.forEach((parent) => {
                this.parents.push(parent.id);
                parent.children.push(this.id);
            });
        } else this.#visible = true;

        Achievement.#all.push(this);
    }

    toString() {
        return `${this.achieved ? "✔" : "✘"} ${this.name}\n` +
            this.description;
    }
}
