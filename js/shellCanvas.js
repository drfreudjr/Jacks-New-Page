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
let boxSize = 10   //
let startingSpotX = 50
let startingSpotY = 50

for (let i = 0; i < initialWord.length; ++i) {  // seed it
    currentWordArray[i] = randomCharacterString(1)
}

drawLetters()
function drawLetters () { // just work on the first letter
    drawLetter()
    function drawLetter () {    
        if (Math.floor(Math.random()*2) == 0) 
            context.fillStyle = '#ffffff'
        else 
            context.fillStyle = '#808080'
        context.fillRect(startingSpotX, startingSpotY, startingSpotX + boxSize, startingSpotY + boxSize)

        cl(context.fillStyle)

        if (context.fillStyle == '#ffffff') {    // whatever the background switch the other to foreground
            context.fillStyle = '#808080'
        }
        else
            context.fillStyle = '#ffffff'
        
        cl(context.fillStyle)
        // set font size as percent of box size
        // draw it in color already set
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