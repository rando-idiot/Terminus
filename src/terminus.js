
//maj V20
//skills.js exists.
//automated seasonal welcome msgs
terminal.log("Welcome to Terminus.JS");


const gameverison = "V20"

const month = getMonth()
const day = getDate()
const newyearwelcome = "Happy new year! Welcome to Terminus."
const terminusanniversary = "Another year of Terminus. Welcome!"
const normalwelcome = "Welcome to Terminus!"
const superrarewelcome = "Unwelcome to Antiterminus." //Please change this randomly whenever you make a commit to this file!
let rarewelcome = randomnumbah(1, 10000)
if (rarewelcome == 1) {
    console.log(superrarewelcome)
}
else if (month == 0) {
    if (day == 1) {
        console.log(newyearwelcome)
    }
}
else if (month == 8) {
    if (day == 15) {
        console.log(terminusanniversary)
    }
}
else {
    console.log(normalwelcome)
}
function checkversion() {
    console.log("The current version is " + gameversion);
}
hints();
function hints(force = 0) {
    const list = [
        "You can generate points by calling update().",
        "Power mult = power / 10",
        "help() can update its contents based on the things you have purchased.",
        "You can change your difficulty by calling difficultyset(number)",
        "You can get more hints by calling hints().",
        "Use clear() to clear the console if it gets too cluttered."
    ];
    terminal.log(list[Math.floor(Math.random() * list.length)]);
}

function github() {
    return "https://github.com/rando-idiot/Terminus.JS";
}

function credits() {
    [
        "Developer: @rando.idiot on discord.",
        "Major contributor: @.bleb1k on discord.",
        "Check us out!",
    ].forEach((str) => terminal.log(str));
}

function discord() {
    [
        "You can find me and other people who either hate this game or enjoy it here:",
        "Discord.gg/kYyEQ2hjPs",
    ].forEach((str) => terminal.log(str));
}

const DEBUG_MODE = false;
if (DEBUG_MODE) {
    const debug = [
        //The reason to make this a constant is so i can just organize all of this into one thing. Please do not change.
        function setpoints(setted) {
            game.points = setted;
        },
        function chooseunlock(trueorfalse) {
            if (trueorfalse === true && false) {
                game.unlocks.begin = trueorfalse;
                game.unlocks.index = trueorfalse;
                game.unlocks.doctype = trueorfalse;
                game.unlocks.configyml = trueorfalse;
                game.unlocks.infshop = trueorfalse;
            } else {
                terminal.log("trueorfalse must be either truthy or falsy");
            }
        },
        function gerald() {
        },
    ];
}

//The object for determining how many points you make from any given update.
let game = events({
    unlocks: events({
        begin: false,
        index: false,
        doctype: false,
        configyml: false,
        infshop: false,
    }),
    enemies: events({
        gamblefactor: 1.5,
        enabled: true,
        difficulty: 0.5,
        encounterchance: 10,
    }),
    skillpoints: 0,
    xp: 0,
    incombat: false,
    pointcalcstatus: false,
    infstage: 0,
    points: 0,
    steponeadd: 0,
    steptwomult: 1,
    stepthreemult: 1,
    stepfouradd: 1,
    basegain: 1,
    upgradebonus: 1,
    upgpriceboost: 0,
    upgstage: 0,
    updateloop: 1,
    power: 10,
    powerpoints: 1, //Hahah PP
    indebted: 1,
    difficulty: 1,
    maxbattery: 15,
    rechargerate: 1,
    antipower: 10,
    itemduration: 0,
    totalencounters: 0,
    pointcalc: () => {
        if (game.pointcalcstatus === true) {
            game.pointcalcstatus = false;
            let foo = game.points +
                (game.basegain +
                        game.steponeadd * game.steptwomult *
                            game.stepthreemult +
                        game.stepfouradd * game.powerpoints) /
                    game.difficulty;
            if (game.itemduration > 0) {
                game.itemduration = game.itemduration - 1;
                game.points = game.points * game.itemmult;
                return foo;
            }
        }
    },
});

game.points$onChange((points) => {
    terminal.log(`You have ${points.toFixed(2)} points.`);
    if (!game.indebted && points < 0) {
        game.indebted = true;
    } else if (game.indebted) {
        game.indebted = false;
    }
});

game.indebted$on(true, () => {
    terminal.log("You are in debt.");
});
game.indebted$on(false, () => {
    terminal.log("You got out of debt.");
});

let dangerlevel = randomnumbah(
    game.enemies.difficulty,
    game.enemies.difficulty * 10,
);

function run() {
    if (game.enemies.incombat === false) {
        terminal.log("You arent in combat?????");
    } else {
        let lostmoney = game.points / 10;
        game.enemies.incombat = false;
        game.points = game.points - lostmoney;
        terminal.log("You fled. Cost ", lostmoney);
    }
}

function fight() {
    if (game.incombat === false) {
        terminal.log("You are not in combat.");
    } else {
        let bar = randomnumbah(1, foo);
        let foo = (1 / game.enemies.difficulty) * dangerlevel;
        if (bar === foo) {
            game.points = baz * 1.5 - baz;
            terminal.log("You won!");
        } else {
            terminal.log("You lost.");
            game.points = game.enemies.difficulty * game.points;
        }
    }
    game.incombat = false
}

let baz;
function roam() {
    let encounteredenemy = randomnumbah(1, game.enemies.encounterchance);
    let founditem = randomnumbah(1, itemkey.totalitems);
    if (founditem === itemkey.totalitems) {
        itemkey.helditem = founditem;
        terminal.log("woag you found item"); //omg you foundies itemer
        if (founditem === 1) {
            terminal.log("You found " + itemkey.itemid1.name)
            terminal.log("'" + itemkey.itemid1)
        }
        if (founditem === 2) {
            terminal.log("You found " + itemkey.itemid2.name)
            terminal.log("'" + itemkey.itemid2)
        }
        if (founditem === 3) {
            terminal.log("You found " + itemkey.itemid3.name)
            terminal.log("'" + itemkey.itemid3)
        }
    }
    if (encounteredenemy === 1) {
        baz = game.points / randomnumbah(1, 4);
        terminal.log("You have encountered an enemy!");
        terminal.log("The enemy points are: ", baz);
        terminal.log(
            "You can either use 'fight()' or 'flee()' to determine how you want to act.",
        );
    }
}

let itemkey = {
    encounterchance: 10,
    helditem: 0,
    totalitems: 3,
    itemid0: {
        name: "N/A",
        description: "This is not an item",
    },
    itemid1: {
        name: "Battery",
        description: "Refills battery",
    },
    itemid2: {
        name: "Get Rich Quick!",
        description: "Gain 2 updates worth of points",
    },
    itemid3: {
        name: "MultBox",
        description: "Gain *2 points per update() for 3 updates()",
    },
};

function randomnumbah(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function useheld() {
    if (itemkey.helditem === 0) {
        terminal.log("You aren't holding anything.");
    } else if (itemkey.helditem === 1) {
        terminal.log("Used ", itemkey.itemid1.name);
        game.power = game.maxbattery;
    } else if (itemkey.helditem === 2) {
        terminal.log("Used ", itemkey.itemid2.name);
        game.points = game.pointcalc();
        game.pointcalcstatus = true;
    } else if (itemkey.helditem === 3) {
        terminal.log("Used ", itemkey.itemid3.name);
        game.itemduration = 3;
        game.itemmult = 2;
    }
}

function help() {
    const list = [
        "help()\nShows this.",
        "shop()\nShows the available purchasable items.",
        "update()\nIncreases points. Equivalent of clicking in a clicker game.",
        "charge()\nGain power.",
        "difficultyset(number)\nChange your difficulty.",
        "github()\nShows the github repo link.",
        "credits()\nShows the credits.",
        "discord()\nGives a link to the terminus.js discord.",
        "hints()\nShows a hint.",
        "achievements()\nShows achievements.",
    ];
    44; //huh? -Rando
    if (game.unlocks.infshop) {
        list.push("infshop().............Shows infinitley purchasable items.");
    }
    if (DEBUG_MODE) list.push("pointsset(set)....Sets your points.");
    list.forEach((str) => terminal.log(str));
}
help();

function difficultyset(number) {
    game.difficulty = number;
    terminal.log(`Set difficulty to ${number}`);
    terminal.log(
        "Can be changed at any time, but you wouldn't do that, would you?",
    ); 
}

game.power$onChange((power) => {
    if (game.power == game.maxbattery) {
        return terminal.log("Full charge.");
    }
    terminal.log("Current battery: ", game.power);
});
function charge() {
    if (game.power < game.maxbattery) {
        game.power = game.power + game.rechargerate;
    }
}
const exptolevel = 100
function update() {
    if (game.power <= 0) {
        terminal.log("Gained 10 exp.")
        game.xp = game.xp + 10;
        if (game.xp == exptolevel) {
            game.skillpoints = game.skillpoints + 1
            terminal.log("Leveled up!");
        }
        terminal.log("No power.");
        return terminal.log("    ")
    }

    game.powerpoints = game.power / game.antipower;
    game.power -= 1;

    game.pointcalc();
}

function shop() {
    [
        "begin(): $5.........The beginning",
        "index(): $20........index.html",
        "doctype(): $50......<!DOCTYPE HTML>",
        "configyml(): $100...config.yml",
        game.upgstage === 0
            ? "push(): $500........git push 1"
            : game.upgstage === 1
            ? "push(): $5000.......git push 2"
            : game.upgstage === 2
            ? "push(): $50000......git push 3"
            : "push(): $???........git push ?",
    ].forEach((str) => terminal.log(str));
}

game.unlocks.begin$on(true, () => {
    game.basegain = 10;
    game.points -= 5 * game.difficulty;
    terminal.log("Began!\n");
});
function begin() {
    if (game.indebted) return terminal.log("Cannot afford!");
    game.unlocks.begin = true;
    globalThis.begin = () => terminal.log("You already began.");
}

game.unlocks.index$on(true, () => {
    game.steptwomult += 0.5;
    game.points -= 20 * game.difficulty;
    terminal.log("Created index.html!\n");
});
function index() {
    if (game.indebted) return terminal.log("Cannot afford!");
    game.unlocks.index = true;
    globalThis.index = () => terminal.log("You already created index.html");
}

game.unlocks.doctype$on(true, () => {
    game.stepthreemult += 0.5;
    game.points -= 50 * game.difficulty;
    terminal.log("Added <!DOCTYPE HTML>!\n");
});
function doctype() {
    if (game.indebted) return terminal.log("Cannot afford!");
    game.unlocks.doctype = true;
    globalThis.doctype = () =>
        console.log(
            "You- YOU ALREADY ADDED <!DOCTYPE HTML> YOU DONT NEED TO PUT IT EVERY TIME YOU ADD <BODY> STOP PLEASE", //I am terrible at comedy -Rando
        );
}

game.unlocks.configyml$on(true, () => {
    game.stepfourmult *= 2;
    game.points -= 100 * game.difficulty;
    terminal.log("Created config.yml!");
});
function configyml() {
    if (game.indebted) return terminal.log("Cannot afford!");
    game.unlocks.configyml = true;
    globalThis.configyml = () => terminal.log("You already created config.yml");
}

game.upgstage$on(1, () => {
    globalThis.push = () => {
        if (game.indebted) return "Come back when you're a little bit richer";

        game.upgstage = 2;
        game.points -= 5000 * game.difficulty;
    };
});
game.upgstage$on(2, () => {
    globalThis.push = function () {
        if (game.indebted) return "Come back when you're a little bit richer";

        game.upgstage = 3;
        game.points -= 50000 * game.difficulty;
        return `You have ${game.points} points`;
    };
});
game.upgstage$on(3, () => {
    globalThis.push3 = () =>
        terminal.log("Please don't try this again, it's not funny");
});
function push() {
    if (game.indebted) {
        return terminal.log("you are brokies :3");
    }

    game.unlocks.infshop = true;
    game.upgstage = 1;
    game.points -= 500 * game.difficulty;
}

game.unlocks.infshop$on(true, () => {
    terminal.log("You've unlocked the infshop. Check help() for details.");
    globalThis.infshop = function () {
        let list = game.upgstage === 1
            ? [ // todo: Export cost calculations
                `stepone(): $${
                    5 + game.upgpriceboost * game.difficulty
                }............Increases step 1 addition`,
                `steptwo(): $${
                    25 + game.upgpriceboost * game.difficulty
                }...........Increases step 2 multiplier`,
                `stepthree(): $${
                    25 + game.upgpriceboost * game.difficulty
                }.........Increases step 3 multiplier`,
                `stepfour(): $${
                    2 + game.upgpriceboost * game.difficulty
                }...........Increases step 4 addition`,
            ]
            : [
                `stepone(): $${
                    20 + game.upgpriceboost * game.difficulty
                }..........Increases step 1 addition`,
                `steptwo(): $${
                    100 + game.upgpriceboost * game.difficulty
                }.........Increases step 2 multiplier`,
                `stepthree(): $${
                    100 + game.upgpriceboost * game.difficulty
                }.......Increases step 3 multiplier`,
                `stepfour(): $${
                    8 + game.upgpriceboost * game.difficulty
                }..........Increases step 4 addition`,
                `maxpowerup(): $${
                    800 + game.upgpriceboost * game.difficulty
                }.......Increases the maximum battery.`,
            ];

        list = [
            `Stage ${game.upgstage} upgrades`,
            ...list,
            `baseup(): $${
                500 + game.upgpriceboost * game.difficulty
            }...........Increases the base that is then multiplied etc etc`,
            `upgbonus(): $${
                100 + game.upgpriceboost * game.difficulty
            }..........Increases how much upgrades upgrade stuff OTHER THAN ITSELF.`,
            `helloworld(): $0...........Prints 'Hello world!' in terminal.`,
        ];

        terminal.log("See code comments for upgrade descriptions"); // should this be here?

        terminal.log(list.join("\n"));
    };
});

function infshop() { //Todo: increase price to get to this.
    console.log("You have not unlocked infinite upgrades.");
}

game.upgstage$on(1, () => {
    globalThis.stepone = function () {
        if (game.indebted) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 5 + game.upgpriceboost * game.upgpriceboost * game.difficulty;
        game.steponeadd += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased stepone();");
    };

    globalThis.steptwo = function () {
        if (game.indebted) return terminal.log("You don't have enough money");

        game.points -= 25 + game.upgpriceboost * game.upgpriceboost * game.difficulty;
        game.steptwomult += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased steptwo();");
    };

    globalThis.stepthree = function () {
        if (game.indebted) return terminal.log("You don't have enough money");

        game.points -= 25 + game.upgpriceboost * game.upgpriceboost * game.difficulty;
        game.stepthreemult += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased stepthree();");
    };

    globalThis.stepfour = function () {
        if (game.indebted) return terminal.log("You don't have enough money");

        game.points -= 2 + game.upgpriceboost * game.upgpriceboost * game.difficulty;
        game.stepfouradd += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased stepfour();");
    };

    globalThis.baseup = function () {
        if (game.indebted) return terminal.log("You don't have enough money");

        game.points -= 500 + game.upgpriceboost * game.upgpriceboost * game.difficulty;
        game.basegain += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased baseup();");
    };

    globalThis.upgbonus = function () {
        if (game.indebted) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 100 + game.upgpriceboost * game.upgpriceboost * game.difficulty;
        game.upgradebonus += 0.1;
        game.upgpriceboost += 5;

        terminal.log("purchased upgradebonus();");
    };
});

game.upgstage$on(2, () => {
    globalThis.stepone = function () {
        if (game.indebted) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 20 + game.upgpriceboost * game.upgpriceboost * game.difficulty;
        game.steponeadd += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased stepone();");
    };

    globalThis.steptwo = function () {
        if (game.indebted) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 100 + game.upgpriceboost * game.upgpriceboost * game.difficulty;
        game.steptwomult += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased steptwo();");
    };

    globalThis.stepthree = function () {
        if (game.indebted) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 100 + game.upgpriceboost * game.upgpriceboost * game.difficulty;
        game.stepthreemult += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased stepthree();");
    };

    globalThis.stepfour = function () {
        if (game.indebted) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 8 + game.upgpriceboost * game.upgpriceboost * game.difficulty;
        game.stepfouradd += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased stepfour();");
    };
    globalThis.maxpowerup = function () {
        if (game.indebted) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 800 + game.upgpriceboost * game.upgpriceboost * game.difficulty;
        game.stepfouradd += game.upgradebonus;
        game.maxbattery += 5;

        terminal.log("purchased maxpowerup();");
    };
});

game.upgstage$on(3, () => {
    globalThis.stepone2 =
        globalThis.steptwo2 =
        globalThis.stepthree2 =
        globalThis.stepfour2 =
            function () {
                return terminal.log("Lol you leveled up too much krill issue.");
            };
});

function stepone() {
    return terminal.log("You have not unlocked infinite upgrades.");
}
function steptwo() {
    return terminal.log("You have not unlocked infinite upgrades.");
}
function stepthree() {
    return terminal.log("You have not unlocked infinite upgrades.");
}
function stepfour() {
    return terminal.log("You have not unlocked infinite upgrades.");
}
function baseup() {
    return terminal.log("You have not unlocked infinite upgrades.");
}
function upgbonus() {
    return terminal.log("You have not unlocked infinite upgrades.");
}
function maxpowerup() {
    return terminal.log("You have not leveled up enough");
}

function helloworld() {
    terminal.log("Hello world!");
}














//:3