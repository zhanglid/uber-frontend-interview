/**
 * Return a debounce function
 * @param {function} func
 * @param {number} time to debounce
 */
function debounce(func, time) {
  let lastFunc;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(lastFunc);
    lastFunc = setTimeout(() => {
      func.apply(context, args);
    }, time);
  };
}

module.exports = debounce;