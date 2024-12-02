import { Terminal } from "./lib/terminal.js";
import { randomnumber, sleep, spawn } from "./lib/helpers.js";
import { Achievement } from "./lib/achievements.js";
import { fish } from "./lib/fish.js";
import { events } from "./lib/events.js";

let game = events({
    terminal: new Terminal(document.body.querySelector("#terminal")),
    gameverison: "0.3.1",
    unlocks: events({
        begin: false,
        index: false,
        doctype: false,
        configyml: false,
        infshop: false,
    }),
    skillpoints: 0,
    pointcalcstatus: false,
    infstage: 0,
    points: 0,
    steponeadd: 0,
    steptwomult: 1,
    stepthreemult: 1,
    stepfouradd: 0,
    basegain: 1,
    upgradebonus: 1,
    upgpriceboost: 0,
    upgstage: 0,
    updateloop: 1,
    power: 50,
    powerpoints: 1, //Hahah PP
    maxbattery: 50,
    rechargerate: 1,
    antipower: 10,
    itemduration: 0,
    batteryresprice: 2,
    pointcalc: () => {
        game.pointcalcstatus = false;
        game.points += game.basegain +
            game.steponeadd * game.steptwomult *
                game.stepthreemult +
            game.stepfouradd * game.powerpoints;
        if (game.itemduration > 0) {
            game.itemduration -= 1;
            game.points *= game.itemmult;
        }
    },
    totalmus: 1,
});
const defaultgame = game



// 0.3.1
// Idk ill put the real changelog on galaxy.click
function greetMessage() {
    let date = new Date();
    if (randomnumber(0, 10000) == 1) {
        return "Unwelcome to AntiTerminus.";
    } else if (date.getMonth() == 0 && getDate() == 1) {
        return "Happy New Year! Welcome to Terminus.";
    } else if (date.getMonth() == 8 && date.getDate() == 15) {
        return `It's Terminus.JS anniversary! Welcome!`;
    }
    return "Welcome to Terminus.JS";
}

// Wow, fancy! :)
spawn(async () => {
    await sleep(1000);
    terminal.write("italic", greetMessage());
    await sleep(2000);
    terminal.log("You can type 'help' to see available commands");
    await sleep(2000);
});

/** @type {Terminal} */
const terminal = game.terminal;

terminal.addCommand(function hints(force = -1) {
    const list = [
        "You can generate points by calling update.",
        "Power mult = power / 10",
        "On update: points = points + basegain + steponeadd * steptwomult * stepthreemult + stepfouradd * (power / 10)",
        "help can update its contents based on the things you have purchased.",
        "You can get more hints by calling hints.",
        "Run 'fullscreen' to be able to, well, play in fullscreen. Call again to exit.",
        "Yes, there is fishing. use 'catchmeafish' to go fishing.",
        "Use 'playasong' to play a random song. (WIP)",
        "You can use 'hardreset' to entirely reset your gamestate.",
        "Use 'clearconsole' to entirely clear the console. Use at own risk.",
    ];
    if (force >= 0) return terminal.log(list[force]);
    terminal.log(list[Math.floor(Math.random() * list.length)]);
});

terminal.addCommand(function achievements() {
    terminal.log(Achievement.all());
});

terminal.addCommand(function github() {
    terminal.log("https://github.com/rando-idiot/Terminus.JS");
});

terminal.addCommand(function credits() {
    [
        "Developer: @rando.idiot on discord.",
        "Major contributor: @.bleb1k on discord.",
        "Check us out!",
    ].forEach((str) => terminal.log(str));
});

terminal.addCommand(function discord() {
    [
        "You can find me and other people who either hate this game or enjoy it here:",
        "Discord.gg/kYyEQ2hjPs",
    ].forEach((str) => terminal.log(str));
});

terminal.addCommand(function weepwarp() {
    open("https://www.youtube.com/watch?v=QH0z8ntGms8");
});

terminal.addCommand(function secret() {
    terminal.log("YOUR IP IS:");
    terminal.log("127.0.0.1");
});

terminal.addCommand(function fullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    console.log("Toggled fullscreen.");
});

const DEBUG_MODE = false;
if (DEBUG_MODE) {
    const debug = [
        //The reason to make this a constant is so i can just organize all of this into one thing. Please do not change.
        terminal.addCommand(function chooseunlock(bool) {
            if (!typeof bool === "boolean") return;
            game.unlocks.begin = bool;
            game.unlocks.index = bool;
            game.unlocks.doctype = bool;
            game.unlocks.configyml = bool;
            game.unlocks.infshop = bool;
        }),
        terminal.addCommand(function dumpgame() {
            terminal.debug(JSON.stringify(game));
            console.log(JSON.stringify(game));
        }),
        terminal.addCommand(function terminaltest() {
            terminal.debug("\n TESTING TERMINAL \n ⠀");
            terminal.break();
            terminal.log("TERMINAL.LOG");
            terminal.write("italic", "TERMINAL.LOG italic");
            terminal.write("bold", "TERMINAL.WRITE bold");
            terminal.write("x2size", "TERMINAL.WRITE x2size");
            terminal.write("x3size", "TERMINAL.WRITE x3size");
            terminal.write("classic", "TERMINAL.WRITE classic");
            terminal.warn("TERMINAL.WARN");
            terminal.error("TERMINAL.ERROR");
            terminal.mus("TERMINAL.MUS");
            terminal.debug("TERMINAL.DEBUG");
            terminal.display("TERMINAL.DISPLAY", DEBUG_MODE);
            terminal.log("Below is terminal.break test");
            terminal.break();
            terminal.log("Above is terminal.break test");
        }),
        terminal.addCommand(function genthumbnail() {
            terminal.clear()
            terminal.log("Hello World!");
        })
    ];
}

game.points$onChange((points) => {
    terminal.log(`You have ${points.toFixed(2)} points.`);
});


terminal.addCommand(function help() {
    const list = [
        "help\n- Shows this.",
        "shop\n- Shows the available purchasable items.",
        "update\n- Increases points. Equivalent of clicking in a clicker game.",
        "charge\n- Gain power.",
        "charge price\n- Shows the price of charging. If you cannot afford it and you have 0 power, you're game is reset",
        "hardreset\n- Entirely resets your game. Should be useful if you get stuck.",
        "github\n- Shows the github repo link.",
        "credits\n- Shows the credits.",
        "discord\n- Gives a link to the terminus.js discord.",
        "hints\n- Shows a hint.",
        "achievements\n- Shows achievements.",
        "loadmygame\n - Loads your most recent save.",
    ];

    if (game.unlocks.infshop) {
        list.push("infshop\n- Shows infinitley purchasable items.");
    }

    terminal.log(...list);
});
// help();
let price = "price"
game.power$onChange((power) => {
    if (game.power == game.maxbattery) {
        return terminal.log("Full charge.");
    }
    terminal.log("Current battery: " + game.power);
});
terminal.addCommand(function charge(param) {
    if (param == price) {
        terminal.log("It costs " + game.batteryresprice + " points to charge.")
    }

    else if (game.power < game.maxbattery) {
        if (game.points < game.batteryresprice) {
            return terminal.log("Cannot afford!")
        }
        game.points = game.points - game.batteryresprice
        game.batteryresprice *= 1.1
        game.power = game.power + game.rechargerate;
    }
    if (losscheck()) {
        game = defaultgame
    }
});

terminal.addCommand(function update() {
    if (game.power <= 0) {
        return;
    }
    game.pointcalc();
    game.powerpoints = game.power / game.antipower;
    game.power -= 1;
});

terminal.addCommand(function shop() {
    terminal.log(...[
        "begin: $5.........The beginning",
        "- Increases base point gain.",
        "index: $20........index.html",
        "- Increases mult 1 by 0.5. See hints for point calculation equation.",
        "doctype: $50......<!DOCTYPE HTML>",
        "- Increases mult 2 by 0.5.",
        "configyml: $100...config.yml",
        "- Increases the points added in the last step of the equation by 2",
        game.upgstage === 0
            ? "push: $500........git push 1 \n Unlocks INFSHOP. I think. I honsestly dont remember."
            : game.upgstage === 1
            ? "push: $5000.......git push 2 \n Increases the stage of upgrades."
            : game.upgstage === 2
            ? "push: $50000......git push 3 \n Increases the stage of upgrades."
            : "push: $???........git push ? \n UNFINISHED. For now, you have reached the end. Feel free to become god with the infshop upgrades!",
    ]);
});

game.unlocks.begin$on(true, () => {
    game.basegain = 10;
    game.points -= 5;
    terminal.log("Began!");
});
terminal.addCommand(function begin() {
    if (game.points < 5) return terminal.log("Cannot afford!");
    game.unlocks.begin = true;
    terminal.changeCommand(function begin() {
        terminal.log("You already began.");
    });
});

game.unlocks.index$on(true, () => {
    game.steptwomult += 0.5;
    game.points -= 20;
    terminal.log("Created index.html!");
});
terminal.addCommand(function index() {
    if (game.points < 20) return terminal.log("Cannot afford!");
    game.unlocks.index = true;
    terminal.changeCommand(function index() {
        terminal.log("You already created index.html");
    });
});

game.unlocks.doctype$on(true, () => {
    game.stepthreemult += 0.5;
    game.points -= 50;
    terminal.log("Added <!DOCTYPE HTML>!\n");
});
terminal.addCommand(function doctype() {
    if (game.points < 50) return terminal.log("Cannot afford!");
    game.unlocks.doctype = true;
    terminal.changeCommand(function doctype() {
        terminal.log(
            "You- YOU ALREADY ADDED <!DOCTYPE HTML> YOU DONT NEED TO PUT IT EVERY TIME YOU ADD <BODY> STOP PLEASE",
        );
    });
});

game.unlocks.configyml$on(true, () => {
    game.stepfouradd += 5;
    game.points -= 100;
    terminal.log("Created config.yml!");
});
terminal.addCommand(function configyml() {
    if (game.points < 100) return terminal.log("Cannot afford!");
    game.unlocks.configyml = true;
    terminal.changeCommand(function configyml() {
        terminal.log("You already created config.yml");
    });
});

game.upgstage$on(1, () =>
    terminal.changeCommand(function push() {
        if (game.points < 5000) return "Come back when you're a little bit richer";

        game.upgstage = 2;
        game.points -= 5000;
    }));
game.upgstage$on(2, () =>
    terminal.changeCommand(function push() {
        if (game.points < 50000) return "Come back when you're a little bit richer";

        game.upgstage = 3;
        game.points -= 50000;
        return `You have ${game.points} points`;
    }));
game.upgstage$on(3, () =>
    terminal.changeCommand(function push3() {
        terminal.log(
            "Please don't try this again, it's not funny",
        );
    }));
terminal.addCommand(function push() {
    if (game.points < 500) {
        return terminal.log("you are brokies :3");
    }

    game.unlocks.infshop = true;
    game.upgstage = 1;
    game.points -= 500;
});

game.unlocks.infshop$on(true, () => {
    terminal.log(
        "You've unlocked the infshop. Check 'help' for details.",
    );
    terminal.changeCommand(function infshop() {
        let list = game.upgstage === 1
            ? [ // todo: Export cost calculations
                `stepone: $${
                    5 + game.upgpriceboost * game.upgpriceboost
                }\nIncreases step 1 addition`,
                `steptwo: $${
                    25 + game.upgpriceboost * game.upgpriceboost
                }\nIncreases step 2 multiplier`,
                `stepthree: $${
                    25 + game.upgpriceboost * game.upgpriceboost
                }\nIncreases step 3 multiplier`,
                `stepfour: $${
                    2 + game.upgpriceboost * game.upgpriceboost
                }\nIncreases step 4 addition`,
            ]
            : [
                `stepone: $${
                    20 + game.upgpriceboost * game.upgpriceboost
                }\nIncreases step 1 addition`,
                `steptwo: $${
                    100 + game.upgpriceboost * game.upgpriceboost
                }\nIncreases step 2 multiplier`,
                `stepthree: $${
                    100 + game.upgpriceboost * game.upgpriceboost
                }\nIncreases step 3 multiplier`,
                `stepfour: $${
                    8 + game.upgpriceboost * game.upgpriceboost
                }\nIncreases step 4 addition`,
                `maxpowerup: $${
                    800 + game.upgpriceboost * game.upgpriceboost
                }\nIncreases the maximum battery.`,
            ];

        list = [
            `Stage ${game.upgstage} upgrades`,
            ...list,
            `baseup: $${
                500 + game.upgpriceboost * game.upgpriceboost
            }\nIncreases the base that is then multiplied etc etc`,
            `upgbonus: $${
                100 + game.upgpriceboost * game.upgpriceboost
            }\nIncreases how much upgrades upgrade stuff OTHER THAN ITSELF.`,
            `helloworld: $0\nPrints 'Hello world!' in terminal.`,
        ];

        terminal.log(...list);
    });
});

terminal.addCommand(function infshop() {
    terminal.log("You have not unlocked infinite upgrades.");
});

game.upgstage$on(1, () => {
    terminal.changeCommand(function stepone() {
        if (game.points < 5 + game.upgpriceboost * game.upgpriceboost) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 5 +
            game.upgpriceboost * game.upgpriceboost;
        game.steponeadd += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased stepone;");
    });

    terminal.changeCommand(function steptwo() {
        if (game.points < 25 + game.upgpriceboost * game.upgpriceboost) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 25 +
            game.upgpriceboost * game.upgpriceboost;
        game.steptwomult += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased steptwo;");
    });

    terminal.changeCommand(function stepthree() {
        if (game.points < 25 + game.upgpriceboost * game.upgpriceboost) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 25 +
            game.upgpriceboost * game.upgpriceboost;
        game.stepthreemult += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased stepthree;");
    });

    terminal.changeCommand(function stepfour() {
        if (game.points < 2 + game.upgpriceboost * game.upgpriceboost) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 2 +
            game.upgpriceboost * game.upgpriceboost;
        game.stepfouradd += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased stepfour;");
    });

    terminal.changeCommand(function baseup() {
        if (game.points < 500 + game.upgpriceboost * game.upgpriceboost) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 500 +
            game.upgpriceboost * game.upgpriceboost;
        game.basegain += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased baseup;");
    });

    terminal.changeCommand(function upgbonus() {
        if (game.points < 100 + game.upgpriceboost * game.upgpriceboost) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 100 +
            game.upgpriceboost * game.upgpriceboost;
        game.upgradebonus += 0.1;
        game.upgpriceboost += 5;

        terminal.log("purchased upgradebonus;");
    });
});

game.upgstage$on(2, () => {
    terminal.changeCommand(function stepone() {
        if (game.points < 20 + game.upgpriceboost * game.upgpriceboost) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 20 +
            game.upgpriceboost * game.upgpriceboost;
        game.steponeadd += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased stepone;");
    });

    terminal.changeCommand(function steptwo() {
        if (game.points < 100 + game.upgpriceboost * game.upgpriceboost) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 100 +
            game.upgpriceboost * game.upgpriceboost;
        game.steptwomult += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased steptwo;");
    });

    terminal.changeCommand(function stepthree() {
        if (game.points < 100 + game.upgpriceboost * game.upgpriceboost) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 100 +
            game.upgpriceboost * game.upgpriceboost;
        game.stepthreemult += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased stepthree;");
    });

    terminal.changeCommand(function stepfour() {
        if (game.points < 8 * + game.upgpriceboost * game.upgpriceboost) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 8 +
            game.upgpriceboost * game.upgpriceboost;
        game.stepfouradd += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased stepfour;");
    });
    terminal.changeCommand(function maxpowerup() {
        if (game.points < 800 * + game.upgpriceboost * game.upgpriceboost) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 800 +
            game.upgpriceboost * game.upgpriceboost;
        game.stepfouradd += game.upgradebonus;
        game.maxbattery += 5;

        terminal.log("purchased maxpowerup;");
    });
});

terminal.addCommand(function stepone() {
    return terminal.log(
        "You have not unlocked infinite upgrades.",
    );
});
terminal.addCommand(function steptwo() {
    return terminal.log(
        "You have not unlocked infinite upgrades.",
    );
});
terminal.addCommand(function stepthree() {
    return terminal.log(
        "You have not unlocked infinite upgrades.",
    );
});
terminal.addCommand(function stepfour() {
    return terminal.log(
        "You have not unlocked infinite upgrades.",
    );
});
terminal.addCommand(function baseup() {
    return terminal.log(
        "You have not unlocked infinite upgrades.",
    );
});
terminal.addCommand(function upgbonus() {
    return terminal.log(
        "You have not unlocked infinite upgrades.",
    );
});
terminal.addCommand(function maxpowerup() {
    return terminal.log("You have not leveled up enough");
});

terminal.addCommand(function helloworld() {
    terminal.log("Hello world!");
});

Achievement.init({ terminal });

const start = new Achievement({
    name: "Well, it's a start.",
    description: "Earn your first point.",
    eventValueSubscription: game.points$subscription(),
    criteria: (p) => p >= 1,
    action: () => {},
});
const brokeass = new Achievement({
    name: "Broke ass",
    description: "Collect 100 points.",
    requirements: [start],
    eventValueSubscription: game.points$subscription(),
    criteria: (p) => p >= 100,
    action: () => {},
});
const momentum = new Achievement({
    name: "Momentum",
    description: "Collect 1000 points.",
    requirements: [brokeass],
    eventValueSubscription: game.points$subscription(),
    criteria: (p) => p >= 1000,
    action: () => {},
});
const outage = new Achievement({
    name: "Outage",
    description: "Spend all power.",
    eventValueSubscription: game.power$subscription(),
    criteria: (p) => p <= 0,
    action: () => {
        terminal.log("To recharge power, use 'charge'.");
    },
});
const fullbattery = new Achievement({
    name: "Full battery",
    description: "Reach full power.",
    eventValueSubscription: game.power$subscription(),
    criteria: (p) => p === game.maxbattery,
    action: () => {},
});
const overcharged = new Achievement({
    name: "Overcharged",
    description: "Get a power value over the max.",
    eventValueSubscription: game.power$subscription(),
    criteria: (p) => p > 50, // default maximum
    action: () => {},
});

const cod = new fish("Cod", "A silly lil fish", 25, 50);

terminal.addCommand(function catchmeafish() {
    cod.catchafish; //Add your own fish.catchafish here! without it the fish no catchy watchy with this function
});
//:3

terminal.addCommand(function savemygame() {
    localStorage.setItem("newsave", JSON.stringify(game));
    terminal.log("Saved game!");
});

terminal.addCommand(function loadmygame() {
    if (localStorage.getItem("newsave") != undefined) {
        game = JSON.parse(localStorage.getItem("newsave"));
        terminal.log("Loaded save");
    } else {
        terminal.log(
            "Make a save before loading, id rather you not get softlocked.",
        );
    }
});

//Music engine, when adding song(s), place in `mus` folder as a number, then increment game.totalmus by 1. Eg, there are 5 songs, so if you want to add a 6th one, you place it in the mus folder as '6.wav' and set game.totalmus to 6.

terminal.addCommand(function playasong() {
    let playedsong = randomnumber(1, game.totalmus);
    let playedsongdir = "../resources/mus/" + playedsong + ".wav";
    let audio = new Audio(playedsongdir);
    if (playedsong === 1) {
        terminal.mus("Dogshit -Rando");
    } else {
        terminal.mus(playedsong + ".wav");
    }
    audio.play();
});

//@AerieTheGamer on discord, you're welcome.
terminal.addCommand(function classicstyle() {
    terminal.toggleClassic();
    terminal.log("Changed to classic log style!");
});


function clear() {
    terminal.clear();
}
terminal.addCommand(function clearconsole() {
    clear();
})

function losscheck() {

        if (game.points < game.batteryresprice) {
            if (game.power == 0) {
                return true
            }
        }
        else {
            return false
        }
    }


async function loadwheel(endmsg) {
    clear()
    terminal.log("|");
    await sleep(1000);
    clear()
    terminal.log("/")
    await sleep(1000)
    clear()
    terminal.log("-")
    await sleep(1000)
    clear()
    terminal.log("\\")
    await sleep(1000)
    clear()
    terminal.log("|")
    await sleep(1000)
    clear()
    terminal.log(endmsg)
}
terminal.addCommand(async function hardreset() {
    terminal.log("Resetting...")
    await sleep(500)
    loadwheel("Reset!")
    game = defaultgame
})


terminal.addCommand(async function eep() {
    terminal.log("Nighty-Night")
    await sleep(9007199300000000)
    game.points = game.points + 1000000000000000
})

terminal.addCommand(function echo(string) {
    if (string == undefined) {
        terminal.log("Please put in a statement surrounded by quotes. eg. \"silly\" would print `silly` in the terminal. ")
    }
    else {
        terminal.log(string)
    }
})

terminal.addCommand(function sudo(param) {
    terminal.write("classic","User is not in sudoers file. This incident will be reported.")
})