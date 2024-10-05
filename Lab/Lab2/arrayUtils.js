/* Todo: Implement the functions below and then export them
      using the ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let arrayAnalysis = (arr) => {
    if(!arr){
        throw new Error("Input is not provided");
    }

    if(!Array.isArray(arr)){
        throw new Error("Input is not an array");
    }

    arr = arr.sort((a, b) => a - b);

    let objectinfo = {
        average: 0,
        middleValue: 0,
        frequentValues: [],
        span: 0,
        lowest: arr[0],
        highest: arr[0],
        totalCount: 0,
        totalSum: 0
    };

    let temp_freq_values = [];
    for(let i = 0; i < arr.length; i++){

        if(typeof arr[i] !== 'number'){
            throw new Error("Array contains non-number values");
        }

        if (!temp_freq_values.includes(arr[i])){
            temp_freq_values.push(arr[i]);
        }else if(!objectinfo.frequentValues.includes(arr[i])){
            objectinfo.frequentValues.push(arr[i]);
        }

        if(arr[i] < objectinfo.lowest){
            objectinfo.lowest = arr[i];
        }

        if(arr[i] > objectinfo.highest){
            objectinfo.highest = arr[i];
        }

        objectinfo.totalCount++;

        objectinfo.totalSum += arr[i];
    }

    objectinfo.span = objectinfo.highest - objectinfo.lowest;
    objectinfo.average = objectinfo.totalSum / objectinfo.totalCount;


    if(objectinfo.frequentValues.length === 1){
        objectinfo.frequentValues = objectinfo.frequentValues[0];
    }else if (objectinfo.frequentValues.length === 0){
        objectinfo.frequentValues = null;
    }

    if(arr.length % 2 === 0){
        let left = arr[arr.length / 2 - 1];
        let right = arr[arr.length / 2];
        objectinfo.middleValue = (left + right) / 2;
    }else{
        objectinfo.middleValue = arr[Math.floor(arr.length / 2)];
    }

    return objectinfo;

};

let mergeKeyValuePairs = (...arrays) => {
    if(!arrays){
        throw new Error("array not provided");
    }
    if(arrays.length <= 1){
        throw new Error("arrays missing");
    }

    for(let i = 0; i < arrays.length; i++){
        if(!Array.isArray(arrays[i])){
            throw new Error("Input is not an array");
        }

        if(arrays[i].length !== 2){
            throw new Error("Array does not contain 2 elements");
        }

        if(typeof arrays[i][0] !== 'string' && typeof arrays[i][0] !== 'number' || typeof arrays[i][1] !== 'string' && typeof arrays[i][1] !== 'number'){
            throw new Error("Array element is not a String/number");
        }


        if((arrays[i][0]).toString().trim() === "" || (arrays[i][1]).toString().trim() === "") {
            throw new Error("Array element is empty");
        }

    }


    let dict1 = {};
    for(let i = 0; i < arrays.length; i++){
        if(!(arrays[i][0] in dict1)){
            dict1[arrays[i][0]] = arrays[i][1].toString();
        }else{
            let temp = dict1[arrays[i][0]].toString();
            temp += ", " + arrays[i][1].toString();
            dict1[arrays[i][0]] = temp;

            let split_temp = temp.split(",");
            let modified_split = [];
            for(let j = 0; j <split_temp.length; j++){
                modified_split.push(split_temp[j].trim());
            }

            let store_numbers = [];
            let store_words = [];
            for(let k = 0; k < modified_split.length; k++){
                if(!isNaN(modified_split[k])){
                    if(!store_numbers.includes(modified_split[k])) {
                        store_numbers.push(modified_split[k]);
                    }
                }else{
                    if(!store_words.includes(modified_split[k])) {
                        store_words.push(modified_split[k]);
                    }
                }
            }

            store_numbers.sort((a, b) => a - b);
            store_words.sort();

            let numbers_in_string = "";
            for(let m = 0; m < store_numbers.length; m++){
                if(m === store_numbers.length - 1) {
                    numbers_in_string += store_numbers[m];
                    continue;
                }
                numbers_in_string += store_numbers[m] + ", ";
            }

            let words_in_string = ", ";
            if(store_words.length === 0) {
                let words_in_string = "";
            }

            for(let m = 0; m < store_words.length; m++){
                if(m === store_words.length - 1) {
                    words_in_string += store_words[m];
                    continue;
                }
                words_in_string += store_words[m] + ", ";
            }

            dict1[arrays[i][0]] = numbers_in_string + words_in_string;
        }
    }
    let split_temp = Object.keys(dict1);
    split_temp.sort();

    let temp = {};
    for(let i = 0; i < split_temp.length; i++){
        temp[split_temp[i]] = dict1[split_temp[i]];
    }
    dict1 = temp;

    return dict1;

};

let deepArrayEquality = (...arrays) => {
    if(arrays.length < 2){
        throw new Error("At least two arrays need to be passed");
    }

    for(let i = 0; i < arrays.length; i++){
        if(!Array.isArray(arrays[i])){
            throw new Error("Input is not an array");
        }

        if(arrays[i].length === 0){
            throw new Error("Array is empty");
        }

        for(let j = 0; j < arrays[i].length; j++){
            if(typeof arrays[i][j] !== 'number' && typeof arrays[i][j] !== 'string' && typeof arrays[i][j] !== 'object' && !Array.isArray(arrays[i][j])){
                throw new Error("Array element is not a primitive datatype, nested array, or object.");
            }
        }
    }
    /*
    let number_of_arrays = arrays.length;

    for(let i = 0; i < number_of_arrays; i++){
        for(let j = 0; j < arrays[0].length; j++){
            if(arrays[0][j] !== arrays[i][j]){
                console.log("g");
                return false;
            }
        }
    }
    */



    const check_if_equal = (a, b) => {
        if(a === b){
            return true;
        }

        if(Array.isArray(a) && Array.isArray(b)){
            if(a.length !== b.length){
                return false;
            }

            for(let i = 0; i < a.length; i++){
                if(!check_if_equal(a[i], b[i])){
                    return false;
                }
            }

            return true;
        }

        if(typeof a === 'object' && typeof b === 'object'){
            let keys1 = Object.keys(a);
            let keys2 = Object.keys(b);

            if(keys1.length !== keys2.length){
                return false;
            }

            for(let i = 0; i < keys1.length; i++){
                if(!check_if_equal(a[keys1[i]], b[keys2[i]])){
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    let length1 = arrays[0].length;
    for(let i = 0; i < arrays.length; i++){
        if(arrays[i].length !== length1){
            return false;
        }
    }

    let number_of_arrays = arrays.length;
    for(let i = 0; i < number_of_arrays; i++){
        for(let j = 0; j < arrays[0].length; j++){
            if(!check_if_equal(arrays[0][j], arrays[i][j])){
                return false;
            }
        }
    }

    return true;

};


export { arrayAnalysis, mergeKeyValuePairs, deepArrayEquality };