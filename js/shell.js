const cl = console.log

import { fontList } from './modules/fontList.js';

const global = {
    name : 'Jack Wilcox',
    eachNameLetter : []
}

main()
function main() {
    makeObjectArrayForEachLetter ()
}

function makeObjectArrayForEachLetter () {
    for (let i= 0; i < global.name.length; i++) 
        global.eachNameLetter[i] = {'letter': global.name[i]}
}


cl(global.eachNameLetter[0].letter)