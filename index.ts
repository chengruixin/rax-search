import * as fuzzyMatcher from './src/fuzzyMatch/fuzzyMatcher';
import * as exactMatcher from './src/exactMatch/patternFinder';
// import * as minHashLsh from './src/shingMinLos/minHashLsh'; // dont expose min hash lsh currently

// console.log(fuzzyMatcher);
// console.log(exactMatcher);
// // console.log(minHashLsh);

module.exports = {
    fuzzyMatcher,
    exactMatcher
}