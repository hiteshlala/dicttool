'use strict';
const fs = require('fs');
const add = require('./tools.js').add;
const diff = require('./tools.js').diff;
const del = require('./tools.js').del;

const processtorun = process.argv[2]; // can be: "diff" ,"add", "del", "add-test", "diff-test", "del-test"
const argument = process.argv[3]; // can be any argument that the type of  process needs

const directory = '../tvserver/locales/';
const testdirectory = './test/'; // in test mode writes output files here

const keystodelete = 'keysToDelete.json'; // mapping of keys to delete in target files

let destdirectory = directory;

// translation files to process
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
  'translation-zh.json' 
];

// assumes that source is english translation even for testing will use this source
let source =  fs.readFileSync(directory + 'translation-en.json', 'utf8');
// reomove the BOM bits see http://stackoverflow.com/questions/2223882/whats-different-between-utf-8-and-utf-8-without-bom
source = source.replace(/^\uFEFF/, ''); 
source = JSON.parse(source);

switch(processtorun) {
  case 'add-test':
    destdirectory = argument || testdirectory;
  case 'add':
    filesToProcess.forEach((name, index) => {
      let file = directory + name;
      console.log(`processing ${file}`);
      
      let outfile = fs.readFileSync(file, 'utf8');
      outfile = outfile.replace(/^\uFEFF/, '');
      outfile = JSON.parse(outfile);
      
      add(source, outfile);
      
      let dest = destdirectory + name;
      console.log(`writing ${dest} \n`);
      fs.writeFileSync(dest, JSON.stringify(outfile, null, 2), 'utf8');
    });
    break;

  case 'diff-test':
    destdirectory = testdirectory;
  case 'diff':
    filesToProcess.forEach((name, index) => {
      let file = destdirectory + name;
      
      console.log(`checking ${file} `);
      console.log('-----------------------------------\n')
      
      let compareFile = fs.readFileSync(file, 'utf8');
      compareFile = compareFile.replace(/^\uFEFF/, '');
      compareFile = JSON.parse(compareFile);
      
      diff(source, compareFile);
      console.log('\n');
    });
    break;

  case 'del-test':
    destdirectory = testdirectory;
  case 'del':
    let delkeys = argument || keystodelete;
    let delkeyobj = fs.readFileSync(delkeys, 'utf8');
    delkeyobj = delkeyobj.replace(/^\uFEFF/, '');
    delkeyobj = JSON.parse(delkeyobj);
    console.log(`Delete key map read from ${delkeys}`);

    filesToProcess.forEach((name, index) => {
      let file = directory + name;
      console.log(`processing ${file}`);
      
      let outfile = fs.readFileSync(file, 'utf8');
      outfile = outfile.replace(/^\uFEFF/, '');
      outfile = JSON.parse(outfile);
      
      del(outfile, delkeyobj);
      
      let dest = destdirectory + name;
      console.log(`writing ${dest} \n`);
      fs.writeFileSync(dest, JSON.stringify(outfile, null, 2), 'utf8');
    });
    break;
}
