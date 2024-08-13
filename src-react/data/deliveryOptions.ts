import dayjs from 'dayjs';

function isWeekend(date: dayjs.Dayjs) : boolean {
  const dayOfWeek : string = date.format('dddd')
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday'
}

export function calculateDeliveryDate(deliveryOption : DelivetyOption) : string {
  let remainingDays : number = deliveryOption.deliveryDays
  let deliveryDate : dayjs.Dayjs = dayjs()

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day')

    if (!isWeekend(deliveryDate)) {
      remainingDays--
    }
  }

  const dateString : string = deliveryDate.format('dddd, MMMM D');
  return dateString
}

export function getDeliveryOption(deliveryOptionId : string) {
  let deliveryOption : DelivetyOption = {
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

interface DelivetyOption {
  id : string,
  deliveryDays : number,
  priceCents : number
}

export const deliveryOptions : DelivetyOption[] = [{
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