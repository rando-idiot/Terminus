import { randomnumber } from "./helpers.js"
import { Terminal, logstyles } from "./terminal.js"

export class fish {
    constructor(name, desc, price, chance) {
        this.name = name
        this.desc = desc
        this.price = price
        this.chance = chance //Out of 100
    }
        catchafish() {
            let didyacatchit = randomnumber(1, 100)
            if (didyacatchit >= 0 && didyacatchit <= this.chance) {
                terminal.log(logstyles.log, "You caught a" + this.name + "!");
                terminal.log(logstyles.log, "''" + this.desc + "''");
                game.points += this.price
            }
        }
    

}



