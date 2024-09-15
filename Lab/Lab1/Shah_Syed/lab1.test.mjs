import * as lab1 from './lab1.mjs';

//TODO: Write and call each function in lab1.js 5 times each, passing in different input

// Question 1
console.log('Question 1');
console.log(lab1.questionOne([17, 13, 1, 1, 2, 5]));
console.log(lab1.questionOne([5, 4, 6]));
console.log(lab1.questionOne([5, 3, 6, 61, 97]));
console.log(lab1.questionOne([17, 4, 1, 1, 2, 2]));
console.log(lab1.questionOne([17, 1, 1, 1, 2, 4]));


// Question 2
console.log('Question 2');
console.log(lab1.questionTwo(3, 5)) //returns {2: 10}
console.log(lab1.questionTwo(11, 4)) // returns {89: 356}
console.log(lab1.questionTwo(0, 5)) // returns {0: 0}
console.log(lab1.questionTwo(2, 5))
console.log(lab1.questionTwo(1, 5))

// Question 3
console.log('Question 3');
console.log(lab1.questionThree('Hello, my name is Professor Hill')) //would return 6.
console.log(lab1.questionThree('I !!,123am hap2py to be. here t0oday')) //after stripping out non-letters, you have "I am happy to be here today" and would return 7 .
console.log(lab1.questionThree('The quick,,, brown fox jumps over the lazy dog!')) //would return 9.
console.log(lab1.questionThree('Hello how are you'))
console.log(lab1.questionThree('What is your name'))

// Question 4
console.log('Question 4');
console.log(lab1.questionFour([2,3,5]));  //returns 53
console.log(lab1.questionFour([14,5,7]));  //returns 1071
console.log(lab1.questionFour([1,6,2,4,9]));  //returns 204
console.log(lab1.questionFour([1,6,4,4,9]));
console.log(lab1.questionFour([2,6,1,4,9]));
