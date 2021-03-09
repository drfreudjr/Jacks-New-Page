
const cl = console.log;
// import { fontList } from './modules/fontList.js';
// import { dynamicFontSize } from './modules/dynamicFontSize.js';
import { randomCharacterString } from './modules/randomCharacterString.js' // arg = length

window.onload = function () {           // onload wrapper

let page = {   // page global object
    phraseToDraw : 'Jack Wilcox Productions',
    baseFont: 'Courier',
    widthPercentage:   .7, // what percentage of screen width to fill
    verticalPlacementPercentage: .4, 
    boxSize: 50,        // size of container for letters
    letterToBoxRatio : 1.3,  // how big is the letter relative to box
    lightColor : '#ffffff',
    medColor: '#dddddd',
    darkColor : '#000000',
    initialFps : 1,
    initialFpsIncrementor : 0,
    incrementorIncrementor : 1.3 , // this controls the acceleration
    initialCyclesPerFrame : 1,  // how many letters to draw per paint
    maximumDelayBetweenLetterLocks : 5,
    cyclesBeforeOverdrive : 500, // when to increase letters/paint
    totalNumberofPaints : 0,  // keep track of total refreshes as a timer of sorts
    numberPaintsBeforeNextLock : 110, // how long before starting to seed te word letters
    letterLockedIn: [], // array with truth table for whether letter is locked in
    randomNoReplacementArray: [],  // array used to generate random but non repetitive phraseToDraw
}
                                        
var canvas;    // Global 2D context reference                            
var context;   // Global canvas object reference

    addEventListener("resize", sizeCanvas); 
    sizeCanvas()                            // create initial canvas
    function sizeCanvas () {                // Create or resize 
        if (canvas === undefined) {         
            canvas = createCanvas();        
        }

        function createCanvas () {   
            const canvas = document.createElement("canvas"); 
            canvas.style.position = "absolute"; 
            canvas.style.left     = "0px";      
            canvas.style.top      = "0px";

            document.body.appendChild(canvas);  // Add to document
            context = canvas.getContext("2d");  
            return canvas;
        }

        canvas.width  = window.innerWidth; 
        canvas.height = window.innerHeight; 
        main()     
    }

function main() {  // wrapper that gets called on resize event

const boxSize = page.widthPercentage*innerWidth/page.phraseToDraw.length
const letterSize = page.letterToBoxRatio*boxSize // calculated initial values
const charcatersToLockIn = page.phraseToDraw.length
let charactersLockedIn = 0
let fps = page.initialFps                          
let fpsIncrementor = page.initialFpsIncrementor
let cyclesPerFrame = page.initialCyclesPerFrame
let startingArraySpotX = (1-page.widthPercentage)*innerWidth/2*1.4
context.font = `${letterSize}px ${page.baseFont}`

for (let i = 0; i < page.phraseToDraw.length; ++i) {
    page.letterLockedIn[i] = false // seed letter matching table
    page.randomNoReplacementArray[i] = i
}

lettersAnimation()
function lettersAnimation () {
    if (charactersLockedIn < charcatersToLockIn) {
        if (fps > page.cyclesBeforeOverdrive) { 
            ++ cyclesPerFrame // draw multiple cycles per render
            fps *=.5    // lower the fps to avoid too sudden increase
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
    for (let i = 0; i < cyclesPerFrame; ++i) { // letters to change per paint
        let positionToChange = (Math.floor(Math.random()*page.phraseToDraw.length)) //default random
        let letterToInsert = randomCharacterString(1) // external module call <arg> is length                
        if (page.totalNumberofPaints >= page.numberPaintsBeforeNextLock) {// time to a lock letter!
            page.numberPaintsBeforeNextLock += Math.floor(Math.random()*page.maximumDelayBetweenLetterLocks + 1) // increment next time to lock
            charactersLockedIn ++  
            let j = Math.floor(Math.random()*page.randomNoReplacementArray.length)
            positionToChange = page.randomNoReplacementArray[j]
            page.randomNoReplacementArray.splice(j,1)   // remove the chosen array member
            page.letterLockedIn[positionToChange] = true // indicate locked in
        }
        if (page.letterLockedIn[positionToChange] == true)
            letterToInsert = page.phraseToDraw[positionToChange] // swap in locked letter
        drawChosenLetter(positionToChange, letterToInsert)
    }   
} 

function drawChosenLetter (positionToChange, letterToInsert) {

        let stringPlacementX = startingArraySpotX+((positionToChange-1)*boxSize) // set box position
        let stringPlacementY = innerHeight*page.verticalPlacementPercentage

        context.fillStyle = page.darkColor  // background box color
            // Y vertical made bigger to erase partular letters that exceed box size
        context.fillRect(stringPlacementX, stringPlacementY*.5, boxSize, boxSize*10) // erases previous letter
                                                                    

        let xPosition = getCenterXPosition(letterToInsert, stringPlacementX, boxSize) // position letter in square
        let yPosition = stringPlacementY + (.77*boxSize) // hacky center letter vertically

        context.fillStyle = page.medColor
        context.fillText (letterToInsert, xPosition, yPosition) // draw the damn thing
}

function getCenterXPosition (randomCharacter, stringPlacementX, boxSize) {  // returns x position to draw letter in box
            let textWidth = context.measureText(randomCharacter).width
            let centerOfBox = stringPlacementX + (.5*boxSize)
            let xPosition = centerOfBox - (.5*textWidth)
            return (xPosition)
}

}   // end drawScreen wrapper
}   // end onload wrapper