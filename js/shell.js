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

        var element = document.getElementById("name")
        var newTextNode = document.createTextNode('')
        var nameEl = document.createElement('span')
        element.appendChild(nameEl)

        upDateAnimation(0)

        let iteration = 0

    function upDateAnimation (iteration) {

        if (iteration < global.name.length) {
            let x = randomCharacterString(1)
            nameEl.innerText = x 
            // window.requestAnimationFrame(upDateAnimation)
            setTimeout(printNameAnimation, 10, ++iteration) 
            ++iteration
            cl(iteration)
            }      
        }


}

