import {addTwoNumbers, divideTwoNumbers, multiplyTwoNumbers, subtractTwoNumbers} from "./calculator.js";

try {
    console.log(addTwoNumbers(5, 4));
    console.log(divideTwoNumbers(5, 4));
    console.log(multiplyTwoNumbers(5, 4));
    console.log(subtractTwoNumbers(5, 4));
    console.log(divideTwoNumbers('sss', 4));
}catch(e){
    console.log(e);
}