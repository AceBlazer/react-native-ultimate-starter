import config from '../../config';
import {APP_PERFORMANCE_TYPE} from '../../types/performance.type';

const APP_PERFORMANCE: APP_PERFORMANCE_TYPE = {
  marks: {},
  markName: '',
  getMarks() {
    return this.marks;
  },
  resetMarks() {
    this.marks = {};
    this.markName = '';
  },
  mark(markName) {
    if (!this.marks[markName]) {
      const newMark = {name: markName};
      this.marks[markName] = newMark;
    }
    this.markName = markName;
    return this;
  },
  start() {
    try {
      if (config.enablePerformance) {
        return;
      }
      this.marks[this.markName] = {
        name: this.markName,
        //@ts-ignore
        startTime: performance.now(),
        endTime: 0,
        duration: 0,
      };
    } catch (error) {
      console.error(error);
      if (error === 'performance is not defined') {
        return;
      }
    }
  },
  reset() {
    try {
      //@ts-ignore
      this.marks[this.markName].startTime = performance.now();
    } catch (error) {
      console.error(error);
      if (error === 'performance is not defined') {
        return;
      }
    }
  },
  remove() {
    this.marks = this.marks.filter(
      (mark: {name: string}) => mark.name !== this.markName,
    );
  },
  getDuration() {
    try {
      if (config.enablePerformance) {
        return;
      }
      const mark = this.marks[this.markName];
      if (!mark) {
        return;
      }
      //@ts-ignore
      mark.endTime = performance.now();
      if (mark.startTime <= 0) {
        return;
      }
      mark.duration = (mark.endTime - mark.startTime) / 1000;

      delete this.marks[this.markName];

      return parseFloat(mark.duration).toFixed(3) + 's';
    } catch (error) {
      console.error(error);
      if (error === 'performance is not defined') {
        return;
      }
    }
  },
};

export default APP_PERFORMANCE;
