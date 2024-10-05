/* Todo: Implement the functions below and then export them
      using the ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let replaceCharsAtIndexes = (str, idxArr) => {

    if(!str){
        throw new Error("Input is not provided");
    }
    if(str.length === 0){
        throw new Error("Input is empty");
    }
    if(typeof str !== 'string' || str.trim().length === 0){
        throw new Error("Input is empty or not string");
    }
    if(!idxArr){
        throw new Error("idx is not provided");
    }

    if(!Array.isArray(idxArr)) {
        throw new Error("idx is not an array");
    }

    for(let i = 0; i < idxArr.length; i++){
        if(typeof idxArr[i] !== 'number' || idxArr[i] <= 0 || idxArr[i] >= str.length - 1){
            throw new Error("idx contains invalid values");
        }
    }


    for(let i = 0; i < idxArr.length; i++){
        let letter_to_replace = str[idxArr[i]];
        let before = str[idxArr[i] - 1];
        let after = str[idxArr[i] + 1];

        // Even is before
        // Odd is after
        let count = 2;

        for(let j = idxArr[i] + 1; j < str.length; j++){
            if(str[j] === letter_to_replace){
                if(count % 2 === 0){
                    str = str.substring(0, j) + before + str.substring(j + 1);
                }else{
                    str = str.substring(0, j) + after + str.substring(j + 1);
                }
                count++;
            }
        }
    }

    return str;


};

let anagrams = (str, target) => {

    if(!str || !target){
        throw new Error("Input isn't provided");
    }
    if(str.toString().trim().length === 0 || target.length === 0){
        throw new Error("Input is empty");
    }
    if(typeof str !== 'string' || typeof target !== 'string'){
        throw new Error("Input isn't a string");
    }

    let split_str = str.split(' ');
    let list_of_anagrams = [];

    for(let word of split_str){
        let target_in_str = true;

        if(word.length !== target.length){
            continue;
        }
        for(let letter of target){
            if(!(word.toLowerCase().includes(letter.toLowerCase()))){
                target_in_str = false;
                break;
            }
        }
        if(target_in_str){
            list_of_anagrams.push(word);
        }
    }

    return list_of_anagrams;
};

let charSwap = (str1, str2) => {
    if(!str1 || !str2){
        throw new Error("Input is not provided");
    }
    if(str1.toString().trim().length < 2 || str2.toString().trim().length < 2){
        throw new Error("Input requires 2 or more characters");
    }
    if(typeof str1 !== 'string' || typeof str2 !== 'string'){
        throw new Error("Input is not a string");
    }


    let length1 = str1.length;
    let length2 = str2.length;

    let swaplength = 0;
    if (length1 >= length2) {
        swaplength = length2;
    } else {
        swaplength = length1;
    }

    swaplength = Math.floor(swaplength / 2);

    let m_st1 = str2.substring(str2.length - swaplength, str2.length) + str1.substring(swaplength, str1.length);
    let m_st2 = str2.substring(0, str2.length - swaplength) + str1.substring(0, swaplength);
    let modified = m_st1 + " " + m_st2;

    return modified;

}
export { replaceCharsAtIndexes, anagrams, charSwap };