import { update as dateUpdate, render as dateRender } from "./date/render";
import { update as yearUpdate, render as yearRender } from "./year/render";
import { update as monthUpdate, render as monthRender } from "./month/render";

export const ALLOWED_FLAGS = {
  YEAR: "YEAR",
  MONTH: "MONTH",
  DATE: "DATE",
};

let currentFlag = ALLOWED_FLAGS.DATE;

export function getFlag() {
  return currentFlag;
}

export function setFlag(value, container, { year, month }) {
  if (ALLOWED_FLAGS[value]) {
    currentFlag = ALLOWED_FLAGS[value];
    switch (currentFlag) {
      case ALLOWED_FLAGS.YEAR:
        yearRender(container, year);
        break;
      case ALLOWED_FLAGS.MONTH:
        monthRender(container, year,month)
        break;
      case ALLOWED_FLAGS.DATE:
        dateRender(container, year, month);
        break;
      default:
        break;
    }
  }
}

export function reactive({ year, month }) {
  // const dateInfo = {};
  // const dateInfo = getDateInfo();
  const dateInfo = [year, month];

  Object.defineProperties(dateInfo, {
    year: {
      get() {
        return dateInfo[0];
      },
      set(newValue) {
        dateInfo[0] = newValue;
        // update(dateInfo[0], dateInfo[1]);
        update(...dateInfo);
      },
    },
    month: {
      get() {
        return dateInfo[1];
      },
      set(newValue) {
        dateInfo[1] = newValue;
        update(...dateInfo);
      },
    },
  });

  return dateInfo;
}

function update(year, month) {
  switch (currentFlag) {
    case ALLOWED_FLAGS.YEAR:
      yearUpdate(year);
      break;
    case ALLOWED_FLAGS.MONTH:
      monthUpdate(year)
      break;
    case ALLOWED_FLAGS.DATE:
      dateUpdate(year, month);
      break;
    default:
      break;
  }
}
