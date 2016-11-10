'use strict';

const _ = require('lodash');
const fs = require('fs');

let addNewEntries = function (source, dest) {
  _.forEach(source, (value, key) => {
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
        dest[key] = _.clone(value);
      }
    }
  });
};

// Processing translation files

const directory = './locales/';
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
source = JSON.parse(source);


_.forEach(filesToProcess, (name, index) => {
  console.log(`processing ${name}`);
  
  let file = directory + name;
  
  let outfile = fs.readFileSync(file, 'utf8');
  outfile = outfile.replace(/^\uFEFF/, ''); // http://stackoverflow.com/questions/2223882/whats-different-between-utf-8-and-utf-8-without-bom
  outfile = JSON.parse(outfile);
  
  addNewEntries(source, outfile);
  
  let dest = directory + name;
  fs.writeFileSync(dest, JSON.stringify(outfile), 'utf8');
});


