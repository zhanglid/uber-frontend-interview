function throttle(func, time) {
  let lastCalledTime = null;
  let nextCall = null;
  return function() {
    const args = arguments;
    const context = this;
    if (!lastCalledTime) {
      func.apply(context, args);
      lastCalledTime = Date.now();
    } else {
      clearTimeout(nextCall);
      nextCall = setTimeout(() => {
        func.apply(context, args);
        lastCalledTime = Date.now();
      }, time - (Date.now() - lastCalledTime));
    }
  };
}

module.exports = throttle;
