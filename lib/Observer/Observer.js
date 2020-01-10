class Observable {
  constructor(_subscribe) {
    this._subscribe = _subscribe; // 传入的执行函数
  }
  static create (_subscribe) {
    return new Observable(_subscribe);
  }
  subscribe ({ next, error, complete }) { // 解构传入的 observer
    const sink = new Subscription(next, error, complete);
    this._subscribe(sink);
    return sink;
  }
}


class Subscription {
  constructor(next, error, complete) {
    this._isStopped = false;
    this._next = next;
    this._error = error;
    this._complete = complete;
  }
  next (value) {
    if (!this._isStopped) {
      this._next(value);
    }
  }
  error (value) {
    if (!this._isStopped) {
      this._isStopped = true;
      this._error(value);
      this.unsubscribe();
    }
  }
  complete (value) {
    if (!this._isStopped) {
      this._isStopped = true;
      this._complete(value);
      this.unsubscribe();
    }
  }
  unsubscribe () {
    this._isStopped = true;
  }
}


const observable = Observable.create(observer => {
  observer.next(1);
  observer.next(2);
  setTimeout(() => {
    observer.next(3);
    observer.complete();
  }, 1000);
});

const observer = {
  next: x => console.log('got value ' + x),
  error: err => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
};

console.log('just before subscribe');
const subscription = observable.subscribe(observer);
console.log('just after subscribe');



// 构建流式应用——RXJS 详解 https://github.com/joeyguo/blog/issues/11

// 民工叔 流动的数据逻辑 https://github.com/xufei/blog/issues/38

// 数据的关联计算 https://github.com/xufei/blog/issues/36

class subject {
  constructor() {
    this.observerList = []
  }

  addObserver (observer) {
    return this.observerList.push(observer)
  }

  getCount () {
    return this.observerList.length
  }

  subscribe (value) {
    this.observerList.forEach(observer => observer.update(value))
  }
}

class observer {
  constructor(name) {
    this.name = name
  }
  update (value) {
    console.log(`${this.name}的值是：`, value)
  }
}

var observer1 = new observer('第一个人')
var observer2 = new observer('第二个人')
const $source = new subject()
$source.addObserver(observer1)
$source.addObserver(observer2)
$source.subscribe(333)
