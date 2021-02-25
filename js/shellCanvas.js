const cl = console.log;
import { fontList } from './modules/fontList.js';
import { dynamicFontSize } from './modules/dynamicFontSize.js';
import { randomCharacterString } from './modules/randomCharacterString.js' // arg = length

let global = {
    initialWord : 'Jack Wilcox',
    boxSize: 50,
    letterToBoxRatio : .9,
    startingArraySpotX : 0,
    startingArraySpotY :0,
    lightColor : '#ffffff',
    darkColor : '#808080',
    initialFps : 5,
    initialFpsIncrementor : .3,
    initialCyclesPerFrame : 1,
}

let fpsIncrementor = .3 //starting incrementor
let letterSize = global.letterToBoxRatio*global.boxSize

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

//  // Enter Page Specific Code here

function drawScreen() {  // wrapper that gets called on resize event

drawLetters()
function drawLetters () { 
    let fps = global.initialFps 
    let fpsIncrementor = global.initialFpsIncrementor
    let cyclesPerFrame = global.initialCyclesPerFrame

    drawLetter()
    function drawLetter () {  

        if (fps > 2000) ++ cyclesPerFrame   // cycles before starting overdrive

        for (let i = 0; i < cyclesPerFrame; ++i) { //  just at one per animation frame until overdrive 
            fpsIncrementor +=.08    // increase the increaser each time thru
            fps += fpsIncrementor   // basic speeding up replacement speed

            let positionToChange = (Math.floor(Math.random()*global.initialWord.length))

            let stringPlacementX = global.startingArraySpotX+((positionToChange)*global.boxSize) // move one box away for each positio
            let stringPlacementY = global.startingArraySpotY*((positionToChange)*global.boxSize)

            context.fillStyle = (Math.floor(Math.random()*2) == 0) ? global.darkColor : global.lightColor // random bg
            context.fillRect(stringPlacementX, stringPlacementY, global.boxSize, global.boxSize)

            context.fillStyle = (context.fillStyle == global.lightColor) ?  global.darkColor : global.lightColor // opposite fg

            context.font = `${letterSize}px serif`

            let randomContent = randomCharacterString(1)

            let metrics = context.measureText(randomContent);   // center letter in box horizontally
            let textWidth = metrics.width
            let centerOfBox = stringPlacementX + (.5*global.boxSize)
            let xPosition = centerOfBox - (.5*textWidth)

            let yPosition = stringPlacementY + (.77*global.boxSize) // hacky center letter vertically
            context.fillText (randomContent, xPosition, yPosition)
        }
        setTimeout(function() {
        requestAnimationFrame(drawLetter)
        }, 1000 / fps)
    }
}


}   // end drawScreen wrapper
}   // end onload wrapper