import { getDateInfo } from "./utils";
import { update } from "./render";

export default () => {
  // const dateInfo = {};
  const dateInfo = getDateInfo();

  Object.defineProperties(dateInfo, {
    year: {
      get() {
        return dateInfo[0];
      },
      set(newValue) {
        dateInfo[0] = newValue;
        update(dateInfo[0], dateInfo[1]);
      },
    },
    month: {
      get() {
        return dateInfo[1];
      },
      set(newValue) {
        dateInfo[1] = newValue;
        update(dateInfo[0], dateInfo[1]);
      },
    },
  });

  return dateInfo;
};
