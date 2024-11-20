import { events } from "./lib/events.js";
export let game = events({
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

