const cl = console.log;
// import { fontList } from './modules/fontList.js';
// import { dynamicFontSize } from './modules/dynamicFontSize.js';
import { flickerAnim} from './modules/flickerAnim.js' // object with flicker parameters
import { randomCharacterString } from './modules/randomCharacterString.js' // arg = length
import { getCenterXPosition} from './modules/getCenterXPosition.js' // gets hoizontal position for each letter

window.onload = function () {           // onload wrapper
                                        
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

const boxSize = flickerAnim.widthPercentage*innerWidth/flickerAnim.phraseToDraw.length  // dynamic resize parameters
const letterSize = flickerAnim.letterToBoxRatio*boxSize // calculated initial values
const charactersToLockIn = flickerAnim.phraseToDraw.length
let charactersLockedIn = 0
let fps = flickerAnim.initialFps                          
let fpsIncrementor = flickerAnim.initialFpsIncrementor
let cyclesPerFrame = flickerAnim.initialCyclesPerFrame
let startingArraySpotX = (1-flickerAnim.widthPercentage)*innerWidth/2*1.4
context.font = `${letterSize}px ${flickerAnim.baseFont}`

for (let i = 0; i < flickerAnim.phraseToDraw.length; ++i) {
    flickerAnim.letterLockedIn[i] = false // seed letter matching table
    flickerAnim.randomNoReplacementArray[i] = i
}

function drawChosenLetter (positionToChange, letterToInsert) {
    let boxPlacementX = startingArraySpotX+((positionToChange-1)*boxSize) // set box position
    let boxPlacementY = innerHeight*flickerAnim.verticalPlacementPercentage

    context.fillStyle = flickerAnim.darkColor  // background box color
    // Y vertical made bigger to erase partular letters that exceed box size
    context.fillRect(boxPlacementX, boxPlacementY*.5, boxSize, boxSize*10) // erases previous letter
                                                                    
    let textWidth = context.measureText(letterToInsert).width
    let xPosition = getCenterXPosition(letterToInsert, boxPlacementX, boxSize, textWidth) // position letter in square
    let yPosition = boxPlacementY + (.77*boxSize) // hacky center letter vertically

    context.fillStyle = flickerAnim.medColor
    context.fillText (letterToInsert, xPosition, yPosition) // draw the damn thing
}

function lettersAnimation () {
    function drawLetter () { 


       flickerAnim.totalNumberofPaints ++   // simple overall counter
       for (let i = 0; i < cyclesPerFrame; ++i) { // letters to change per paint
            let positionToChange = (Math.floor(Math.random()*flickerAnim.phraseToDraw.length)) //default random
            let letterToInsert = randomCharacterString(1) // external module call <arg> is length                
            if (flickerAnim.totalNumberofPaints >= flickerAnim.numberPaintsBeforeNextLock) {// time to a lock letter!
                flickerAnim.numberPaintsBeforeNextLock += Math.floor(Math.random()*flickerAnim.maximumDelayBetweenLetterLocks + 1) // increment next time to lock
                charactersLockedIn ++  
               let j = Math.floor(Math.random()*flickerAnim.randomNoReplacementArray.length)
                  positionToChange = flickerAnim.randomNoReplacementArray[j]
                flickerAnim.randomNoReplacementArray.splice(j,1)   // remove the chosen array member
                  flickerAnim.letterLockedIn[positionToChange] = true // indicate locked in
        }
          if (flickerAnim.letterLockedIn[positionToChange] == true)
               letterToInsert = flickerAnim.phraseToDraw[positionToChange] // swap in locked letter
           drawChosenLetter(positionToChange, letterToInsert)
        }   
} 


    if (charactersLockedIn < charactersToLockIn) {
        if (fps > flickerAnim.cyclesBeforeOverdrive) { 
            ++ cyclesPerFrame // draw multiple cycles per render
            fps *=.5    // lower the fps to avoid too sudden increase
        }
        setTimeout(function() {
           drawLetter()
            // if 
            requestAnimationFrame(lettersAnimation)
            fpsIncrementor +=flickerAnim.incrementorIncrementor   // increase the increaser each time thru to get acceleration
            fps += fpsIncrementor   // basic speeding up replacement speed 
        }, 1000 / fps)
    }
}

lettersAnimation()
cl('here')
// flickerAnim.phraseToDraw = "Presents"
// lettersAnimation()

}   // end drawScreen wrapper
}   // end onload wrapper