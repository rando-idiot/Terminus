const totalskills = 0;
class skill {
    static #all = [];

    static skillcheck() {
        terminal.log(
            "Skills\n\n" +
                skill.#all.filter((a) => a.#visible).map(String)
                    .join("\n--------------------\n"),
        );
    }


    name;
    description;
    displayedeffect;
    effect;
    cost;
    parent;
    unlocked = false;
    #visible = false;
/**
 *    Creates a new skill instance.
* @param {Object} parameters - The skill parameters.
* @param {string} parameters.name - The name of the skill.
* @param {string} parameters.description - The description of the skill.
* @param {string} parameters.displayedeffect - The effect of the skill shown to the player.
* @param {number} parameters.cost - The cost to unlock the skill.
* @param {boolean} parameters.unlocked - Wether or not a skill is unlocked. 
* @param {Skill | null} [parameters.parent=null] - The parent skill required to unlock this skill.
*/
    constructor(parameters) {
        this.name = parameters.name
        this.description = parameters.description
        this.displayedeffect = parameters.displayedeffect
        this.cost = parameters.cost
        this.parent = parameters.parent
        this.unlocked = parameters.unlocked
    }
}
const skillbase = {
    name: "Skillbase", //The name of the skill.
    description: "Example", //The description of the skill.
    displayedeffect: "Example",
    effect: undefined, //Use equation here to specify the
    cost: undefined, //Cost in skill points
    parent: undefined, //Used for checking requirements to unlock.
    unlocked: undefined,
};
//Beware, if skill check is enabled, the child must match the parents.


const exampleskill = {
    name: "Example",
    description: "Description",
    displayedeffect: "N/A",
    effect: "game.points = game.points + 1",
    cost: Number.POSITIVE_INFINITY,
    parent: "root",
    unlocked: false,
};


let skill1 = new skill({ 
    name: "skill_1.",
    description: "The first skill",
    displayedeffect: "Adds 10 to base point gain.",
    effect: "game.basegain = game.basegain + 1",
    cost: 1,
    parent: "root",
    unlocked: false,
});



terminal.addCommand(function buyskill(skillname) {
    skill(skillname)
    if (skillname != undefined) {
        if (skillname == skill.parameters.name) {
            if ("unlocked" + skill.parameters.parent || skill.parameters.parent == "root") {
                if (skillpoints === skill.parameters.cost) {
                    if (this.unlocked != true) {
                        unlockedskill1 = true;
                        skill.parameters.effect;
                    }
                } else {
                    terminal.log(game.misc.cantaffordskill);
                }
            } else {
                terminal.log(game.misc.needparentskill);
            }
        }
    } else {
        terminal.log("Hey, choose a skill!");
    }
});

terminal.addCommand(function skilltree() {
    if ("unlocked" + skill.parameters.parent == true || skill.parameters.parent == "root") {
        terminal.log(skill.parameters.name);
        terminal.log("   " + skill.parameters.description);
        terminal.log("   " + skill.parameters.displayedeffect);
        terminal.log("   Costs " + skill1.cost + " Skill Point(s).");
    }
});
