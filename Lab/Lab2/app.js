/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
import * as arrayUtils from './arrayUtils.js';
import * as stringUtils from './stringUtils.js';
import * as objectUtils from './objectUtils.js';

// 1
try{
    const test1 = arrayUtils.arrayAnalysis([1, 2, 3, 3, 5, 6, 7, 8, 9, 10])
    console.log("arrayAnalysis passed test case");
}catch(e){
    console.error("arrayAnalysis failed test case");
}

try{
    const test1 = arrayUtils.arrayAnalysis()
    console.log("arrayAnalysis did not error");
}catch(e){
    console.error("arrayAnalysis failed successfully");
}




//2
try{
    const test2 = arrayUtils.mergeKeyValuePairs(["foo", 10], ["name", "Alice"], ["foo", "bar"], ["foo", 10], ["class", "CS-546"], ["name", "Bob"])
    console.log("mergeKeyValuePairs passed test case");
}catch(e){
    console.error("mergeKeyValuePairs failed test case");
}

try{
    const test2 = arrayUtils.mergeKeyValuePairs()
    console.log("mergeKeyValuePairs did not error");
}catch(e){
    console.error("mergeKeyValuePairs failed successfully");
}




//3
try{
    const test3 = arrayUtils.deepArrayEquality([2, 3, [5, {a: 1}], 8], [2, 3, [5, {a: 1}], 8])
    console.log("deepArrayEquality passed test case");
}catch(e){
    console.error("deepArrayEquality failed test case");
}

try{
    const test3 = arrayUtils.deepArrayEquality()
    console.log("deepArrayEquality did not error");
}catch(e){
    console.error("deepArrayEquality failed successfully");
}




//4
try{
    const test4 = stringUtils.replaceCharsAtIndexes("Daddy", [2]);
    console.log("replaceCharsAtIndexes passed test case");
}catch(e){
    console.error("replaceCharsAtIndexes failed test case");
}

try{
    const test4 = stringUtils.replaceCharsAtIndexes("string", [0, 6]);
    console.log("replaceCharsAtIndexes did not error");
}catch(e){
    console.error("replaceCharsAtIndexes failed successfully");
}




//5
try{
    const test5 = stringUtils.anagrams('Listen to the silent night', 'listen');
    console.log("anagrams passed test case");
}catch(e){
    console.error("anagrams failed test case");
}

try{
    const test5 = stringUtils.anagrams(" ", "cat");
    console.log("anagrams did not error");
}catch(e){
    console.error("anagrams failed successfully");
}






//6
try{
    const test6 = stringUtils.charSwap("hello", "world");
    console.log("charSwap passed test case");
}catch(e){
    console.error("charSwap failed test case");
}

try{
    const test6 = stringUtils.charSwap('h', 'world');
    console.log("charSwap did not error");
}catch(e){
    console.error("charSwap failed successfully");
}





//7
try{
    const test7 = objectUtils.processObjects([{ x: 2, y: 3 }, { a: 70, x: 4, z: 5 }], x => x + 1);
    console.log("processObjects passed test case");
}catch(e){
    console.error("processObjects failed test case");
}

try{
    const test7 = objectUtils.processObjects([{ x: 2, y: 3 }, {}], x => x + 1);
    console.log("processObjects did not error");
}catch(e){
    console.error("processObjects failed successfully");
}





//8
try{
    const test8 = objectUtils.similarKeysValues( { a: 1, b: 2, c: "3" }, { a: "1", b: "2", c: 3, d: 4 });
    console.log("similarKeysValues passed test case");
}catch(e){
    console.error("similarKeysValues failed test case");
}


try{
    const test8 = objectUtils.similarKeysValues( [1,2,3], [1,2,3]);
    console.log("similarKeysValues did not error");
}catch(e){
    console.error("similarKeysValues failed successfully");
}



//9
try{
    const test9 = objectUtils.flipKeysForStringsAndNumbers({ a: 3, b: 7, c: "hello" });
    console.log("flipKeysForStringsAndNumbers passed test case");
}catch(e){
    console.error("flipKeysForStringsAndNumbers failed test case");
}


try{
    const test9 = objectUtils.flipKeysForStringsAndNumbers();
    console.log("flipKeysForStringsAndNumbers did not error");
}catch(e){
    console.error("flipKeysForStringsAndNumbers failed successfully");
}






/*
// arrayUtils
console.log('1. arrayUtils');

// arrayAnalysis
console.log('a. arrayAnalysis(arr)');
console.log(arrayUtils.arrayAnalysis([1, 2, 3, 3, 5, 6, 7, 8, 9, 10]));


// mergeKeyValuePairs
console.log('b. mergeKeyValuePairs(arr)');
console.log(arrayUtils.mergeKeyValuePairs(["foo", 10], ["name", "Alice"], ["foo", "bar"], ["foo", 10], ["class", "CS-546"], ["name", "Bob"]));
console.log(arrayUtils.mergeKeyValuePairs(["key1", 100], ["key2", 200], ["key1", 100], ["key1", 300], ["key2", 200], ["key3", 400]));
console.log(arrayUtils.mergeKeyValuePairs(["a", "alpha"], ["b", 1], ["a", "beta"], ["b", 2], ["c", "gamma"], ["b", "2"]));
console.log(arrayUtils.mergeKeyValuePairs(["num1", 1], ["num2", 2], ["num1", 3], ["num1", 1], ["num2", 4], ["num3", 5]));
console.log(arrayUtils.mergeKeyValuePairs(["foo", 10], ["bar", "hello"], ["foo", "world"], ["baz", 30], ["foo", 5], ["bar", 15], ["baz", "20"]));


// deepArrayEquality
console.log('c. deepArrayEquality(arr1, arr2)');
const arr1 = [2, 3, [5, {a: 1}], 8];
const arr2 = [2, 3, [5, {a: 1}], 8];
const arr3 = [2, 3, [5, {a: 2}], 8];
const arr4 = [2, 3, {x: [10, 20], y: "test"}];
const arr5 = [2, 3, {x: [10, 20], y: "test"}];
const arr6 = [2, 3, [1, 2, [3, {a: 4}]]];
const arr7 = [2, 3, [1, 2, [3, {a: 4}]]];

console.log(arrayUtils.deepArrayEquality(arr1, arr2));
console.log(arrayUtils.deepArrayEquality(arr1, arr3));
console.log(arrayUtils.deepArrayEquality(arr4, arr5));
console.log(arrayUtils.deepArrayEquality(arr6, arr7));
console.log(arrayUtils.deepArrayEquality(arr6, [2, 3]));
console.log(arrayUtils.deepArrayEquality([1, 2], {a: 1}));
console.log(arrayUtils.deepArrayEquality());
console.log(arrayUtils.deepArrayEquality("test"));
console.log(arrayUtils.deepArrayEquality([1,2,"nope"]));



// stringUtils
console.log('2. stringUtils');

// replaceCharsAtIndexes
console.log('a. replaceCharsAtIndexes');
console.log(stringUtils.replaceCharsAtIndexes("Daddy", [2]));
console.log(stringUtils.replaceCharsAtIndexes("abcabc", [1, 4]));
console.log(stringUtils.replaceCharsAtIndexes("mississippi", [1, 4, 7]));
console.log(stringUtils.replaceCharsAtIndexes("foobar", [0]));
console.log(stringUtils.replaceCharsAtIndexes("", [1]));
console.log(stringUtils.replaceCharsAtIndexes(12345, [2]));
console.log(stringUtils.replaceCharsAtIndexes("string", [0, 6]));



// anagrams
console.log('b. anagrams');
console.log(stringUtils.anagrams('Listen to the silent night', 'listen'));
console.log(stringUtils.anagrams('The dog saw the god', 'god'));
console.log(stringUtils.anagrams('Hello World', 'test'));
console.log(stringUtils.anagrams());
console.log(stringUtils.anagrams(" ", "cat"));
console.log(stringUtils.anagrams(123, "abc"));
console.log(stringUtils.anagrams("hello there", ["target"]));


// charswap
console.log('c. charSwap');
console.log(stringUtils.charSwap("hello", "world"));
console.log(stringUtils.charSwap("hello", "worldwide"));
console.log(stringUtils.charSwap("abcde", "xyz"));
console.log(stringUtils.charSwap("hi", "bye"));
console.log(stringUtils.charSwap('h', 'world'));
console.log(stringUtils.charSwap('abcdef', 12345));
console.log(stringUtils.charSwap("     ", "hello"));
console.log(stringUtils.charSwap());



// objectUtils
console.log('3. objectUtils');

const first = { x: 2, y: 3 };
const second = { a: 70, x: 4, z: 5 };
const third = { x: 1, y: 9, q: 10 };
const fourth = {};
const fifth = {a: 1, b: 2, c: "4"}

console.log(objectUtils.processObjects([first, second], x => x + 1));
console.log(objectUtils.processObjects([first, second, third], x => x * 2));
console.log(objectUtils.processObjects(first, x => x + 1));
console.log(objectUtils.processObjects([first, second, 42], x => x + 1));
console.log(objectUtils.processObjects([first, fourth], x => x + 1));
console.log(objectUtils.processObjects([first, fifth], x => x + 1));


// similarKeysValues
const obj1 = { a: 1, b: 2, c: "3" };
const obj2 = { a: "1", b: "2", c: 3, d: 4 };
const obj3 = { a: { x: 1, y: 2 }, b: 3 };
const obj4 = { a: { x: "1", y: 2 }, b: "3" };
const obj5 = {};
const obj6 = { a: 2, b: 3 };
console.log(objectUtils.similarKeysValues(obj1, obj2));// returns { a: 1, b: 2, c: "3" }
console.log(objectUtils.similarKeysValues(obj3, obj4));// returns { a: { x: 1, y: 2 }, b: 3 }
console.log(objectUtils.similarKeysValues(obj5, obj6));
console.log(objectUtils.similarKeysValues({}, {}));
console.log(objectUtils.similarKeysValues([1,2,3], [1,2,3]));



// flipkeysforstringsandnumbers
const example1 = { a: 3, b: 7, c: "hello" };
const example2 = { a: 3, b: [1, 2], c: { x: 1 } };
const example3 = { a: "test", b: ["apple", "banana"], d: { y: 5, z: "ok" } };

console.log(objectUtils.flipKeysForStringsAndNumbers(example1));// returns { a: 1, b: 2, c: "3" }
console.log(objectUtils.flipKeysForStringsAndNumbers(example2));// returns { a: 1, b: 2, c: "3" }
*/