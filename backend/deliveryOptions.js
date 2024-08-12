const dayjs = require('dayjs')

function isWeekend(date) {
  const dayOfWeek = date.format('dddd')
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday'
}

function calculateDeliveryDate(deliveryOption) {
  let remainingDays = deliveryOption.deliveryDays
  let deliveryDate = dayjs()

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day')

    if (!isWeekend(deliveryDate)) {
      remainingDays--
    }
  }

  return deliveryDate
}

function getDeliveryOption(deliveryOptionId) {
  let deliveryOption = {
    id : 'someId',
    deliveryDays : -1,
    priceCents : -1
  }

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption
}

const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}]

module.exports = {
  calculateDeliveryDate,
  getDeliveryOption
}