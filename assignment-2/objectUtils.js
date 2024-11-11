/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let objectStats = (arrObjects) => {

  if(!arrObjects) throw new Error('input param in objectStats is missing');

  if (!Array.isArray(arrObjects)) throw new Error('input matrix in arrObjects is not of type array');

  let numericalValues = [];
  let result = {};

  arrObjects.forEach(element => {
    if(typeof element !== 'object') throw new Error('element in arrObjects is not an object');
    if( Object.keys(element).length < 1) throw new Error('one or more elements in the arrObjects does not have sufficient key/value pair');

    for(let ele in element) {
      if(typeof element[ele] !== 'number') throw new Error('one or more values in one of the objects is not a number in objectStats');
      if(isNaN(element[ele])) throw new Error('one or more values in one of the objects is NaN in objectStats')
      numericalValues.push( Number.isInteger(element[ele]) ? element[ele] : parseFloat(element[ele].toFixed(3)));
    }

  });

  numericalValues.sort((x,y) => x-y);
  let numericalValuesLength = numericalValues.length;

  //find mean
  let sum = 0;
  numericalValues.forEach( element => {
    sum = sum + element;
  })

  result['mean'] = parseFloat((sum / numericalValuesLength).toFixed(3));
  //find median
  result['median'] = numericalValuesLength % 2 === 0 ? (numericalValues[numericalValuesLength/2] + numericalValues[numericalValuesLength/2 + 1])/2 : numericalValues[Math.floor(numericalValuesLength/2)];
  //find mode
  let tempModeCount = 1;
  let modeCount = 1;
  let tempModekey = 0;
  let modeKey = [];
  let modeValues = [];

  for(let i = 1; i < numericalValues.length; i++) {
    if(numericalValues[i] === numericalValues[i-1]) {
      tempModeCount++;
      tempModekey = i;
    } else
    { 
      if(modeKey.length  === 0 || tempModeCount === modeCount) {
        modeKey.push(tempModekey);
    } else if(tempModeCount > modeCount) {
        modeCount = tempModeCount;
        modeKey.splice(0,modeKey.length);
        modeKey.push(tempModekey);
      }
      tempModeCount = 0;
  }
}

if(tempModeCount === modeCount) {
  modeKey.push(tempModekey);
} else if ( tempModeCount > modeCount) {
  modeCount = tempModeCount;
      modeKey.splice(0,modeKey.length);
      modeKey.push(tempModekey);
}

  if(modeCount === 1) {
    result['mode'] = 0;
  } else if(modeKey.length === 1) {
    result['mode'] = numericalValues[modeKey[0]];
  } else if(modeKey.length > 1) {
    modeKey.forEach( element => {
      modeValues.push(numericalValues[element]);
    });
    result['mode'] = modeValues;
  }

  //for range
  result['range'] = numericalValues[numericalValuesLength-1] - numericalValues[0];

  //for minimum
  result['minimum'] = numericalValues[0];

  //for maximum
  result['maximum'] = numericalValues[numericalValuesLength-1];

  //for count
  result['count'] = numericalValuesLength;

  //for sum
  result['sum'] = sum;

  return result;
};

let nestedObjectsDiff = (obj1, obj2) => {
  if(!obj1 || !obj2) throw new Error('input param in nestedObjectsDiff is missing');
  checkIfProperObject(obj1, 'nestedObjectsDiff');
  if( Object.keys(obj1).length < 1) throw new Error('one or more elements in the nestedObjectsDiff does not have sufficient key/value pair');
  checkIfProperObject(obj2, 'nestedObjectsDiff');
  if( Object.keys(obj2).length < 1) throw new Error('one or more elements in the nestedObjectsDiff does not have sufficient key/value pair');

  let diffObject = {};

  if(JSON.stringify(obj1) === JSON.stringify(obj2)) {
    return diffObject;
  }

  diffObject = findObjectDiff(obj1,obj2);

  return diffObject;
};

let mergeAndSumValues = (...args) => {
  let output = {};
  if(args.length === 0) throw new Error('input param in mergeAndSumValues is missing');
  args.forEach( element => {
    checkIfProperObject(element, 'mergeAndSumValues');
    if( Object.keys(element).length < 1) throw new Error('one or more elements in the mergeAndSumValues does not have sufficient key/value pair');
    Object.keys(element).forEach( ele => {
      if(!(Object.keys(output).includes(ele))) {
        
        output[ele] = parseFloat(element[ele]);
        if(typeof output[ele] !== 'number') throw new Error('value is not a number or a numbered string in mergeAndSumValues');
        if(isNaN(output[ele])) throw new Error('value is NaN in mergeAndSumValues');
      } else {
        output[ele] = parseFloat(output[ele]) + parseFloat(element[ele]);
        if(isNaN(output[ele])) throw new Error('value is not a number or NaN or a numbered string in mergeAndSumValues');
      }
    })
  });

  return output;
};


let findObjectDiff = (obj1, obj2) => {
  let difference = {};

  Object.keys(obj1).forEach(key => {

    if(!(Object.keys(obj2).includes(key))) {
      difference[key] = undefined;
    } else {
      if(typeof obj1[key] === 'object') {
        if(Array.isArray(obj1[key]) || Array.isArray(obj2[key])) {
          difference[key] = obj2[key];
        } else {
        let tempDiff = findObjectDiff(obj1[key], obj2[key]);
        if(tempDiff) {
          difference[key] = tempDiff;
        }
      }
      } 
      else {
        if(obj1[key] !== obj2[key]) {
          difference[key] = obj2[key];
        }
      }
    }
  
  });
  Object.keys(obj2).forEach(key => {
    if(!(Object.keys(difference).includes(key)) && !(Object.keys(obj1).includes(key))) {
      difference[key] = obj2[key];
    }
  });
  return difference;
}

let checkIfProperObject = (obj, funName) => {
  if(typeof obj !== 'object') throw new Error(`element in ${funName} is not an object`);
}


export{objectStats, nestedObjectsDiff, mergeAndSumValues}