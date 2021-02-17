const cl = console.log

import { fontList } from './modules/fontList.js';

const global = {
    name : 'Jack Wilcox',
    nameLetters : []
}

for (let i= 0; i < global.name.length; i++) 
    global.nameLetters[i] = {'letter': global.name[i]}

cl(global.nameLetters[0].letter)