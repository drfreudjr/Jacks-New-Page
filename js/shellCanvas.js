const cl = console.log;
import { fontList } from './modules/fontList.js';
import { dynamicFontSize } from './modules/dynamicFontSize.js';
import { randomCharacterString } from './modules/randomCharacterString.js' // arg = length

let page = {   // page global object
    initialWord : 'Jack Wilcox',
    wordLockedIn: [], // stores whether letter from initial word rendered
    boxSize: 50,        // size of container for letters
    letterToBoxRatio : .9,  // how big is the letter relative to box
    startingArraySpotX : 0, // where to draw the whole thing
    startingArraySpotY :0,
    lightColor : '#ffffff',
    darkColor : '#000000',
    initialFps : 5,
    initialFpsIncrementor : 1,
    incrementorIncrementor : .2, // this controls the acceleration
    initialCyclesPerFrame : 1,  // how many letters to draw per paint
    cyclesBeforeOverdrive : 200, // when to increase letters/paint
    totalNumberofPaints : 0,  // keep track of total refreshes as a timer of sorts
    delayBeforeLockingLetters : 100, // how long before starting to seed te word letters
}

let letterSize = page.letterToBoxRatio*page.boxSize // set calculated lettersize
let fps = page.initialFps 
let fpsIncrementor = page.initialFpsIncrementor
let cyclesPerFrame = page.initialCyclesPerFrame
let charactersLockedIn = 0  // 

for (let i = 0; i < page.initialWord.length; ++i) // seed letter matching table
    page.wordLockedIn[i] = false

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
            let centerOfBox = stringPlacementX + (.5*page.boxSize)
            let xPosition = centerOfBox - (.5*textWidth)
            return (xPosition)
}

function drawScreen() {  // wrapper that gets called on resize event

animation()
function animation (){
    if (charactersLockedIn <page.initialWord.length) { // keep drawing until lst lockInLetter

        page.totalNumberofPaints ++   // simple overall counter

        if (fps > page.cyclesBeforeOverdrive) { 
            ++ cyclesPerFrame // twice the writing per paint so..
            fps *=.5    // half the fps (which will keep increasing)
        }

        setTimeout(function() {
           drawLetter()
            requestAnimationFrame(animation)
            fpsIncrementor +=page.incrementorIncrementor   // increase the increaser each time thru to get acceleration
            fps += fpsIncrementor   // basic speeding up replacement speed 
        }, 1000 / fps)
    }
}

function drawLetter () {  

    for (let i = 0; i < cyclesPerFrame; ++i) { // letters to change per paint
        let positionToChange = (Math.floor(Math.random()*page.initialWord.length))
        let randomCharacter = randomCharacterString(1) // external module call <arg> is length
        context.font = `${letterSize}px serif`

        let stringPlacementX = page.startingArraySpotX+((positionToChange)*page.boxSize) // move one box away for each position
        let stringPlacementY = page.startingArraySpotY*((positionToChange)*page.boxSize)

        context.fillStyle = (Math.floor(Math.random()*2) == 0) ? page.darkColor : page.lightColor // random bg

        if (page.totalNumberofPaints > page.delayBeforeLockingLetters) // bg dark
            context.fillStyle = page.darkColor

        if (page.wordLockedIn[positionToChange] == false)  // make sure letter isn't locked in
            context.fillRect(stringPlacementX, stringPlacementY, page.boxSize, page.boxSize)

        context.fillStyle = (context.fillStyle == page.lightColor) ?  page.darkColor : page.lightColor // opposite fg

        let xPosition = getCenterXPosition(randomCharacter, stringPlacementX)
        let yPosition = stringPlacementY + (.77*page.boxSize) // hacky center letter vertically

        if (page.totalNumberofPaints > page.delayBeforeLockingLetters) {    // start locking letters
            page.delayBeforeLockingLetters += Math.floor(Math.random()*15)    // kick the can to the next time
            context.fillStyle = page.darkColor
            charactersLockedIn ++
            let randomWordPosition = null //begin random lock in process
            let placeHolder = true
            while (placeHolder == true)  {  // make sure we get a false/not locked in one
                randomWordPosition = Math.floor(Math.random()*(page.initialWord.length))
                placeHolder = page.wordLockedIn[randomWordPosition]
            }    
            page.wordLockedIn[randomWordPosition] = true
            randomCharacter = page.initialWord[positionToChange]
            // cl(randomWordPosition)
        }
        if (page.wordLockedIn[positionToChange] == false)  // make sure letter isn't locked in
            context.fillText (randomCharacter, xPosition, yPosition) // draw the damn thing
    }   // cycles/paint 'for' loop
}  // drawLetter function


}   // end drawScreen wrapper
}   // end onload wrapper

        // if (global.wordMatchTable[positionToChange] == false) {// see if letter locked in 

// when 107 true, insert letter, then increase delay variable by random amount tehn it should triger again