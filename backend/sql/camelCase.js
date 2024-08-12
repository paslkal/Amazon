const {objectKeysToCamelCaseV2} = require('keys-converter')

function convertToCamelCase(snake_case_array) {
  const camelCaseArray = []

  snake_case_array.forEach(item => {
    const camelCaseItem = objectKeysToCamelCaseV2(item)
    camelCaseArray.push(camelCaseItem)
  })

  return camelCaseArray
}

module.exports = {
  convertToCamelCase
}