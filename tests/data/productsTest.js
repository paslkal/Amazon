import { Product, Clothing, Applience } from "../../data/products.js"
import { formatCurrency } from "../../scripts/utils/money.js"

describe('test suite: class Product', () => {
  const id = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
  const image = "images/products/athletic-cotton-socks-6-pairs.jpg" 
  const name = "Black and Gray Athletic Cotton Socks - 6 Pairs"
  const rating = {
    stars: 4.5,
    count: 87
  }
  const priceCents = 1090
  const keywords = [
    "socks",
    "sports",
    "apparel"
  ]
  const product = new Product({
    id,
    image,
    name,
    rating,
    priceCents,
    keywords,
  })
  
  it('create right properties', () => {
    expect(product.id).toEqual(id)
    expect(product.image).toEqual(image)
    expect(product.name).toEqual(name)
    expect(product.rating.stars).toEqual(rating.stars)
    expect(product.rating.count).toEqual(rating.count)
    expect(product.priceCents).toEqual(priceCents)
  })

  it('create right methods', () => {
    expect(product.getStartsUrl())
      .toContain(`images/ratings/rating-${rating.stars * 10}.png`)
    expect(product.getPrice())
      .toContain(`$${formatCurrency(priceCents)}`)
    expect(product.extraInfoHTML()).toEqual('')
    })
})


describe('test suite: class Clothing', () => {
  const id = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e"
  const image = "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg" 
  const name = "Adults Plain Cotton T-Shirt - 2 Pack"
  const rating = {
    stars: 4.5,
    count: 56
  }
  const priceCents = 799
  const keywords = [
    "tshirts",
    "apparel",
    "mens"
  ] 
  const type = "clothing"
  const sizeChartLink = "images/clothing-size-chart.png" 
  const clothing = new Clothing({
    id,
    image,
    name,
    rating,
    priceCents,
    keywords,
    type,
    sizeChartLink
  })
  
  it('create right properties', () => {
    expect(clothing.id).toEqual(id)
    expect(clothing.image).toEqual(image)
    expect(clothing.name).toEqual(name)
    expect(clothing.rating.stars).toEqual(rating.stars)
    expect(clothing.rating.count).toEqual(rating.count)
    expect(clothing.priceCents).toEqual(priceCents)
    expect(clothing.type).toEqual(type)
    expect(clothing.sizeChartLink).toEqual(sizeChartLink)
  })

  it('create right methods', () => {
    expect(clothing.getStartsUrl())
      .toContain(`images/ratings/rating-${rating.stars * 10}.png`)
    expect(clothing.getPrice())
      .toContain(`$${formatCurrency(priceCents)}`)
    expect(clothing.extraInfoHTML())
      .toContain(`<a href="${sizeChartLink}" target="_blank">Size Chart</a>`)
    })
})


describe('test suite: class Applience', () => {
  const id = "54e0eccd-8f36-462b-b68a-8182611d9add"
  const image = "images/products/black-2-slot-toaster.jpg" 
  const name = "Adults Plain Cotton T-Shirt - 2 Pack"
  const rating = {
    stars: 5,
    count: 2197
  }
  const priceCents = 1899
  const keywords = [
    "toaster",
    "kitchen",
    "appliances"
  ]
  const type = "applience"
  const applienceInstructions = 'images/appliance-instructions.png'
  const applienceWarranty = 'images/appliance-warranty.png'


  const appliance = new Applience({
    id,
    image,
    name,
    rating,
    priceCents,
    keywords,
    type,
    applienceInstructions,
    applienceWarranty
  })
  
  it('create right properties', () => {
    expect(appliance.id).toEqual(id)
    expect(appliance.image).toEqual(image)
    expect(appliance.name).toEqual(name)
    expect(appliance.rating.stars).toEqual(rating.stars)
    expect(appliance.rating.count).toEqual(rating.count)
    expect(appliance.priceCents).toEqual(priceCents)
    expect(appliance.type).toEqual(type)
    expect(appliance.applienceInstructions).toEqual(applienceInstructions)
    expect(appliance.applienceWarranty).toEqual(applienceWarranty)
  })

  it('create right methods', () => {
    expect(appliance.getStartsUrl())
      .toContain(`images/ratings/rating-${rating.stars * 10}.png`)
    expect(appliance.getPrice())
      .toContain(`$${formatCurrency(priceCents)}`)
    expect(appliance.extraInfoHTML())
      .toContain(
        `<a href="${applienceInstructions}" target="_blank">Instructions</a>`
      )
    expect(appliance.extraInfoHTML())
      .toContain(
        `<a href="${applienceWarranty}" target="_blank">Warranty</a>`
      )
  
  })
})
