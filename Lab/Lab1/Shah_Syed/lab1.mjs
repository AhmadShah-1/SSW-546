export const questionOne = (arr) => {
    let composite = 0;
    let prime = 0;
    let equal = false;

    for(let i of arr){
        let isprime = true;

        if(i < 2){
            composite += i;
            continue;
        }

        for(let x = 2; x < i-1; x++){
            if(i % x === 0){
                composite += i;
                isprime = false;
                break;
            }
        }

        if(isprime) {
            prime += i;
        }
    }

    if((composite + prime) % 2 == 0){
        equal = true;
    }

  return [prime, composite, equal]; //return result
};


export const questionTwo = (index, multiplier) => {
    let num1 = 0;
    let num2 = 1;
    let next = 0;

    if(index == 1 || index == 0){
        return {[index]: index * multiplier};
    }

    for(let count = 2; count <= index; count++){
        next = num1 + num2;
        num1 = num2;
        num2 = next;
    }

  return {[num2]: num2 * multiplier};
};

export const questionThree = (str) => {
    let modifiedstring = '';

    for(let letter in str){
        if(str[letter] >= 'a' && str[letter] <= 'z' || str[letter] >= 'A' && str[letter] <= 'Z' || str[letter] == ' '){
            modifiedstring += str[letter];
        }
    }

    let newstring = modifiedstring.split(" ")

  return newstring.length; //return result
};

export const questionFour = (arr) => {
    let newarr = []
    let mean = 0

    for(let x in arr){
        newarr.push(arr[x]*arr[x]*arr[x]);
    }

    for(let x in newarr){
        mean += newarr[x];
    }


  return Math.round(mean/newarr.length); //return result
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING OR NOT CHANGED.
export const studentInfo = {
  firstName: 'Syed',
  lastName: 'Shah',
  studentId: '20006460'
};
