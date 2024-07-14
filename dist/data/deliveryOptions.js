import dayjs from 'dayjs';
function isWeekend(date) {
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}
export function calculateDeliveryDate(deliveryOption) {
    let remainingDays = deliveryOption.deliveryDays;
    let deliveryDate = dayjs();
    while (remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, 'day');
        if (!isWeekend(deliveryDate)) {
            remainingDays--;
        }
    }
    const dateString = deliveryDate.format('dddd, MMMM D');
    return dateString;
}
export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption = {
        id: 'someId',
        deliveryDays: -1,
        priceCents: -1
    };
    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });
    return deliveryOption;
}
export const deliveryOptions = [{
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
    }];
