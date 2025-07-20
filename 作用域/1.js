const foo = (a) => {
  function a() {}
  var a = 20;
  console.log(a);
  console.log(arguments[0]);
};
foo(10);