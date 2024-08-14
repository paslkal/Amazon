interface addedMessageTimeouts {
  [productId : string] : ReturnType<typeof setTimeout>
} 

interface addMessage {
  readonly addedMessage: HTMLDivElement
  readonly productId: string,
  readonly addedMessageTimeouts: addedMessageTimeouts
}

export function addMessage({addedMessage, productId, addedMessageTimeouts} : addMessage) {
  addedMessage.classList.add('added-to-cart-visible')

  const previousTimeoutId = addedMessageTimeouts[productId]
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId)
  }

  const timeoutId = setTimeout(() => {
    addedMessage.classList.remove('added-to-cart-visible')        
  }, 2000)

  addedMessageTimeouts[productId] = timeoutId
}

export function changeUrl() {
  const input = (<HTMLInputElement>document.querySelector('.js-search-bar')).value
  if (input) {
    window.location.href = `amazon.html?search=${input}`
  } else {
    window.location.href = `amazon.html`
  }
}