import { ALLOWED_FLAGS, getFlag, setFlag } from "./store";

let target = null;

export default (...args) => {
  const [container] = args;
  container.addEventListener("click", handlerClick.bind(null, ...args), false);
};

function handlerClick(...args) {
  const [container, handler, dateInfo, e] = args;
  const tar = e.target;
  const className = tar.className;
  const flag = getFlag();

  // controlClick(className, dateInfo);

  if (className === "title-year") {
    titleYearClick(container, dateInfo);
    return;
  }

  if (className === "title-month") {
    titleMonthClick(container, dateInfo);
    return;
  }

  if (className.includes("decade-year")) {
    yearClick(container, tar, dateInfo);
  }

  if (className.includes("static-month")) {
    monthClick(container, tar, dateInfo);
  }

  if (className.includes("current-day")) {
    dateClick(tar, handler, dateInfo);
    return;
  }

  switch (flag) {
    case ALLOWED_FLAGS.YEAR:
      yearControlClick(className, dateInfo);
      break;
    case ALLOWED_FLAGS.MONTH:
      monthControlClick(className, dateInfo);
      break;
    case ALLOWED_FLAGS.DATE:
      dateControlClick(className, dateInfo);
      break;
    default:
      break;
  }
}

function yearClick(container, tar, dateInfo) {
  dateInfo.year = Number(tar.dataset.year);
  setFlag(ALLOWED_FLAGS.DATE, container, dateInfo);
}

function monthClick(container, tar, dateInfo) {
  dateInfo.month = Number(tar.dataset.month);
  setFlag(ALLOWED_FLAGS.DATE, container, dateInfo);
}

function dateClick(tar, handler) {
  if (target) {
    target.className = target.className.replace(" selected", "");
  }
  target = tar;
  tar.className += " selected";
  handler && handler(tar.dataset.date);
}

function titleYearClick(container, dateInfo) {
  setFlag(ALLOWED_FLAGS.YEAR, container, dateInfo);
}

function titleMonthClick(container, dateInfo) {
  setFlag(ALLOWED_FLAGS.MONTH, container, dateInfo);
}

function yearControlClick(className, dateInfo) {
  switch (className) {
    case "year-control-button btn-year-lt":
      dateInfo.year -= 10;
      break;
    case "year-control-button btn-year-rt":
      dateInfo.year += 10;
      break;
    default:
      break;
  }
}

function monthControlClick(className, dateInfo) {
  switch (className) {
    case "month-control-button btn-month-lt":
      dateInfo.year -= 1;
      break;
    case "month-control-button btn-month-rt":
      dateInfo.year += 1;
      break;
    default:
      break;
  }
}

function dateControlClick(className, dateInfo) {
  switch (className) {
    case "control-button btn-year-lt":
      dateInfo.year -= 1;
      break;
    case "control-button btn-month-lt":
      dateInfo.month > 1 && (dateInfo.month -= 1);
      break;
    case "control-button btn-month-rt":
      dateInfo.month < 12 && (dateInfo.month += 1);
      break;
    case "control-button btn-year-rt":
      dateInfo.year += 1;
      break;
    default:
      break;
  }
}
