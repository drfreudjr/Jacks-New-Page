const cl = console.log
import { fontList } from './modules/fontList.js';
import { dynamicFontSize } from './modules/dynamicFontSize.js';
import { randomCharacterString } from './modules/randomCharacterString.js' // arg = length

const global = {
    name : 'Jack Wilcox',
    fontSize : 14,
    eachLetter : [{}], // create array of objects for each letter
}

main()
function main() {
    makeEachLetterAnObject()
    printNameAnimation()
}

function makeEachLetterAnObject() {
    for (let i= 0; i < global.name.length; i++) 
        global.eachLetter[i] = {'letter': global.name[i]} 
}

function printNameAnimation() {
    var nameEl = document.createElement('p')


    let x = randomCharacterString(global.name.length)

    var newTextNode = document.createTextNode(x)
    nameEl.appendChild(newTextNode)

    var element = document.getElementById("name")
    element.appendChild(nameEl)

}