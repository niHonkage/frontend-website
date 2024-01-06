// 返回 img 元素集合
export const getImgElements = (itemElements) => {
  const imgElements = []
  itemElements.forEach((el) => {
    imgElements.push(...el.getElementsByTagName('img'))
  })
  return imgElements
}
// 返回src集合
export const getAllImgs = (imgElements) => {
  return imgElements.map((el) => {
    return el.src
  })
}

// 监听加载完成并返回promise
export const onCompleteImgs = (imgs) => {
  const allPromise = []
  imgs.forEach((img, index) => {
    allPromise[index] = new Promise((resolve, reject) => {
      // 处理img加载情况
      const imgObj = new Image()
      imgObj.src = img
      imgObj.onload = () => {
        resolve({
          img,
          index
        })
      }
    })
  })
  return Promise.all(allPromise)
}

// 获取最小列高度值
export const getMinHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.min(...columnHeightArr)
}

// 获取最小高度的列：先获取最小列高度值，然后遍历匹配
export const getMinColumn = (columnHeightObj) => {
  const minHeight = getMinHeight(columnHeightObj)
  return Object.keys(columnHeightObj).find((key) => {
    return columnHeightObj[key] === minHeight
  })
}

// 获取最大列高值
export const getMaxHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.max(...columnHeightArr)
}
