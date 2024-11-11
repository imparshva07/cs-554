/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let arrayPartition = (arrayToPartition, partitionFunc) => {

  if(!arrayToPartition) throw new Error('input array in arrayPartition is missing');

  checkIfItsAnArray(arrayToPartition);
  checkIfArrayIsNonEmpty(arrayToPartition);
  arrayHasAtLeastTwoElements(arrayToPartition);

  if(!partitionFunc || typeof partitionFunc !== 'function') throw new Error('partitionFunc param does not exists or is not a function ');

  let resultSubArray = [];
  let firstSubArray = arrayToPartition.filter(partitionFunc);
  let secondSubArray = [];
  arrayToPartition.forEach(element => {
    if(!firstSubArray.includes(element)) {
      secondSubArray.push(element);
    }
  });
  resultSubArray.push(firstSubArray);
  resultSubArray.push(secondSubArray);
  return resultSubArray;
};

let arrayShift = (arr, n) => {

  if(!arr) throw new Error('arr param is missing from arrayShift');

  checkIfItsAnArray(arr);
  checkIfArrayIsNonEmpty(arr);
  arrayHasAtLeastTwoElements(arr);
  checkForProperNumber(n);
  if(!Number.isInteger(n)) throw new Error('the input number should be whole number');

  if(n === 0) {
    return arr;
  }
  
  if (n < 0) {
     arr = rotateArrayLeft(arr,n);
  } else if (n > 0) {
    arr = rotateArrayRight(arr,n);
  }

  return arr;
};

let matrixOne = (matrix) => {
  let indicesToUpdate = [];
  if(!matrix) throw new Error('matrix arguement missing');
  checkIfItsAnArray(matrix);
  checkIfArrayIsNonEmpty(matrix);
  for(let i = 0; i < matrix.length; i++) {
    checkIfItsAnArray(matrix[i]);
    checkIfArrayIsNonEmpty(matrix[i]);
    if(matrix[i].length !== matrix[0].length) throw new Error('matrix has missing elements');
    for(let j = 0; j < matrix[i].length; j++) {
      if(typeof matrix[i][j] !== 'number') throw new Error('each sub-array element inside the matrix array should be a number for matrixOne');
      if(isNaN(matrix[i][j])) throw new Error('sub-array element inside the matrix array is NaN for matrixOne');
      if(matrix[i][j] === 0){
        if(!indicesToUpdate.includes(j)) {
          indicesToUpdate.push(i,j);
        }
      }
    }
  }

  for(let i = 0; i < matrix.length; i++) {
    for(let j = 0; j < matrix[i].length; j++) {
      if(indicesToUpdate.includes(j) || indicesToUpdate.includes(i)){
        matrix[i][j] = 1;
      }
    }
  }
return matrix;
};

let checkIfItsAnArray = (arr) => {
  if (!Array.isArray(arr)) throw new Error('input param is not an array');
}

let checkIfArrayIsNonEmpty = (arr) => {
  if(arr.length == 0) throw new Error('input array is Empty');
}

let arrayHasAtLeastTwoElements = (arr) => {
  if(arr.length <= 1) throw new Error('input array should contain at least 2 elements');
}

let checkForProperNumber = (n) => {
  if (typeof n !== 'number') throw new Error('input variable does not exist or is not a number');
  if (isNaN(n)) throw new Error('input variable is NaN');
}

let rotateArrayLeft = (arr,n) => {
  let tempShift;
  for(let i = 0; i > n; i--) {
    tempShift = arr.shift();
    arr.push(tempShift);
  }
  return arr;
}

let rotateArrayRight = (arr,n) => {
  let tempPop;
  for(let i = 0; i < n; i++) {
    tempPop = arr.pop();
    arr.unshift(tempPop);
  }
  return arr;
}

export {arrayPartition, arrayShift, matrixOne};