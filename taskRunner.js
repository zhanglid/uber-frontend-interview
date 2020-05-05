module.exports = class TaskRunner {
  constructor(concurrency) {
    this._concurrency = concurrency;
    this._runningCnt = 0;
    this._jobs = [];
  }

  popNextJob() {
    let nextIndex;
    let maxPriority = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < this._jobs.length; i++) {
      let job = this._jobs[i];
      if (job.priority > maxPriority) {
        nextIndex = i;
      }
    }
    const nextJob = this._jobs[nextIndex];
    this._jobs.splice(nextIndex, 1);
    return nextJob;
  }

  run() {
    if (this._jobs.length < 1) {
      this._runningCnt--;
      return;
    }
    const nextJob = this.popNextJob();
    const args = nextJob.args;
    const cb = args[args.length - 1];
    const wrappedCB = () => {
      cb && cb(arguments);
      process.nextTick(() => this.run());
    };
    nextJob.func.apply(nextJob.context, [
      ...args.splice(0, args.length - 1),
      wrappedCB
    ]);
  }

  // { func, context, args, priority }
  push(job) {
    this._jobs.push(job);
    if (this._runningCnt < this._concurrency) {
      this._runningCnt++;
      process.nextTick(() => this.run());
    }
  }
};
