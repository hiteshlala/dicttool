#  For replicating changes in english dictionary to other translations

Assumes that dicttool and tvserver share the same parent directory.

The available tasks are:

##  add 

This adds the new entries into all the language dicts.

To execute run one of the following:

*  npm run add
*  node usetool.js add

##  add-test 

This adds the new entries into all the language dicts, then saves the new dicts in ./test folder.

To execute run one of the following:

*  npm run addtest
*  node usetool.js add-test

## diff

This finds the difference between the english and other dict.

It prints the results to the console.

To execute run one of the following:

*  npm run diff
*  node usetool.js diff

## diff-test

This finds the difference between the english and other dicts stored in the ./test folder.

It prints the results to the console.

To execute run one of the following:

*  npm run difftest
*  node usetool.js diff-test

## del

This deletes all keys found in the mapping file from all the language dicts except the english.

The mapping file is keysToDelete.json and the mapping has to be equivalent to that in our dicts.

To execute run one of the following:

*  npm run del
*  node usetool.js del

## del-test

This deletes all keys found in the mapping file from all the language dicts except the english that are stored in ./test folder.

The mapping file is keysToDelete.json and the mapping has to be equivalent to that in our dicts.

To execute run one of the following:

*  npm run deltest
*  node usetool.js del-test
