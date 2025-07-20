Function.prototype.myBind = function (content = globalThis, ...args) {
  const fn = this;
  return function (...rust) {
      if (new.target) {
          // 如果是new调用，则this指向新创建的对象
          content = this;
      }
      // 执行函数并传入参数
      return fn.apply(content, [...args, ...rust]);
  };
}

function Person(...args) {
  console.log('this指向新创建的对象', this, args);
}

const person = new Person('张三'); // this指向新创建的对象

const boundPerson = Person.myBind({ name: '李四' });
boundPerson('王五'); // this指向绑定的对象