//DEVELOPMENT BUILD V6
//Changelog:
//Fixed the tier system not being properly unimplemented










//code i stole from stack overflow
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
//End of code i stole from stack overflow



//The variables for determining how many points you make from any given update.
var basegain = 1;
var steponeadd = 0;
var steptwomult = 1;
var stepthreemult = 1;
var stepfouradd = 1;
var points = 0;
var upgbonusvar = 1
var upgpriceboost = 0;
var upgstage = 1;


function info() {
    console.log("Note that this game is played entirely in the js console.");
    console.log("Use update(); to update your monies.");
    console.log("fyi some mechanics of this game rely on update(); being manyally used so no, this isn't an idle game.");
    console.log("do infshop(); to view unlimitedly purchasable upgrades.")
}

function update() {
    if (points < 0) {
        var debtflag = 1;
    }
    points = basegain + steponeadd * steptwomult * stepthreemult + stepfouradd;
    if (debtflag = 1) {
        if (points < 0) {
            points = 0;
            debtflag = 0;
        }
        else {
            debtflag = 0
            console.log("You got out of debt!");
        }
    }
    console.log("you have ", points, " points");
}

function infshop() {
    console.log("See code comments for upgrade descriptions")
    if (upgstage == 1) {
    console.log("Step one Upgrade.......$5....stepone();"); //Increases step 1 addition
    console.log("Step two Upgrade.......$25...steptwo();"); //Increases step 2 mult
    console.log("Step three Upgrade.....$25...stepthree();"); //Increases step 3 mult
    console.log("Step four Upgrade......$2....stepfour();"); //Increases step 4 addition
    }
    console.log("Base increment Upgrade.$500...baseup();"); //Increases the base that is then multiplied etc etc
    console.log("Upgrade bonus..........$100..upgbonus();"); //Increases how much upgrades upgrade stuff OTHER THAN ITSELF. THIS IS NOT EXPONENTIAL. YET. IDK GIMME AN ISSUE REPORT IF ITS UNFUN OR SMTH.
    console.log("hello world!...........$0....helloworld();"); //Prints "Hello world!" in console as many times as you have purchased upgbonus();

}

function stepone() {
    if (upgstage == 1)  {
    if (points >= 0) {
        points = points - 5 - upgpriceboost;
    steponeadd = steponeadd + upgbonusvar;
    console.log("purchased stepone();")
    }
    else {
      console.log("ERROR CODE 85BB65");
    }
    }
    else {
        console.log("Lol you leveled up too much krill issue.")

    }
}


function steptwo() {
    if (upgstage == 1) {
    if (points >= 0) {
        points = points - 25 - upgpriceboost;
        steptwomult = steptwomult + upgbonusvar;
        console.log("purchased steptwo();")
        upgpriceboost = upgpriceboost + 1;
    }
    else {
        console.log("ERROR CODE 85BB65");

    }
    }
    else {
        console.log("Lol you leveled up too much krill issue.")

    }
}

function stepthree() {
    if (upgstage == 1) {
    if (points >= 0) {
        points = points - 25 - upgpriceboost;
        stepthreemult = stepthreemult + upgbonusvar;
        console.log("purchased stepthree();")
        upgpriceboost = upgpriceboost + 1;
    }
    else {
        console.log("ERROR CODE 85BB65");
    }
    }
    else {
        console.log("Lol you leveled up too much krill issue.")
    }
}

function stepfour() {
    if (upgstage == 1) {
    if (points >= 0) {
        points = points - 2 - upgpriceboost;
        stepfouraddition = stepfouraddition + upgbonusvar;
        console.log("purchased stepfour();");
        upgpriceboost = upgpriceboost + 1;
    }
    
    else {
        console.log("ERROR CODE 85BB65");
    }
    }
    else {
         console.log("Lol you leveled up too much krill issue.")

    }
}

function baseup() {
    if (points >= 0) {
        points = points - 500 - upgpriceboost;
        basegain = basegain + upgbonusvar;
        console.log("purchased baseup();");
        upgpriceboost = upgpriceboost + 1;
    }
    else {
        console.log("ERROR CODE 85BB65");

    }
}

function upgbonus() {
    if (points >= 0) {
        points = points - 100 - upgpriceboost;
        upgbonusvar = upgbonusvar + 0.1;
        console.log("purchased upgbonus();");
        upgpriceboost = upgpriceboost + 1;
    }
    else {
        console.log("ERROR CODE 85BB65");
    }

}

function helloworld() {
    console.log("hello world");
    var helloworld = prompt("Hello World?")
    if (helloworld=="Hello World") {
       prompt("Yay!");
    }
    else {
        prompt("Monster.");
    }
}


