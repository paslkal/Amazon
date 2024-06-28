class Car {
  #brand
  #model
  speed = 0
  isTruckOpen = false
  
  constructor(carDetails) {
    this.#brand = carDetails.brand
    this.#model = carDetails.model
  }

  go() {
    if (!this.isTruckOpen) {
      this.speed + 5 <= 200 ? this.speed+=5 : this.speed = 200 
    }
  }

  brake() {
    this.speed - 5 >= 0 ? this.speed-=5 : this.speed = 0 
  }

  OpenTruck() {
    this.isTruckOpen = !this.speed
  }

  closeTruck() {
    this.isTruckOpen = false
  }

  displayInfo() {
    console.log(`Brand:${this.#brand}, Model:${this.#model}, Speed: ${this.speed} km/h, is Trunck Open: ${this.isTruckOpen}`)
  }
}

const car1 = new Car({brand:'Toyota', model:'Corolla'})
const car2 = new Car({brand:'Tesla', model:'Model 3'})

car1.displayInfo()
car2.displayInfo()

class RaceCar extends Car {
  acceleration

  constructor(carDetails) {
    super(carDetails)

    this.acceleration = carDetails.acceleration
  }

  go() {
    if (!this.isTruckOpen) {
      this.speed + this.acceleration <= 300 ? this.speed+=this.acceleration : this.speed = 300 
    }
  }

  OpenTruck() {
    return
  }

  closeTruck() {
    return
  }

}

const raceCar = new RaceCar({brand: 'McLaren', model: 'F1', acceleration: 20})

raceCar.displayInfo()
raceCar.OpenTruck()
raceCar.displayInfo()
raceCar.go()
raceCar.displayInfo()
raceCar.go()
raceCar.go()
raceCar.displayInfo()
raceCar.brake()
raceCar.displayInfo()
