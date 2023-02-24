export type MarksType = {[key: string]: any};

export type APP_PERFORMANCE_TYPE = {
  marks: MarksType;
  markName: string;
  getMarks: () => MarksType;
  resetMarks: () => void;
  mark: (markName: string) => APP_PERFORMANCE_TYPE;
  start: () => void | undefined;
  reset: () => void | undefined;
  remove: () => void;
  getDuration: () => string | undefined;
};
