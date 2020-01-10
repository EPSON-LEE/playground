//  reduce 非常强大 map、filter、forEach 函数都可以使用 reduce 实现


// 使用 reduce 模拟 map 函数
/**
 * map 的使用方法
 * [1,2,3,4].map(item => {
 *  console.log(item)
 * })
 */

const map = (fn, arr) => arr.reduce((acc, item, index, arr) => {
  return acc.concat(fn(item, index, arr))
}, [])


// 使用 reduce 实现 filter

/**
* filter 的使用方法
* [1,2,3,4].filter(item => {
*  return item > 2
* })
* 
* > 3, 4
*/


//  filter 中的判断函数称为 predicate function

const filter = (fn, arr) => arr.reduce((newArr, item) => {
  return fn(item) ? newArr.concat(item) : newArr // predicate function
})

// 使用 reduce 实现 forEach



// 使用 reduce 实现 reduceRight


// 使用 reduce 实现 compose

/**
* compose(f, g, h)
* f, g, h => f(g(h(x)))
*/

const compose = (...fn) => x => fn.reduceRight((v, f) => f(v), x)


// 使用 reduce 实现 reduceRight



// 使用 reduce 实现 pipe 函数

/**
* pipe(h, g, f)
* f(g(h(x)))
*/
const pipe = (...fn) => x => fn.reduce((v, f) => f(v), x)

// test args

const test = (...args) => console.log(args)

/**
* 同一性
* f.map(x => x) == f
*/

/**
* 组合性
* const r1 = u.map(x => f(g(x)));
* const r2 = u.map(g).map(f);
* 
* r1.map(trace); // 5
* r2.map(trace); // 5
*/

//  Maybe Functor

class Maybe {
  constructor(value) {
    this.value = value;
  }
  map (fn) {
    return this.value ? Maybe.of(fn(this.value)) : Maybe.of(null);
  }
  join () {
    return this.value;
  }
  chain (fn) {
    return this.map(fn).join()
  }
  static of (value) {
    return new Maybe(value);
  }
}


a = Maybe.of(Maybe.of(Maybe.of('str')))