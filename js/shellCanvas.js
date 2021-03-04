
const cl = console.log;
import { fontList } from './modules/fontList.js';
import { dynamicFontSize } from './modules/dynamicFontSize.js';
import { randomCharacterString } from './modules/randomCharacterString.js' // arg = length

window.onload = function () {           // onload wrapper

let page = {   // page global object
    phraseToDraw : 'Jack Wilcox Productions',
    widthPercentage:   .5, // what percentage of screen width to fill
    verticalPlacement: 2.5, // higher puts the string higher to the stop
    boxSize: 50,        // size of container for letters
    letterToBoxRatio : 1.0,  // how big is the letter relative to box
    startingArraySpotX : 50, // where to place the whole thing
    startingArraySpotY :null,
    lightColor : '#ffffff',
    medColor: '#dddddd',
    darkColor : '#000000',
    initialFps : 1,
    initialFpsIncrementor : 0,
    incrementorIncrementor : 1.3 , // this controls the acceleration
    initialCyclesPerFrame : 1,  // how many letters to draw per paint
    delayBetweenLockingLetters : 5,
    cyclesBeforeOverdrive : 500, // when to increase letters/paint
    totalNumberofPaints : 0,  // keep track of total refreshes as a timer of sorts
    delayBeforeLockingLetters : 110, // how long before starting to seed te word letters
    letterLockedIn: [], // array with truth table for whether letter is locked in
    randomNoReplacementArray: [],  // array used to generate random but non repetitive phraseToDraw
}

let letterSize = page.letterToBoxRatio*page.boxSize // set calculated lettersize
let fps = page.initialFps 
let fpsIncrementor = page.initialFpsIncrementor
let cyclesPerFrame = page.initialCyclesPerFrame
let charactersLockedIn = 0 
page.startingArraySpotX = (1-page.widthPercentage)*innerWidth/2


                                        
var canvas;    // Global 2D context reference                            
var context;   // Global canvas object reference

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

// Enter Page Specific Code here
 letterSize = page.letterToBoxRatio*page.boxSize // reset all this stuff in cse of resize
 fps = page.initialFps 
 fpsIncrementor = page.initialFpsIncrementor
 cyclesPerFrame = page.initialCyclesPerFrame
 charactersLockedIn = 0
 page.startingArraySpotX = (1-page.widthPercentage)*innerWidth/2


main()
function main () {
    lettersAnimation()
}

for (let i = 0; i < page.phraseToDraw.length; ++i) {
    page.letterLockedIn[i] = false // seed letter matching table
    page.randomNoReplacementArray[i] = i
}

function lettersAnimation () {
    if (charactersLockedIn <page.phraseToDraw.length) { // keep drawing until last lockInLetter
        if (fps > page.cyclesBeforeOverdrive) { 
            ++ cyclesPerFrame // twice the writing per paint so..
            fps *=.5    // half the fps (which will keep increasing)
        }
        setTimeout(function() {
           drawLetter()
            requestAnimationFrame(lettersAnimation)
            fpsIncrementor +=page.incrementorIncrementor   // increase the increaser each time thru to get acceleration
            fps += fpsIncrementor   // basic speeding up replacement speed 
        }, 1000 / fps)
    }
}

function drawLetter () { 
    page.totalNumberofPaints ++   // simple overall counter
    context.font = `${letterSize}px serif`
    for (let i = 0; i < cyclesPerFrame; ++i) { // letters to change per paint
        let positionToChange = (Math.floor(Math.random()*page.phraseToDraw.length)) //default random
        let letterToInsert = randomCharacterString(1) // external module call <arg> is length                
        if (page.totalNumberofPaints >= page.delayBeforeLockingLetters) {// lock letters
            charactersLockedIn ++   // signal to calling function counter to stop
            page.delayBeforeLockingLetters += Math.floor(Math.random()*page.delayBetweenLockingLetters + 1) // increment next time to lock
            let j = Math.floor(Math.random()*page.randomNoReplacementArray.length)
            positionToChange = page.randomNoReplacementArray[j]
            page.randomNoReplacementArray.splice(j,1)
            page.letterLockedIn[positionToChange] = true
        }
        if (page.letterLockedIn[positionToChange] == true)
            letterToInsert = page.phraseToDraw[positionToChange] // if locked simply swap in the letter!
        drawChosenLetter(positionToChange, letterToInsert)
    }   // cycles/paint 'for' loop
}  // drawLetter function

function drawChosenLetter (positionToChange, letterToInsert) {

        let stringPlacementX = page.startingArraySpotX+((positionToChange)*page.boxSize) // set box position
        let stringPlacementY = innerHeight/page.verticalPlacement

        context.fillStyle = page.darkColor  // background box color
        context.fillRect(stringPlacementX, stringPlacementY, page.boxSize, page.boxSize) // erases previous letter

        let xPosition = getCenterXPosition(letterToInsert, stringPlacementX) // position letter in square
        let yPosition = stringPlacementY + (.77*page.boxSize) // hacky center letter vertically

        context.fillStyle = page.medColor
        context.fillText (letterToInsert, xPosition, yPosition) // draw the damn thing
}

function getCenterXPosition (randomCharacter, stringPlacementX) {  // returns x position to draw letter in box
            let metrics = context.measureText(randomCharacter);  
            let textWidth = metrics.width
            let centerOfBox = stringPlacementX + (.5*page.boxSize)
            let xPosition = centerOfBox - (.5*textWidth)
            return (xPosition)
}

}   // end drawScreen wrapper
}   // end onload wrapper

// randomNoReplacementArray