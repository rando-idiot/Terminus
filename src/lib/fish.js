import { randomnumbah } from "./helpers.js"
import { Terminal } from "./terminal.js"

export class fish {
    constructor(name, desc, price, chance) {
        this.name = name
        this.desc = desc
        this.price = price
        this.chance = chance //Out of 100
    }
        catchafish() {
            let didyacatchit = randomnumbah(1, 100)
            if (didyacatchit >= 0 && didyacatchit <= this.chance) {
                Terminal.log("You caught a" + this.name + "!");
                Terminal.log("''" + this.desc + "''");
                game.points += this.price
            }
        }
    

}



