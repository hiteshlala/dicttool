'use strict';

const fs = require('fs');

const processtorun = process.argv[2]; // can be: "diff" or "add"

const test = process.argv[3]; // can be: "test" or anything that is not falsey  writes to test directory (has to exist)

// adds any keys in source not in dest to dest
let addNewEntries = function (source, dest) {
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
      if (dest[key]) {
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
let compareEntries = (sourceobject, destobject, space) => {
  let keysource = Object.keys(sourceobject);
  let keydest = Object.keys(destobject);
  space = space || ''
  
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

    console.log('source: ' + space , keysource.length);//, JSON.stringify(keysource));
    console.log('dest:' + space , keydest.length);//, JSON.stringify(keydest));
    console.log('extra keys:', JSON.stringify(longer), '\n' );
  } 

  for(let key in sourceobject) {
    let  value = sourceobject[key]
    if (typeof value === 'string' || typeof value === 'number') {
      // do nothing
    }
    else {
      compareEntries(sourceobject[key], destobject[key], space + key + '--');
    }
  }
};


// Processing translation files
const directory = '../tvserver/locales/';
const filesToProcess = [ 
  'translation-de.json',
  'translation-es.json',
  'translation-fr.json',
  'translation-hu.json',
  'translation-it.json',
  'translation-ja.json',
  'translation-nl.json',
  'translation-nn.json',
  'translation-pl.json',
  'translation-ru.json',
  'translation-zh.json' ];

let source =  fs.readFileSync(directory + 'translation-en.json', 'utf8');
source = source.replace(/^\uFEFF/, '');
source = JSON.parse(source);

switch(processtorun) {
  case 'add':
    filesToProcess.forEach((name, index) => {
      console.log(`processing ${name}`);
      
      let file = directory + name;
      
      let outfile = fs.readFileSync(file, 'utf8');
      outfile = outfile.replace(/^\uFEFF/, ''); // http://stackoverflow.com/questions/2223882/whats-different-between-utf-8-and-utf-8-without-bom
      outfile = JSON.parse(outfile);
      
      addNewEntries(source, outfile);
      
      let dest = test ? './test/' + name : directory + name;
      fs.writeFileSync(dest, JSON.stringify(outfile, null, 2), 'utf8');
    });
    break;

  case 'diff':
    filesToProcess.forEach((name, index) => {
      console.log(`checking ${name} `);
      console.log('----------------------\n')
      
      let file = test ? './test/' + name : directory + name;
      
      let outfile = fs.readFileSync(file, 'utf8');
      outfile = outfile.replace(/^\uFEFF/, ''); // http://stackoverflow.com/questions/2223882/whats-different-between-utf-8-and-utf-8-without-bom
      outfile = JSON.parse(outfile);
      
      compareEntries(source, outfile);
      console.log('\n');
    });
  break;
}