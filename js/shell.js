const cl = console.log

import { fontList } from './modules/fontList.js';

const global = {
    name : 'Jack Wilcox',
    nameLetters : []
}

for (let i of global.name) {
    cl(i)
}

cl(global.nameLetters)
