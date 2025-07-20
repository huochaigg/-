const add = new Proxy({
  _count: 0,
}, {
  get(target, key, receiver) {
    console.log('target', target)
    console.log('key', key)
    console.log('receiver', receiver)
    if (key === Symbol.toPrimitive) {
      console.log('Symbol.toPrimitive called')
      return () => {
        return target._count
      }
    }
    target._count += +key
    return receiver;
  },
})


console.log(+add[2][3][10])