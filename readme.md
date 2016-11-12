#  For replicating changes in english dictionary to other translations

Assumes that dicttool and tvserver share the same parent directory

There are two tasks available:

##  add 

This adds the new entries into all the language dicts

To execute run one of the following:
*  npm run add
*  npm start
*  node index.js add

## diff

This finds the difference between the english and other dict.

It prints the results to the console.

To execute run one of the following:

*  npm run diff
*  node index.js diff


If you just want to test before executing you can add test flag at end of command.

Eg: node index.js add test

This will write to the test/ directory and you can examine the files

and node index.js diff test 

Will compare the files written in test/ with the english translations
