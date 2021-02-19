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

    function upDateAnimation () {
        let x = randomCharacterString(global.name.length)
        nameEl.innerText = x
    }

    var element = document.getElementById("name")
    var newTextNode = document.createTextNode('')
    var nameEl = document.createElement('div')
    element.appendChild(nameEl)

    let count = 0
    while (count < 100) {
        upDateAnimation()
    }

    cl(count)
}

// try creating and destroying the object each time