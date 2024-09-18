const checkIsProperNumber = (val, variableName)=>{
    if(typeof val != 'number') throw `${variableName || "provided variable"} is not a number`;
};


export const addTwoNumbers = (num1, num2) =>{
    checkIsProperNumber(num1);
    checkIsProperNumber(num2);
    return num1 + num2;
};

export const subtractTwoNumbers = (num1, num2) =>{
    checkIsProperNumber(num1);
    checkIsProperNumber(num2);
    return num1 - num2;
};

export const multiplyTwoNumbers = (num1, num2) =>{
    checkIsProperNumber(num1);
    checkIsProperNumber(num2);
    return num1 * num2;
};

export const divideTwoNumbers = (num1, num2) =>{
    checkIsProperNumber(num1);
    checkIsProperNumber(num2);
    if(num2 === 0) throw "Error: division by zero";
    return num1 / num2;
};