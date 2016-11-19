'use strict';

// adds any keys in source not in dest to dest
// modifies dest
let addNewEntries = (source, dest) => {
  for(let key in source) {
    let  value = source[key]
    if (typeof value === 'string' || typeof value === 'number') {
      // check corresponding
      if (dest[key]) {
        // do nothing, destination already has entry
      }
      else {
        // entry does not exist, add it
        dest[key] = value;
      }
    }
    else {
      // call self with new sub object
      // check to see if dest even has the key
      if (dest[key] && typeof dest[key] !== 'string') {
        addNewEntries(source[key], dest[key]);
      }
      // key does not exist just add the whole object
      else {
        let temp = {};
        Object.assign(temp, value);
        dest[key] = temp;
      }
    }
  }  
};

// finds any keys in dest object that do not exist in source
//  and prints the result to console
let compareEntries = (sourceobject, destobject, mapping) => {
  let keysource = Object.keys(sourceobject);
  let keydest = Object.keys(destobject);
  mapping = mapping || ''
  
  if(keysource.length !== keydest.length) {
    let longer, shorter;
    if(keysource.length > keydest.length) {
      longer = keysource;
      shorter = keydest;
    } else {
      longer = keydest;
      shorter = keysource;
    }
    longer = longer.filter((value) => { 
      return shorter.indexOf(value) < 0 ? true: false; 
    });

    console.log(`Source: Num Keys: ${keysource.length} Mapping: ${mapping}`);
    console.log(`Dest:   Num Keys: ${keydest.length} Mapping: ${mapping}`);
    console.log(`Extra Keys: ${JSON.stringify(longer)} \n`);
  } 

  for(let key in sourceobject) {
    let  value = sourceobject[key]
    if (typeof value === 'string' || typeof value === 'number') {
      // do nothing
    }
    else {
      compareEntries(sourceobject[key], destobject[key], mapping + key + '--');
    }
  }
};

// removes the keys in present in objWithRemoveKeys from objToModify
let removekeys = (objToModify, objWithRemoveKeys) => {
    for (let key in objWithRemoveKeys) {
        if( typeof objWithRemoveKeys[key] === 'string' || typeof objWithRemoveKeys[key] === 'number' ){
            delete objToModify[key];
        }
        else {
            removekeys( objToModify[key], objWithRemoveKeys[key]);
        }
    }
};

module.exports = {
    add: addNewEntries,
    diff: compareEntries,
    del: removekeys
};