const expect = require("chai").expect;
const Promise = require("bluebird");
const throttle = require("./throttle");

describe("throttle", () => {
  it("should return a function", () => {
    const func = () => {};
    expect(throttle(func)).to.be.a("function");
  });

  it("should call the function immediately", () => {
    let lastCalledTime = null;
    const func = () => {
      lastCalledTime = Date.now();
    };
    const throttleFunc = throttle(func, 100);
    throttleFunc();
    expect(lastCalledTime).to.be.exist;
  });

  it("should ignore second call within time", async () => {
    let calledCnt = 0;
    const func = () => {
      calledCnt++;
    };
    const throttledFunc = throttle(func, 100);
    throttledFunc();
    await Promise.delay(30);
    throttledFunc();
    expect(calledCnt).to.be.eql(1);
  });

  it("should delay the second call to next throttle", async () => {
    let calledCnt = 0;
    const func = () => {
      calledCnt++;
    };
    const throttledFunc = throttle(func, 100);
    throttledFunc();
    await Promise.delay(30);
    throttledFunc();
    expect(calledCnt).to.be.eql(1);
    await Promise.delay(700);
    expect(calledCnt).to.be.eql(2);
  });

  it("should only emit the last second called with in throttle", async () => {
    let calledCnt = 0;
    let lastCalledId = null;
    const func = id => {
      calledCnt++;
      lastCalledId = id;
    };
    const throttledFunc = throttle(func, 100);
    throttledFunc(1);
    await Promise.delay(30);
    throttledFunc(2);
    await Promise.delay(60);
    throttledFunc(3);
    expect(calledCnt).to.be.eql(1);
    await Promise.delay(70);
    expect(calledCnt).to.be.eql(2);
    expect(lastCalledId).to.be.eql(3);
  });
});
