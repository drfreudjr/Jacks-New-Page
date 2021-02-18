const cl = console.log
import { fontList } from './modules/fontList.js';
import { dynamicFontSize } from './modules/dynamicFontSize.js';
import { getRandomCharacterString } from './modules/getRandomCharacterString.js' // arg = length

const global = {
    name : 'Jack Wilcox',
    fontSize : 14,
    eachLetter : [{}], // create array of objects for each letter
}

main()
function main() {
    makeEachLetterAnObject()
    // printNameAnimation()
}

function makeEachLetterAnObject() {
    for (let i= 0; i < global.name.length; i++) 
        global.eachLetter[i] = {'letter': global.name[i]} 
}

getRandomCharacterString(global.name.length)

cl(global.eachLetter[1])
cl(getRandomCharacterString(8))