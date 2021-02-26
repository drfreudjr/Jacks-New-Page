const cl = console.log;
import { fontList } from './modules/fontList.js';
import { dynamicFontSize } from './modules/dynamicFontSize.js';
import { randomCharacterString } from './modules/randomCharacterString.js' // arg = length

let global = {
    initialWord : 'Jack Wilcox',
    wordMatchTable: [],
    boxSize: 50,
    letterToBoxRatio : .9,
    startingArraySpotX : 0,
    startingArraySpotY :0,
    lightColor : '#ffffff',
    darkColor : '#808080',
    initialFps : 5,
    initialFpsIncrementor : .4,
    initialCyclesPerFrame : 1,
    cyclesBeforeOverdrive : 200,
    totalNumberofPaints : 0,  // keep track of total refreshes as a timer of sorts
}

let letterSize = global.letterToBoxRatio*global.boxSize // set initial calculated values
let fps = global.initialFps 
let fpsIncrementor = global.initialFpsIncrementor
let cyclesPerFrame = global.initialCyclesPerFrame

for (let i = 0; i < global.initialWord.length; ++i) // initialize matching table
    global.wordMatchTable[i] = false

cl(global.wordMatchTable)


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

function getCenterXPosition (randomContent, stringPlacementX) {  // returns x position to draw letter in box
            let metrics = context.measureText(randomContent);  
            let textWidth = metrics.width
            let centerOfBox = stringPlacementX + (.5*global.boxSize)
            let xPosition = centerOfBox - (.5*textWidth)
            return (xPosition)
}

function drawScreen() {  // wrapper that gets called on resize event




drawLetters()
function drawLetters (){
    global.totalNumberofPaints ++
    if (global.totalNumberofPaints < 300) {
        setTimeout(function() {
            drawLetter()
            requestAnimationFrame(drawLetters)

            fpsIncrementor +=.2    // increase the increaser each time thru to get acceleration
            fps += fpsIncrementor   // basic speeding up replacement speed 
        }, 1000 / fps)
    }
}

function drawLetter () {  

    if (fps > global.cyclesBeforeOverdrive) ++ cyclesPerFrame   // cycles before starting overdrive

    for (let i = 0; i < cyclesPerFrame; ++i) { //  just at one per animation frame until overdrive 

        let positionToChange = (Math.floor(Math.random()*global.initialWord.length))
        let stringPlacementX = global.startingArraySpotX+((positionToChange)*global.boxSize) // move one box away for each positio
        let stringPlacementY = global.startingArraySpotY*((positionToChange)*global.boxSize)

        context.fillStyle = (Math.floor(Math.random()*2) == 0) ? global.darkColor : global.lightColor // random bg
        context.fillRect(stringPlacementX, stringPlacementY, global.boxSize, global.boxSize)
        context.fillStyle = (context.fillStyle == global.lightColor) ?  global.darkColor : global.lightColor // opposite fg
        context.font = `${letterSize}px serif`

        let randomContent = randomCharacterString(1) // module call <arg> is length
        let xPosition = getCenterXPosition(randomContent, stringPlacementX)
        let yPosition = stringPlacementY + (.77*global.boxSize) // hacky center letter vertically
        context.fillText (randomContent, xPosition, yPosition)
    }


}  // drawLetter function


}   // end drawScreen wrapper
}   // end onload wrapper