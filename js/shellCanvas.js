const cl = console.log;
import { fontList } from './modules/fontList.js';
import { dynamicFontSize } from './modules/dynamicFontSize.js';
import { randomCharacterString } from './modules/randomCharacterString.js' // arg = length

let global = {
    initialWord : 'Jack Wilcox',
    wordMatchTable: [], // stores whether letter from initial word rendered
    boxSize: 50,        // size of container for letters
    letterToBoxRatio : .9,  // how big is the letter relative to box
    startingArraySpotX : 0, // where to draw the whole thing
    startingArraySpotY :0,
    lightColor : '#ffffff',
    darkColor : '#808080',
    initialFps : 5,
    initialFpsIncrementor : 1,
    incrementorIncrementor : .2, // this controls the acceleration
    initialCyclesPerFrame : 1,  // how many letters to draw per paint
    cyclesBeforeOverdrive : 200, // when to increase letters/paint
    totalNumberofPaints : 0,  // keep track of total refreshes as a timer of sorts
    delayBeforeLockingLetters : 250, // how long before starting to seed te word letters
}

let letterSize = global.letterToBoxRatio*global.boxSize // set calculated lettersize
let fps = global.initialFps 
let fpsIncrementor = global.initialFpsIncrementor
let cyclesPerFrame = global.initialCyclesPerFrame
let lockInPosition = 0 // what letter to lock in

for (let i = 0; i < global.initialWord.length; ++i) // seed letter matching table
    global.wordMatchTable[i] = false

window.onload = function () {           // onload wrapper
                                        
var canvas;    // Global 2D context reference                            
var context;   // Global canvas object reference

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

function getCenterXPosition (randomCharacter, stringPlacementX) {  // returns x position to draw letter in box
            let metrics = context.measureText(randomCharacter);  
            let textWidth = metrics.width
            let centerOfBox = stringPlacementX + (.5*global.boxSize)
            let xPosition = centerOfBox - (.5*textWidth)
            return (xPosition)
}

function drawScreen() {  // wrapper that gets called on resize event

animation()
function animation (){
    // cl(global.totalNumberofPaints, cyclesPerFrame)
    global.totalNumberofPaints ++
    if (fps > global.cyclesBeforeOverdrive) {
        ++ cyclesPerFrame // twice the writing per paint so..
        fps *=.5    // half the fps (which will keep increasing)
    }

    setTimeout(function() {
        drawLetter()
        requestAnimationFrame(animation)
        fpsIncrementor +=global.incrementorIncrementor   // increase the increaser each time thru to get acceleration
        fps += fpsIncrementor   // basic speeding up replacement speed 
    }, 1000 / fps)
}

function drawLetter () {  

    for (let i = 0; i < cyclesPerFrame; ++i) { //  just at one per animation frame until overdrive 

        let positionToChange = (Math.floor(Math.random()*global.initialWord.length))
        let randomCharacter = randomCharacterString(1) // external module call <arg> is length
        context.font = `${letterSize}px serif`

        let stringPlacementX = global.startingArraySpotX+((positionToChange)*global.boxSize) // move one box away for each position
        let stringPlacementY = global.startingArraySpotY*((positionToChange)*global.boxSize)


        context.fillStyle = (Math.floor(Math.random()*2) == 0) ? global.darkColor : global.lightColor // random bg

        if (global.totalNumberofPaints > global.delayBeforeLockingLetters) // bg dark
            context.fillStyle = global.darkColor

        context.fillRect(stringPlacementX, stringPlacementY, global.boxSize, global.boxSize)
        context.fillStyle = (context.fillStyle == global.lightColor) ?  global.darkColor : global.lightColor // opposite fg

        let xPosition = getCenterXPosition(randomCharacter, stringPlacementX)
        let yPosition = stringPlacementY + (.77*global.boxSize) // hacky center letter vertically

        if (global.totalNumberofPaints > global.delayBeforeLockingLetters) {    // start locking letters
            global.delayBeforeLockingLetters += Math.floor(Math.random()*30)    // kick the can to the next time
            context.fillStyle = global.darkColor
        }
        cl (global.wordMatchTable[positionToChange])
        context.fillText (randomCharacter, xPosition, yPosition) // draw the damn thing
    }
}  // drawLetter function


}   // end drawScreen wrapper
}   // end onload wrapper

        // if (global.wordMatchTable[positionToChange] == false) {// see if letter locked in 

// when 107 true, insert letter, then increase delay variable by random amount tehn it should triger again