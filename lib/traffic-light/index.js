let shining = (color, time) => {
  return new Promise((resolve, reject) => {
    document.getElementById('id').style.backgroundColor = color
    setTimeout(() => {
      resolve()
    }, time * 1000);
  })
}


let start = async () => {
  await shining('red', 2)
  await shining('green', 1)
  await shining('yellow', 2)
}
