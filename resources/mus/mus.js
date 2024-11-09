//Music engine, when adding song(s), place in `mus` folder as a number, then increment game.totalmus by 1. Eg, there are 5 songs, so if you want to add a 6th one, you place it in the mus folder as '6.wav' and set game.totalmus to 6.
import { Terminal } from "../../src/lib/terminal.js";


const totalmus = 1
export function musengine() {
    let playedsong = (randomnumbah(1, totalmus)) 
    let playedsongdir = "./" + playedsong + ".wav";
    let audio = new Audio(playedsongdir);
    audio.play();
}