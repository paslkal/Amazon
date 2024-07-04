/*
const xhr = new XMLHttpRequest()

xhr.addEventListener('load', () => {
  console.log(xhr.response)
})

xhr.open('GET', 'https://supersimplebackend.dev/greeting')

xhr.send()
*/

fetch('https://supersimplebackend.dev/greeting').then((value) => {
  return value.text()
}).then((value) => {
  console.log(value)
})

