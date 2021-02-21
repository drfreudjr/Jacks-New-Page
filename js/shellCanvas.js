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


const global = {
    name : 'Jack Wilcox',
    fontSize : 14,
    eachLetter : [{}], // create array of objects for each letter
}

printNameAnimation()

function printNameAnimation() {

        var element = document.getElementById("name")
        var newTextNode = document.createTextNode('')
        var nameEl = document.createElement('span')
        element.appendChild(nameEl)

    let initialDelay = 10
    function upDateAnimation () {

        let x = randomCharacterString(global.name.length)
        nameEl.innerText = x
        window.requestAnimationFrame(upDateAnimation)
        // setTimeout(printNameAnimation, 10)       
    }

    window.requestAnimationFrame(upDateAnimation)
}






}   // end drawScreen wrapper
}   // end onload wrapper