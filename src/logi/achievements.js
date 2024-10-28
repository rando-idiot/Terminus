class Achievement {
    static #all = [];

    static checkAll() {
        console.log(
            "Achievements\n\n" +
                Achievement.#all.filter((a) => a.#visible).map(String)
                    .join("\n--------------------\n"),
        );
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
     *     action: () => console.log("New Achievement: Well, it's a start."),
     * })
     * @param {Object} parameters
     * @param {Number} parameters.name
     * @param {String} parameters.description
     * @param {Array<Achievement>?} parameters.requirements
     * @param {String} parameters.eventObject
     * @param {String} parameters.eventValue
     * @param {(value) => boolean} parameters.criteria
     * @param {() => void} parameters.action
     */
    constructor(parameters) {
        this.id = Achievement.#all.length;
        this.name = parameters.name;
        this.description = parameters.description;
        this.criteria = parameters.eventObject[parameters.eventValue + "$on"](
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
                console.log("New Achievement: " + this.name);
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
        return `${this.achieved ? "✅" : "❌"} ${this.name}\n` +
            this.description;
    }
}
function achievements() {
    Achievement.checkAll();
}

const start = new Achievement({
    name: "Well, it's a start.",
    description: "Earn your first point.",
    eventObject: game,
    eventValue: "points",
    criteria: (p) => p >= 1,
    action: () => {},
});
const brokeass = new Achievement({
    name: "Broke ass",
    description: "Collect 100 points.",
    requirements: [start],
    eventObject: game,
    eventValue: "points",
    criteria: (p) => p >= 100,
    action: () => {},
});
const momentum = new Achievement({
    name: "Momentum",
    description: "Collect 1000 points.",
    requirements: [brokeass],
    eventObject: game,
    eventValue: "points",
    criteria: (p) => p >= 1000,
    action: () => {},
});
const outage = new Achievement({
    name: "Outage",
    description: "Spend all power.",
    eventObject: game,
    eventValue: "power",
    criteria: (p) => p <= 0,
    action: () => {
        console.log("To recharge power, use 'charge()'.");
    },
});
const fullbattery = new Achievement({
    name: "Full battery",
    description: "Reach full power.",
    eventObject: game,
    eventValue: "power",
    criteria: (p) => p === game.maxbattery,
    action: () => {},
});
const overcharged = new Achievement({
    name: "Overcharged",
    description: "Get a power value over the default maximum.",
    eventObject: game,
    eventValue: "power",
    criteria: (p) => p > 15, // default maximum
    action: () => {},
});
const fighter = new Achievement({
    name: "The Fighter",
    description: "Engage in combat",
    eventObject: game,
    eventValue: "totalencounters",
    criteria: p => p >= 1,
    action: () => {},
});

const fighter2 = new Achievement({
    name: "Combat enjoyer",
    description: "Engage in combat, but, a lot more.",
    eventObject: game,
    eventValue: "totalencounters",
    criteria: p => p >= 10,
    action: () => {},
});