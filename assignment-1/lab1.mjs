export const questionOne = (index) => {
  // throw an invalid input error if param is not a number
  if(typeof index !== 'number') throw new Error('invalid input for questionOne');

  if(index < 1) { // return 0 for all values < 1 as per instruction
    return 0;
  } else {
    return fibonacci(index); //recursive approach to return fibonacci
  }
  
};

function fibonacci(index) {
    if(index === 1 || index === 2) { //fibonacci of 1 is normally 0, but returning 1 as per instructions
        return 1;
    } else {
        return fibonacci(index-1) + fibonacci(index-2);
    }
}

export const questionTwo = (arr) => {
    let output = {};
    if(!arr || arr.length === 0) {
        return output;
    }
    arr.forEach(element => {
        if(isPrime(element)) {
            output[element] = true;
        } 
        else {
            output[element] = false;
        }
    });
  return output; //return result
};

function isPrime(element) {
    let isPrime = true;
    if(element <= 1) {
      return false;
    }
    for(let i = 2; i <= Math.sqrt(element); i++) {
        if(element % i == 0) {
            isPrime = false;
            break;
        }
    }
    return isPrime;
}

export const questionThree = (str) => {

  if(typeof str !== 'string') throw new Error('invalid input questionThree');

  let output = {
    consonants: 0,  
    vowels: 0,  
    numbers: 0, 
    spaces: 0,  
    punctuation: 0, 
    specialCharacters: 0
  }

  if(!str.length) {
    return output;
  }

  str = str.toLocaleLowerCase();
  let vowels = 'aeiou'; 
  let punctuations = '!,\\;/.-?:\'"';
  let specialChars = '$#%&^@';

  for( let char of str) {
    if(vowels.indexOf(char) !== -1) {
      output.vowels++;
    } else if(char >= 'a' && char <= 'z') {
      output.consonants++
    } else if(char >= '0' && char <= '9') {
      output.numbers++;
    } else if(char == ' ') {
      output.spaces++;
    } else if(punctuations.indexOf(char) !== -1) {
      output.punctuation++;
    } else if(specialChars.indexOf(char) !== -1) {
      output.specialCharacters++;
    }
  }

  return output; //return result
};

export const questionFour = (arr) => {
  let output = [];
  if(!arr.length) {
    return output;
  }
  arr.forEach(element => {
    if(output.indexOf(element) === -1) {
      output.push(element);
    }
  });

  return output; //return result
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: 'Parshva',
  lastName: 'Shah',
  studentId: '20027093'
};
