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

let boxSize = 50   //
let letterToBoxRatio = .9
let letterSize = letterToBoxRatio*boxSize
let startingArraySpotX = 0
let startingArraySpotY = 0

drawLetters()
function drawLetters () { // just work on the first letter

window.dispatchEvent(new Event('resize'));

    var fps = 0 
    var cyclesPerFrame = 1
    const lightColor = '#ffffff'
    const darkColor = '#808080'

    drawLetter()
    function drawLetter () {  

        for (let i = 0; i < cyclesPerFrame; ++i)  {   // cycles before rendering
            fps += .8   // basic speeding up replacement speed

            let positionToChange = (Math.floor(Math.random()*initialWord.length))

            let startingSpotX = startingArraySpotX+((positionToChange)*boxSize) 
            let startingSpotY = startingArraySpotY*((positionToChange)*boxSize)

            context.fillStyle = (Math.floor(Math.random()*2) == 0) ? darkColor : lightColor // random bg
            context.fillRect(startingSpotX, startingSpotY, boxSize, boxSize)

            context.fillStyle = (context.fillStyle == lightColor) ?  darkColor : lightColor // opposite fg

            context.font = `${letterSize}px serif`

            let randomContent = randomCharacterString(1)

            let metrics = context.measureText(randomContent);
            let textWidth = metrics.width
            let centerOfBox = startingSpotX + (.5*boxSize)
            let xPosition = centerOfBox - (.5*textWidth)

            let yPosition = startingSpotY + (.77*boxSize) // hacky approximation
            context.fillText (randomContent,xPosition, yPosition)
        }
        setTimeout(function() {
        requestAnimationFrame(drawLetter)
        }, 1000 / fps)
    }
}


}   // end drawScreen wrapper
}   // end onload wrapper