const cl = console.log
import { fontList } from './modules/fontList.js';
import { dynamicFontSize } from './modules/dynamicFontSize.js';

const global = {
    name : 'Jack Wilcox',
    eachLetter : [] // eventually create array of objects for each letter
}

main()
function main() {
    makeEachLetterAnObject ()
}

function makeEachLetterAnObject () {
    for (let i= 0; i < global.name.length; i++) 
        global.eachLetter[i] = {'letter': global.name[i]}
}

cl(global.eachLetter[1].letter)

let test = dynamicFontSize(14,1360)
cl(test)