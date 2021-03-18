export let flickerAnim = {   // flickerAnim global object
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