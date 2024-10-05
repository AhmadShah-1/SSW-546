/* Todo: Implement the functions below and then export them
      using the ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let processObjects = (objArr, func) => {
    if (!objArr) {
        throw new Error("Input is not provided");
    }
    if (objArr.length === 0) {
        throw new Error("Input is empty");
    }
    if (!Array.isArray(objArr)) {
        throw new Error("Input is not an array");
    }
    if (!func || typeof func !== "function") {
        throw new Error("Function is not provided or its not a function");
    }
    for(let dict of objArr){
        if(!dict || typeof dict !== 'object'){
            throw new Error("Input is not an object");
        }
        if(Object.keys(dict).length === 0){
            throw new Error("Object is empty");
        }
        for(let values in dict) {
            if (typeof dict[values] !== 'number') {
                throw new Error("Value is not a number");
            }
        }

    }


    let dict1 = {};
    for(let dicts of objArr){
        for(let values in dicts){
            if(!dict1[values]){
                dict1[values] = 1;
            }
            dict1[values] *= func(dicts[values]);
        }
    }

    return dict1;
};

let similarKeysValues = (obj1, obj2) => {

    if(typeof obj1 !== 'object' || typeof obj2 !== 'object' || Array.isArray(obj1) || Array.isArray(obj2)){
        throw new Error("Input is not an object");
    }


    let dict_common = {};
    let array_key1 = Object.keys(obj1);
    let array_key2 = Object.keys(obj2);

    let dict_object = {}

    const is_equal_single = (array_key1, array_key2, a, b, i) => {
        if(typeof a !== 'object' && typeof b !== 'object'){
            if(a == b){
                dict_common[array_key1[i]] = a;
            }
        }
    }

    const is_equal_object = (array_key1, array_key2, a, b, i) => {
        if(typeof a !== 'object' && typeof b !== 'object'){
            if(a == b){
                dict_object[array_key1[i]] = a;
            }
        }

        if(typeof a === 'object' && typeof b === 'object'){
            let keys1 = Object.keys(a);
            let keys2 = Object.keys(b);

            for(let j =0; j < keys1.length; j++){
                is_equal_object(keys1, keys2, a[keys1[j]], b[keys2[j]], j);
            }
        }
        }


    for(let i =0; i < array_key1.length; i++){
        if(typeof obj1[array_key1[i]] !== 'object' && typeof obj2[array_key2[i]] !== 'object'){
            is_equal_single(array_key1, array_key2, obj1[array_key1[i]], obj2[array_key2[i]], i);
        }else {
            is_equal_object(array_key1, array_key2, obj1[array_key1[i]], obj2[array_key2[i]], i)
            dict_common[array_key1[i]] = dict_object;
            dict_object = {}

        }
    }


    return dict_common;

};

let flipKeysForStringsAndNumbers = (obj) => {
    let array_key = Object.keys(obj);

    const objectflip = (obj) => {
        let dict2 = {};
        let array_key = Object.keys(obj);

        for (let i = 0; i < array_key.length; i++) {
            if (!(Array.isArray(obj[array_key[i]]))) {
                dict2[obj[array_key[i]]] = array_key[i];
            }
            if (Array.isArray(obj[array_key[i]])) {
                for (let j = 0; j < obj[array_key[i]].length; j++) {
                    dict2[obj[array_key[i]][j]] = array_key[i] + "_" + j;
                }
            }
            if (typeof obj[array_key[i]] === 'object' && obj[array_key[i]] !== null && !Array.isArray(obj[array_key[i]])) {
                let returnobj = objectflip(obj[array_key[i]]);
                dict2[array_key[i]] = returnobj;
            }
        }

        return dict2;
    };


    let dict1 = {};
    let dict2 = {};
    for(let i = 0; i < array_key.length; i++){
        if(typeof obj[array_key[i]] === 'string' || typeof obj[array_key[i]] === 'number'){
            dict1[obj[array_key[i]]] = array_key[i];
        }
        if(Array.isArray(obj[array_key[i]])){
            for(let j = 0; j < obj[array_key[i]].length; j++){
                dict1[obj[array_key[i]][j]] = array_key[i] + "_" + j;
            }
        }
        if(typeof obj[array_key[i]] === 'object' && !(Array.isArray(obj[array_key[i]]))){
            dict1[array_key[i]] = objectflip(obj[array_key[i]]);
        }
    }

    return dict1;
};


export { processObjects, similarKeysValues, flipKeysForStringsAndNumbers };