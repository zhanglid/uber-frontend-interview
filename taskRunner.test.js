const expect = require("chai").expect;
const TaskRunner = require("./taskRunner");

describe("TaskRunner", () => {
  const CONCURRENCY = 3;
  const taskRunner = new TaskRunner(CONCURRENCY);
  it("should take concurreny to its constructor", () => {
    expect(taskRunner).to.be.exist;
  });

  it("should have push function", () => {
    expect(taskRunner.push).to.be.an("function");
  });

  it("should run task async", done => {
    let called = false;
    const task = {
      func: cb => {
        called = true;
        cb();
      },
      context: null,
      args: [],
      priority: 1
    };
    taskRunner.push(task);
    expect(called).to.be.false;
    process.nextTick(() => {
      expect(called).to.be.true;
      done();
    });
  });

  it("should run task max in concurrency", done => {
    let calledCount = 0;
    const task = {
      func: cb => {
        calledCount++;
        cb();
      },
      context: null,
      args: [],
      priority: 1
    };
    taskRunner.push(task);
    taskRunner.push(task);
    taskRunner.push(task);
    taskRunner.push(task);
    expect(calledCount).to.be.eql(0);
    process.nextTick(() => {
      expect(calledCount).to.be.eql(3);
      process.nextTick(() => {
        expect(calledCount).to.be.eql(4);
        done();
      });
    });
  });

  
});
