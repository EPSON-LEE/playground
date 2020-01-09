class Event {
  constructor() {
    this.eventList = []
  }

  on (key, func) {
    this.eventList[key] = []
    this.eventList[key].push(func)
  }

  emit (key, ...args) {
    const args = Array.prototype.slice.call(arguments, 1)
    this.eventList[key].forEach(func => func(...args))
  }

  reomve (key) {
    this.eventList.slice(this.eventList.findIndex(event => event === key), 1)
  }

}

var eventSource = new Event()

function hello (value) {
  console.log("Hi Hello")
}

function Test (value) {
  console.log("Hi Hello")
}

eventSource.on('hello', function (value) {
  console.log("Hi Hello")
})

