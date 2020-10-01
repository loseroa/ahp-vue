function estimate (matrix){
  let valueMatrix = matrix.map(item => {
    return item.map(({value}) => parseFloat(value))
  })
  const add = (x,y) => parseFloat(x) + parseFloat(y)    
  const sum = xs => xs.reduce(add, 0)

  tmp = valueMatrix[0].map((val, index) => valueMatrix.map(row => row[index]).reverse()).map(sum)
  
  valueMatrix = valueMatrix.map(item => {
    return item.map((value, index) => value / tmp[index])
  })

  let tmp = valueMatrix.map(sum)
  let tmp2 = tmp.reduce(add, 0)
  tmp = tmp.map((item) => item / tmp2)

  return tmp
}

function getAllSubset (array) {
  let valueArray = array.map(({name}) => name)
  return valueArray.reduce(
    (subsets, value) => subsets.concat(
     subsets.map(set => [value,...set])
    ),
    [[]]
  )
}

function getFrequency (array) {
  const totalSum = array.reduce((total, item) => {
    return total + parseFloat(item.value)
  }, 0)
  return array.map(item =>  parseFloat(item.value/totalSum))
}

function getPlScore(arrayName, arrayValue) {
  let result = []
  for (let i = 0; i < arrayName.length; i++) 
  {
      let pl = 0;
      for (let j = 0; j < arrayName.length; j++)
      {
          if (arrayName[j].hasIntersection(arrayName[i]))
          {
            pl += arrayValue[j];
          }
      }
      result.push(pl)
  }
  return result
}

function getBlScore(arrayName, arrayValue) {
  let result = []
  for (let i = 0; i < arrayName.length; i++) 
  {
      let bel = 0;
      for (let j = 0; j < arrayName.length; j++)
      {
          if (arrayName[j].isChildOf(arrayName[i]))
          {
              bel += arrayValue[j];
          }
      }
      result.push(bel)
  }
  return result
}



function roundTo2Decimal(number)
{
    return Math.round(number * 100) / 100.0;
}

Array.prototype.isChildOf = function (arr)
{
    for (const ele of this)
    {
        if (!arr.includes(ele))
        {
            return false;
        }
    }
    return true;
}

Array.prototype.hasIntersection = function (arr)
{
    for (const ele of this)
    {
        if (arr.includes(ele))
        {
            return true;
        }
    }
    return false;
}

function initArrayZeros(arrayLength) {
  let res = []
  for (let index = 0; index < arrayLength; index++) {
    res.push(0)    
  }
  return res
}

export {
  estimate, 
  getAllSubset, 
  getFrequency, 
  getBlScore, 
  getPlScore,
  roundTo2Decimal,
  initArrayZeros
}
