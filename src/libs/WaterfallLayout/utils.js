// 返回 img 元素集合
export const getImgElements = (itemElements) => {
  const imgElements = []
  itemElements.forEach((el) => {
    imgElements.push(...el.getElementsByTag('img'))
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
  imgs.forEach((img) => {
    const imgObj = new Image()
    imgObj.onload(() => {
      resolve({
        img,
        index
      })
    })
  })
  return Promise.all(allPromise)
}
