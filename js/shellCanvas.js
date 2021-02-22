const cl = console.log;
import { fontList } from './modules/fontList.js';
import { dynamicFontSize } from './modules/dynamicFontSize.js';
import { randomCharacterString } from './modules/randomCharacterString.js' // arg = length


window.onload = function () {           // onload wrapper
                                        // Global 2D context reference
var canvas;                             // Global canvas object reference
var context; 

// // Begin dynamic fulls screen canvas code

sizeCanvas()                            // create initial canvas
addEventListener("resize", sizeCanvas); // resize canvas and redraw on window size change

function createCanvas () {   
    const canvas = document.createElement("canvas"); 
    canvas.style.position = "absolute"; 
    canvas.style.left     = "0px";      
    canvas.style.top      = "0px";

    document.body.appendChild(canvas);  // Add to document
    return canvas;
}

function sizeCanvas () {                // Create or resize 
    if (canvas === undefined) {         
        canvas = createCanvas();        
        context = canvas.getContext("2d");  
    }
    canvas.width  = innerWidth; 
    canvas.height = innerHeight; 
    drawScreen()     
}

function drawScreen() {  // wrapper that gets called on resize event

     //  // Enter Page Specific Code here


const initialWord = 'Jack Wilcox'



let currentWordArray = []   // the working random string
let boxSize = 100   //
let letterToBoxRatio = .8
let letterSize = letterToBoxRatio*boxSize
let startingSpotX = 50
let startingSpotY = 50

for (let i = 0; i < initialWord.length; ++i) {  // seed it
    currentWordArray[i] = randomCharacterString(1)
}

drawLetters()
function drawLetters () { // just work on the first letter

    drawLetter()
    function drawLetter () {    
        const lightColor = '#ffffff'
        const darkColor = '#808080'

        context.fillStyle = (Math.floor(Math.random()*2) == 0) ? darkColor : lightColor // random bg
        context.fillRect(startingSpotX, startingSpotY, boxSize, boxSize)

        cl(context.fillStyle)

        context.fillStyle = (context.fillStyle == lightColor) ?  darkColor : lightColor // opposite fg
        cl(context.fillStyle)

        let fontText = `${letterSize}px serif`
        context.font = fontText
        cl(context.font, context.fillStyle)
        context.fillText ('a',startingSpotX*letterToBoxRatio, startingSpotY*letterToBoxRatio)
    }

}








// testCanvas()
// function testCanvas() {
//     context.fillStyle = "#ff0000"
//     context.fillRect (60,60,100,100)
// }

// testAddObect()
// function testAddObect() {

//         var element = document.getElementById("name")
//         var newTextNode = document.createTextNode('')
//         var nameEl = document.createElement('span')
//         element.appendChild(nameEl)

//         let x = randomCharacterString(10)
//         nameEl.innerText = (`Object created by appendChild: ${x}`)
// }

}   // end drawScreen wrapper
}   // end onload wrapper