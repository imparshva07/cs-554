/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let swapChars = (string1, string2) => {
  if(!string1 || !string2) throw new Error('input param in swapChars is missing');
  checkIfProperString(string1,4, "swapChars");
  checkIfProperString(string2,4, "swapChars");
  string1 = string1.trim();
  string2 = string2.trim();
  let outputString1 = string2.slice(0,4) + string1.slice(4,string1.length);
  let outputString2 = string1.slice(0,4) + string2.slice(4,string2.length);
  let outputString = outputString1.concat(" ", outputString2);
  return outputString;
  //code goes here
};

let longestCommonSubstring = (str1, str2) => {
  if(!str1 || !str2) throw new Error('input param in longestCommonSubstring is missing');
  checkIfProperString(str1, 5, "longestCommonSubstring");
  checkIfProperString(str2, 5, "longestCommonSubstring");
  str1 = str1.trim();
  str2 = str2.trim();
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  let lcs="";
  
  for(let i = 0; i < str1.length; i++) {
    for(let j = i; j < str1.length; j++) {
      if(str2.includes(str1.slice(i,j+1)) && str1.slice(i,j+1).length > lcs.length) {
        lcs = str1.slice(i,j+1);
      }
    }
  }
  return lcs;
  //code goes here
};

let palindromeOrIsogram = (arrStrings) => {
  let resultObj = {};
  if(!arrStrings) throw new Error('arrStrings arguement missing');
  checkIfProperArray(arrStrings, 2, "palindromeOrIsogram");
  arrStrings.forEach( element => {
    checkIfProperString(element,1, "palindromeOrIsogram");
    let isPalindrome = false;
    let isIsogram = true;
    let correctedElement = element.toLowerCase().replace(/[^a-z0-9]/gi, '');
    //for palindrome
    let reversedEle = correctedElement.split("").reverse().join("");
    if ( correctedElement == reversedEle) {
      isPalindrome = true;
    }
    //for isogram
    let elementArray = correctedElement.split("");
    let tempEle = [];
    elementArray.forEach( ele => {
      if(!tempEle.includes(ele)) {
        tempEle.push(ele);
      } else {
        isIsogram = false;
      }
    });
    let result = isPalindrome && isIsogram ? 'Both' : isPalindrome ? 'Palindrome' : isIsogram ? 'Isogram' : 'Neither'
    resultObj[element] = result;
  });
  return resultObj;
  //code goes here
};

let checkIfProperString = (str, minLength, funName) => {
  if(typeof str !== 'string') throw new Error(`input string in ${funName} is not of type string`);
  str = str.trim();
  if(str.length < minLength) throw new Error(`input string in ${funName} is not of sufficient length`);
}

let checkIfProperArray = (arr, minLength, funName) => {
  if (!Array.isArray(arr)) throw new Error(`input matrix in ${funName} is not of type array`);
  if(arr.length < minLength) throw new Error(`input matrix in ${funName}  is not of sufficient length`);
}


export {swapChars, longestCommonSubstring, palindromeOrIsogram}