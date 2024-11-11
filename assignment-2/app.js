/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

import {
    arrayPartition,
    arrayShift,
    matrixOne
} from './arrayUtils.js';

import {swapChars,
    longestCommonSubstring,
    palindromeOrIsogram
} from './stringUtils.js';

import {
    objectStats,
    mergeAndSumValues,
    nestedObjectsDiff
} from './objectUtils.js'

//arrayPartition
try {
    // Should Pass
    const arrayToPartition1 = [1, 2, 3, 4, 5]; 
    const partitionFunc1 = (num) => num % 2 === 0; 
    const partitionedArrays1 = arrayPartition(arrayToPartition1, partitionFunc1); // Expected Result: [[2, 4], [1, 3, 5]]
    console.log(partitionedArrays1);
    console.log('arrayPartition passed successfully')
 } catch (e) {
    console.error('arrayPartition failed test case');
 }

 try {
    // Should Pass
    const arrayToPartition2 = [10]; 
    const partitionFunc2 = (num) => num > 18; 
    const partitionedArrays2 = arrayPartition(arrayToPartition2, partitionFunc2); // Expected Result: error
    console.log(partitionedArrays2);
    console.log('arrayPartition did not error')
 } catch (e) {
    console.error('arrayPartition failed successfully');
 }



//for arrayShift
try {
    // Should Pass
    console.log(arrayShift([3,4,5,6,7], -3));
    console.log('arrayShift passed successfully');
 } catch (e) {
    console.error('arrayShift failed test case');
 }
 try {
    // Should Fail
    arrayShift([7,11,15], 3.5)
    console.error('arrayShift did not error');
 } catch (e) {
    console.log('arrayShift failed successfully');
 }


// for matrixOne

try {
    // Should Pass
    console.log(matrixOne([[2,2,2],[2,0,2],[2,2,2]]));
    console.log('matrixOne passed successfully');
 } catch (e) {
    console.error('matrixOne failed test case');
 }
 try {
    // Should Fail
    matrixOne([[0,1,2,0],[3,5,4]])
    console.error('matrixOne did not error');
 } catch (e) {
    console.log('matrixOne failed successfully');
 }



//for swapChars

try {
    // Should Pass
    console.log(swapChars("hello", "world"));
    console.log('swapChars passed successfully');
 } catch (e) {
    console.error('swapChars failed test case');
 }
 try {
    // Should Fail
    swapChars ("h", "Hello")
    console.error('swapChars did not error');
 } catch (e) {
    console.log('swapChars failed successfully');
 }

//for longestCommonSubstring
try {
    // Should Pass
    const str1 = "abcdxyz"; 
    const str2 = "xyzabcd"; 
    const commonSubstring = longestCommonSubstring(str1, str2); // Expected Result: "abcd"
    console.log(commonSubstring)
    console.log('longestCommonSubstring passed successfully');
 } catch (e) {
    console.error('longestCommonSubstring failed test case');
 }
 try {
    // Should Fail
    const str1 = "abcxyz"; 
    const str2 = "xyzc"; 
    const commonSubstring = longestCommonSubstring(str1, str2); // Expected Result: error
    console.log(commonSubstring)
    console.error('longestCommonSubstring did not error');
 } catch (e) {
    console.log('longestCommonSubstring failed successfully');
 }


//for palindromeOrIsogram

try {
    // Should Pass
    const checkStrings = (["Madam", "Lumberjack", "He did, eh?", "Background", "Taco cat? Taco cat.", "Invalid String"]); 
    const results = palindromeOrIsogram(checkStrings); 
    console.log(results);

    //returns and then logs:
    //{ "Madam": "Palindrome", "Lumberjack": "Isogram", "He did, eh?": "Palindrome", "Background": "Isogram", "Taco cat? Taco cat.": "Palindrome", "Invalid String": "Neither" }
    console.log('palindromeOrIsogram passed successfully');
 } catch (e) {
    console.error('palindromeOrIsogram failed test case');
 }
 try {
    // Should Fail
    const strings2 = ["hello", "world", "Java", 2]; 
    const results2 = palindromeOrIsogram(strings2); 
    console.log(results2);
    //error
    console.error('palindromeOrIsogram did not error');
 } catch (e) {
    console.log('palindromeOrIsogram failed successfully');
 }


//for objectStats

try {
    // Should Pass
    const arrayOfObjects1 = [ { a: 12, b: 8, c: 15, d: 12, e: 10, f: 15 }, { x: 5, y: 10, z: 15 }, { p: -2, q: 0, r: 5, s: 3.5 }, ]; 
    const statsResult1 = objectStats(arrayOfObjects1); 
    console.log(statsResult1);
    console.log('objectStats passed successfully');
 } catch (e) {
    console.error('objectStats failed test case');
 }
 try {
    // Should Fail
    const arrayOfObjects2 = [ { p: 10, q: 15, r: 20 }, { }, { a: 5, b: 5, c: 5 }, ]; 
    const statsResult2 = objectStats(arrayOfObjects2); 
    console.log(statsResult2);
    // Expected Result:error
    console.error('objectStats did not error');
 } catch (e) {
    console.log('objectStats failed successfully');
 }


 
 //for nestedObjectsDiff

try {
    // Should Pass
    const obj1 = { key1: "value1", key2: { nestedKey: "nestedValue", arrayKey: [1, 2, 3], }, }; 
    const obj2 = { key1: "value1", key2: { nestedKey: "differentValue", arrayKey: [1, 2, 4], }, key3: "newKey", }; 
    const differences = nestedObjectsDiff(obj1, obj2); 
    console.log(differences);
// Example Output:   { key2: { nestedKey: "differentValue", arrayKey: [1, 2, 4], }, key3: "newKey" }
    console.log('nestedObjectsDiff passed successfully');
 } catch (e) {
    console.error('nestedObjectsDiff failed test case');
 }
 try {
    // Should Fail
    const obj3 = { x: { y: { z: 1 } } }; 
    const obj4 = { }; 
    const differences2 = nestedObjectsDiff(obj3, obj4); // Expected Result: error
    console.log(differences2);
    console.error('nestedObjectsDiff did not error');
 } catch (e) {
    console.log('nestedObjectsDiff failed successfully');
 }

//for mergeAndSumValues

try {
    // Should Pass
    const object1 = { a: 3, b: 7, c: "5" };
    const object2 = { b: 2, c: "8", d: "4" };
    const object3 = { a: 5, c: 3, e: 6 };
    const resultMergedAndSummed = mergeAndSumValues(object1, object2, object3);
    console.log(resultMergedAndSummed);
// Expected Result: { a: 8, b: 9, c: 16, d: 4, e: 6 }
    console.log('mergeAndSumValues passed successfully');
 } catch (e) {
    console.error('mergeAndSumValues failed test case');
 }
 try {
    // Should Fail
    const obj10 = { a: 1, b: "2", c: 3 }; 
    const obj11 = { b: 3, c: 4, d: 5 }; 
    const obj12 = { a: 2, c: "hello", e: 6 }; 
    const result4 = mergeAndSumValues(obj10, obj11, obj12); // Throws an error
    console.log(result4)
    console.error('mergeAndSumValues did not error');
 } catch (e) {
    console.log('mergeAndSumValues failed successfully');
 }
