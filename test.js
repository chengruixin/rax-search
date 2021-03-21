import Test from './src/test.ts';

const tester = new Test();
tester.foo();
console.log(tester.id);

tester.bar();
console.log(tester.name);