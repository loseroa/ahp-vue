function estimate (matrix){
  // console.log(matrix)
  let valueMatrix = matrix.map(item => {
    return item.map(({value}) => parseFloat(value))
  })
  // console.log(valueMatrix)
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

export {estimate}
