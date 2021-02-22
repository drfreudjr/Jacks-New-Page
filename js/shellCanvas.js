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

for (let i = 0; i < initialWord.length; ++i) {  // seed it
    currentWordArray[i] = randomCharacterString(1)
}

cl(currentWordArray)





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