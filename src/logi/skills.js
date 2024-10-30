const totalskills = 0

const skillbase = {
    name: "Skillbase", //The name of the skill.
    description: "Example", //The description of the skill.
    displayedeffect: "Example",
    effect: undefined, //Use equation here to specify the 
    cost: undefined, //Cost in skill points
    parent: undefined, //Used for checking requirements to unlock.
}
//Beware, if skill check is enabled, the child must match the parents.

let unlockedexampleskill = false
const exampleskill = {
    name: "Example",
    description: "Description",
    displayedeffect: "N/A",
    effect: "game.points = game.points + 1",
    cost: Number.POSITIVE_INFINITY,
    parent: "root",
}

let unlockedskill1 = false
const skill1 = { //Add this.name to buyskill() if you want your skill to be aquireable
    name: "skill_1.",
    description: "The first skill",
    displayedeffect: "Adds 10 to base point gain.",
    effect: "game.basegain = game.basegain + 1",
    cost: 1,
    parent: "root",
}
const cantaffordskill = "You need more skill points."
const needparentskill = "Unlock the previous skill first."
function buyskill(skillname) {
    if (skillname != undefined) {
        if (skillname == skill1.name) {
            if ("unlocked" + skill1.parent || skill1.parent == "root") {
                if (skillpoints === skill1.cost) {
                    unlockedskill1 = true
                    skill1.effect;
                }
                else {
                    console.log(cantaffordskill)
                }
            }
            else {
                console.log(needparentskill)
            }
        }
    }
    else {
        console.log("Hey, choose a skill!")
    }
}

function skilltree() {
    if ("unlocked"+"skill1.parent" == true || skill1.parent == "root" ) {
        console.log(skill1.name)
        console.log("   " + skill1.description)
        console.log("   " + skill1.displayedeffect)
        console.log("   Costs " + skill1.cost + " Skill Point(s).");
    }
}