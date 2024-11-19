import { events } from "./lib/events.js";
import { Terminal } from "./lib/terminal.js";
import { sleep, spawn, randomnumbah } from "./lib/helpers.js";
import { Achievement } from "./lib/achievements.js";
import { fish } from "./lib/fish.js";
// import "./lib/skills.js"; // this is heavily broken rn, TODO: change this to use class (like achievements)

// 0.2.6
// MUSIC RELATED STUFF, SEE COMMIT MSGS

function greetMessage() {
    let date = new Date();
    if (randomnumbah(0, 10000) == 1) {
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
    terminal.log(greetMessage());
    await sleep(1500);
    terminal.log("You can type 'help' to see available commands");
    await sleep(1500);
});

//The object for determining how many points you make from any given update.

let game = events({
    terminal: new Terminal(document.body.querySelector("#terminal")),
    gameverison: "0.2.6",
    unlocks: events({
        begin: false,
        index: false,
        doctype: false,
        configyml: false,
        infshop: false,
    }),
    misc: events({ // I do not know why i called this misc, just shove random shtuff here.
        cantaffordskill: "You need more skill points.",
        needparentskill: "Unlock the previous skill first.",
    }),
    skillpoints: 0,
    xp: 0,
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
    maxbattery: 15,
    rechargerate: 1,
    antipower: 10,
    itemduration: 0,
    pointcalc: () => {
        game.pointcalcstatus = false;
        game.points += (game.basegain +
            game.steponeadd * game.steptwomult *
                game.stepthreemult +
            game.stepfouradd * game.powerpoints)
             ;
        if (game.itemduration > 0) {
            game.itemduration -= 1;
            game.points *= game.itemmult;
        }
    },
    totalmus: 1,
});

/** @type {Terminal} */
const terminal = game.terminal;

terminal.addCommand(function hints(force = -1) {
    const list = [
        "You can generate points by calling update.",
        "Power mult = power / 10",
        "help can update its contents based on the things you have purchased.",
        "You can get more hints by calling hints.",
        "Run 'fullscreen' to be able to, well, play in fullscreen. Call again to exit.",
        "Yes, there is fishing. use 'catchmeafish' to go fishing.",
        "Use 'playasong' to play a random song"
        //TODO: Re add clear() to new terminal.
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
        "i also sorta helped! - @nintendoboi2/nintendoboi22/nintendoboi222"
    ].forEach((str) => terminal.log(str));
});

terminal.addCommand(function discord() {
    [
        "You can find me and other people who either hate this game or enjoy it here:",
        "https://discord.gg/kYyEQ2hjPs",
    ].forEach((str) => terminal.log(str));
});

terminal.addCommand(async function tutorial() {
    const messages = [
        "Run the command 'Charge' to charge your battery",  
        "When the battery is full, run the command 'Update' to sell",
        "Then run the command 'Shop' to buy stuff"
    ];

    for (const message of messages) {
        terminal.log(message);
        await sleep(2000); 
    }

    game.unlocks.tutorialCompleted = true;
});

terminal.addCommand(function weepwarp() {
    open("https://www.youtube.com/watch?v=QH0z8ntGms8");
});

let ipAddress = "127.0.0.1"; 
let secretCommandExecuted = false;

terminal.addCommand(function secret() {
    if (secretCommandExecuted) {
        terminal.log("YOUR IP IS:");
        terminal.log(ipAddress);
        terminal.log("You have already claimed your secret. No more money for you");
    } else {
        terminal.log("YOUR IP IS:");
        terminal.log(ipAddress);
        game.points = game.points + 5;
        terminal.achievements(secret);
        secretCommandExecuted = true; 
    }
});

fetch("https://ipv4.wtfismyip.com/json")
    .then((response) => response.json())
    .then((data) => {
        ipAddress = data.YourFuckingIPAddress; 
    })
    .catch((error) => {
        console.error("Error finding IP address:", error);
        ipAddress = "127.0.0.1"; 
    });

terminal.addCommand(function fullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
});

// const DEBUG_MODE = false;
// if (DEBUG_MODE) {
//     const debug = [
//         //The reason to make this a constant is so i can just organize all of this into one thing. Please do not change.
//         terminal.addCommand(function setpoints(number) {
//             game.points = number;
//         }),
//         terminal.addCommand(function chooseunlock(bool) {
//             if (!typeof bool === "boolean") return;
//             game.unlocks.begin = bool;
//             game.unlocks.index = bool;
//             game.unlocks.doctype = bool;
//             game.unlocks.configyml = bool;
//             game.unlocks.infshop = bool;
//         }),
//         terminal.addCommand(function dumpgame() {
//             terminal.debug(JSON.stringify(game))
//             console.log(JSON.stringify(game))
//         }),
//         terminal.addCommand(function terminaltest() {
//             terminal.log("TERMINAL.LOG")
//             terminal.warn("TERMINAL.WARN")
//             terminal.error("TERMINAL.ERROR")
//             terminal.mus("TERMINAL.MUS")
//             terminal.debug("TERMINAL.DEBUG")
//             terminal.break();
//         })
//     ];
// }

game.points$onChange((points) => {
    terminal.log(`You have ${points.toFixed(2)} points.`);
    if (!game.indebted && points < 0) {
        game.indebted = true;
    } else if (game.indebted && points > 0) {
        game.indebted = false;
    }
});

game.indebted$on(true, () => {
    terminal.log("You are in debt.");
});
game.indebted$on(false, () => {
    terminal.log("You got out of debt.");
});

terminal.addCommand(function help() {
    const list = [
        "help\n- Shows this.",
        "shop\n- Shows the available purchasable items.",
        "update\n- Increases points. Equivalent of clicking in a clicker game.",
        "charge\n- Gain power.",
        "github\n- Shows the github repo link.",
        "credits\n- Shows the credits.",
        "balance\n- Shows your balance.",
        "discord\n- Gives a link to the terminus.js discord.",
        "hints\n- Shows a hint.",
        "tutorial\n- Shows a quick tutorial.",
        "achievements\n- Shows achievements.",
        "savemygame\n - Saves your game. MAKE SURE TO SAVE",
        "loadmygame\n - Loads your most recent save."
    ];

    if (game.unlocks.infshop) {
        list.push("infshop\n- Shows infinitely purchasable items.");
    }

    terminal.log(...list);
});

terminal.addCommand(function balance() {
    terminal.log(`Your current balance is ${game.points.toFixed(2)} points.`);
});


game.power$onChange(async (power) => {
    if (game.power == game.maxbattery) {
        return terminal.log("Full charge.");
    }
    await sleep(1000);
    terminal.log("Current battery: " + game.power);
});

terminal.addCommand(function charge() {
    if (!game.chargeCooldown) {
        if (game.power < game.maxbattery) {
            game.power = game.power + game.rechargerate;
            game.chargeCooldown = true;
            setTimeout(() => {
                game.chargeCooldown = false;
            }, 3000); // 5 seconds cooldown
        }
    } else {
        terminal.log("Charge command is on cooldown. Please wait a few seconds.");
    }
});

const exptolevel = 100;

terminal.addCommand(function update() {
    if (game.power <= 0) {
        game.xp = game.xp + 10;
        terminal.log("Gained 10 exp.");
        if (game.xp == exptolevel) {
            game.skillpoints = game.skillpoints + 1;
            terminal.log("Leveled up!");
        }
        return;
    }

    game.powerpoints = game.power / game.antipower;
    game.power -= 1;

    game.pointcalc();
});

terminal.addCommand(function shop() {
    terminal.log(...[
        "begin: $5.........The beginning",
        "index: $20........index.html",
        "doctype: $50......<!DOCTYPE HTML>",
        "configyml: $100...config.yml",
        game.upgstage === 0
            ? "push: $500........git push 1"
            : game.upgstage === 1
            ? "push: $5000.......git push 2"
            : game.upgstage === 2
            ? "push: $50000......git push 3"
            : "push: $???........git push ?",
    ]);
});

game.unlocks.begin$on(true, () => {
    game.basegain = 10;
    game.points -= 5
    terminal.log("Began!");
});
terminal.addCommand(function begin() {
    if (game.indebted) return terminal.log("Cannot afford!");
    game.unlocks.begin = true;
    terminal.changeCommand(function begin() {
        terminal.log("You already began.");
    });
});

game.unlocks.index$on(true, () => {
    game.steptwomult += 0.5;
    game.points -= 20
    terminal.log("Created index.html!");
});
terminal.addCommand(function index() {
    if (game.indebted) return terminal.log("Cannot afford!");
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
    if (game.indebted) return terminal.log("Cannot afford!");
    game.unlocks.doctype = true;
    terminal.changeCommand(function doctype() {
        terminal.log(
            "You- YOU ALREADY ADDED <!DOCTYPE HTML> YOU DONT NEED TO PUT IT EVERY TIME YOU ADD <BODY> STOP PLEASE",
        );
    });
});

game.unlocks.configyml$on(true, () => {
    game.stepfourmult *= 2;
    game.points -= 100;
    terminal.log("Created config.yml!");
});
terminal.addCommand(function configyml() {
    if (game.indebted) return terminal.log("Cannot afford!");
    game.unlocks.configyml = true;
    terminal.changeCommand(function configyml() {
        terminal.log("You already created config.yml");
    });
});

game.upgstage$on(1, () =>
    terminal.changeCommand(function push() {
        if (game.indebted) return "Come back when you're a little bit richer";

        game.upgstage = 2;
        game.points -= 5000;
    }));
game.upgstage$on(2, () =>
    terminal.changeCommand(function push() {
        if (game.indebted) return "Come back when you're a little bit richer";

        game.upgstage = 3;
        game.points -= 50000;
        return `You have ${game.points} points`;
    }));
game.upgstage$on(3, () =>
    terminal.changeCommand(function push3() {
        terminal.log("Please don't try this again, it's not funny");
    }));
terminal.addCommand(function push() {
    if (game.indebted) {
        return terminal.log("you are brokies :3");
    }

    game.unlocks.infshop = true;
    game.upgstage = 1;
    game.points -= 500;
});

game.unlocks.infshop$on(true, () => {
    terminal.log("You've unlocked the infshop. Check 'help' for details.");
    terminal.changeCommand(function infshop() {
        let list = game.upgstage === 1
            ? [ // todo: Export cost calculations
                `stepone: $${
                    5 + game.upgpriceboost
                }\nIncreases step 1 addition`,
                `steptwo: $${
                    25 + game.upgpriceboost
                }\nIncreases step 2 multiplier`,
                `stepthree: $${
                    25 + game.upgpriceboost
                }\nIncreases step 3 multiplier`,
                `stepfour: $${
                    2 + game.upgpriceboost
                }\nIncreases step 4 addition`,
            ]
            : [
                `stepone: $${
                    20 + game.upgpriceboost
                }\nIncreases step 1 addition`,
                `steptwo: $${
                    100 + game.upgpriceboost
                }\nIncreases step 2 multiplier`,
                `stepthree: $${
                    100 + game.upgpriceboost
                }\nIncreases step 3 multiplier`,
                `stepfour: $${
                    8 + game.upgpriceboost
                }\nIncreases step 4 addition`,
                `maxpowerup: $${
                    800 + game.upgpriceboost
                }\nIncreases the maximum battery.`,
            ];

        list = [
            `Stage ${game.upgstage} upgrades`,
            ...list,
            `baseup: $${
                500 + game.upgpriceboost
            }\nIncreases the base that is then multiplied etc etc`,
            `upgbonus: $${
                100 + game.upgpriceboost
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
        if (game.indebted) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 5 +
            game.upgpriceboost * game.upgpriceboost;
        game.steponeadd += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased stepone;");
    });

    terminal.changeCommand(function steptwo() {
        if (game.indebted) return terminal.log("You don't have enough money");

        game.points -= 25 +
            game.upgpriceboost * game.upgpriceboost;
        game.steptwomult += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased steptwo;");
    });

    terminal.changeCommand(function stepthree() {
        if (game.indebted) return terminal.log("You don't have enough money");

        game.points -= 25 +
            game.upgpriceboost * game.upgpriceboost;
        game.stepthreemult += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased stepthree;");
    });

    terminal.changeCommand(function stepfour() {
        if (game.indebted) return terminal.log("You don't have enough money");

        game.points -= 2 +
            game.upgpriceboost * game.upgpriceboost;
        game.stepfouradd += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased stepfour;");
    });

    terminal.changeCommand(function baseup() {
        if (game.indebted) return terminal.log("You don't have enough money");

        game.points -= 500 +
            game.upgpriceboost * game.upgpriceboost;
        game.basegain += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased baseup;");
    });

    terminal.changeCommand(function upgbonus() {
        if (game.indebted) {
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
        if (game.indebted) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 20 +
            game.upgpriceboost * game.upgpriceboost;
        game.steponeadd += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased stepone;");
    });

    terminal.changeCommand(function steptwo() {
        if (game.indebted) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 100 +
            game.upgpriceboost * game.upgpriceboost;
        game.steptwomult += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased steptwo;");
    });

    terminal.changeCommand(function stepthree() {
        if (game.indebted) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 100 +
            game.upgpriceboost * game.upgpriceboost;
        game.stepthreemult += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased stepthree;");
    });

    terminal.changeCommand(function stepfour() {
        if (game.indebted) {
            return terminal.log("You don't have enough money");
        }

        game.points -= 8 +
            game.upgpriceboost * game.upgpriceboost;
        game.stepfouradd += game.upgradebonus;
        game.upgpriceboost += 5;

        terminal.log("purchased stepfour;");
    });
    terminal.changeCommand(function maxpowerup() {
        if (game.indebted) {
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
    return terminal.log("You have not unlocked infinite upgrades.");
});
terminal.addCommand(function steptwo() {
    return terminal.log("You have not unlocked infinite upgrades.");
});
terminal.addCommand(function stepthree() {
    return terminal.log("You have not unlocked infinite upgrades.");
});
terminal.addCommand(function stepfour() {
    return terminal.log("You have not unlocked infinite upgrades.");
});
terminal.addCommand(function baseup() {
    return terminal.log("You have not unlocked infinite upgrades.");
});
terminal.addCommand(function upgbonus() {
    return terminal.log("You have not unlocked infinite upgrades.");
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
const ssecret = new Achievement({
    name: "Secret",
    description: "Its secret",
    requirements: [],
    eventValueSubscription: game.points$subscription(),
    criteria: (p) => p <= secret,
    reward: game.xp = game.xp + 5,
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
    description: "Get a power value over the default maximum.",
    eventValueSubscription: game.power$subscription(),
    criteria: (p) => p > 15, // default maximum
    action: () => {},
});
const tutorialAch = new Achievement({
    name: "Tutorial",
    description: "Complete the tutorial.",
    eventValueSubscription: game.unlocks$subscription(),
    reward: game.xp = game.xp + 5,
    criteria: (unlocks) => unlocks.tutorialCompleted === true,
    action: () => {},
});
const cod = new fish("Cod", "A silly lil fish", 25, 50)

terminal.addCommand(function catchmeafish() {
    cod.catchafish //Add your own fish.catchafish here! without it the fish no catchy watchy with this function
})
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
        terminal.log("Make a save before loading, I'd rather you not get softlocked.");
    }
});

// Music engine, when adding song(s), place in `mus` folder as a number, then increment game.totalmus by 1. Eg, there are 5 songs, so if you want to add a 6th one, you place it in the mus folder as '6.wav' and set game.totalmus to 6.

terminal.addCommand(function playasong() {
    let playedsong = randomnumbah(1, game.totalmus);
    let playedsongdir = `../resources/mus/${playedsong}.wav`;
    let audio = new Audio(playedsongdir);

    audio.addEventListener('canplaythrough', function() {
        if (playedsong === 1) {
            terminal.mus("Terminus Tune -Rando");
        } else {
            terminal.mus(`${playedsong}.wav`);
        }
        audio.play();
    });

    audio.addEventListener('error', function() {
        terminal.log(`Error loading audio file: ${playedsongdir}`);
    });
});