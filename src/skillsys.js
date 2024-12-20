import { randomnumber as rng} from './lib/helpers.js'
import { game } from './game.js'

let catnum = 0 //Number of diff categories
let progress = 0
let skillpoint = 0

class skillcontainer {
    constructor(category, size, rarity) {
        category = this.category //Valid categories: N/A
        size = this.size //Num of skills within
        rarity = this.rarity //Rarity of skills within. 1-3
        completed = false
        cost = (rarity * (size / 2) * (progress + 1)) * 5

        function buy() {
        
        }
    }
}

function genskillcontainer(quality) {
    if (quality >= 10) {
        let category = rng(1, catnum)
        let size = rng(4, 24) 
        let output = new skillcontainer(category, size, 3)
    }
    return output
}