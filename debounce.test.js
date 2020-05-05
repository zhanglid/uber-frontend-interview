const expect = require("chai").expect;
const debouce = require("./debounce");
const Promise = require("bluebird");

describe("debounce", () => {
  it("should return a function", () => {
    const func = () => {};
    expect(debouce(func)).to.be.a("function");
  });

  it("new function should be called with time delay", async () => {
    let calledTime = null;
    const func = () => {
      calledTime = Date.now();
    };
    const debouncedFunc = debouce(func, 1000);
    let now = Date.now();
    debouncedFunc();
    expect(calledTime).to.be.null;
    await Promise.delay(1000);
    expect(calledTime).to.be.greaterThan(now + 1000);
  });

  it("function should only be called once if the second call is within time delay", async () => {
    let calledCount = 0;
    let lastCallId = null;
    const func = id => {
      calledCount++;
      lastCallId = id;
    };
    const debouncedFunc = debouce(func, 1000);
    debouncedFunc(1);
    await Promise.delay(500);
    debouncedFunc(2);
    await Promise.delay(1000);
    expect(calledCount).to.be.eql(1);
    expect(lastCallId).to.be.eql(2);
  });
});
