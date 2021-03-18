export function getCenterXPosition (letterToInsert, stringPlacementX, boxSize, textWidth) {  // returns x position to draw letter in box
    let centerOfBox = stringPlacementX + (.5*boxSize)
    let xPosition = centerOfBox - (.5*textWidth)
    return (xPosition)
}  