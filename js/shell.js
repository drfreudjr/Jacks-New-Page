const cl = console.log
import { fontList } from './modules/fontList.js';

const global = {
    name : 'Jack Wilcox',
    eachLetter : [] // eventually create array of objects for each letter
}

main()
function main() {
    makeEachLetterAnObjectAndPutItIntoAnArray ()
}

function makeEachLetterAnObjectAndPutItIntoAnArray  () {
    for (let i= 0; i < global.name.length; i++) 
        global.eachLetter[i] = {'letter': global.name[i]}
}

cl(global.eachLetter[0].letter)