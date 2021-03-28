import fuzzyTest from './src/testing/fuzzymatcher.test';
import shingTest from './src/testing/shingminlos.test';
import commonTest from './src/testing/common.test';
import distanceTest from './src/testing/distance.test';
import exactTest from './src/testing/exactMatch.test';

console.time("fd");
fuzzyTest();
shingTest();
commonTest();
distanceTest();
exactTest();
console.timeEnd("fd");