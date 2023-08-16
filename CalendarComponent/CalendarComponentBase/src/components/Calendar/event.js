let target = null;

export default (container, handler, dateInfo) => {
  container.addEventListener(
    "click",
    handlerClick.bind(null, handler, dateInfo),
    false
  );
};

function handlerClick(...args) {
  const [handler, dateInfo, e] = args;
  const tar = e.target;
  const className = tar.className;
  controlClick(className, dateInfo);
  if (className.includes("current-day")) {
    dateClick(tar, handler, dateInfo);
    return;
  }
}

function dateClick(tar, handler) {
  if (target) {
    target.className = target.className.replace(" selected", "");
  }
  target = tar;
  tar.className += " selected";
  handler && handler(tar.dataset.date);
}

function controlClick(className, dateInfo) {
  switch (className) {
    case "control-button btn-year-lt":
      dateInfo.year -= 1;
      break;
    case "control-button btn-month-lt":
      dateInfo.month -= 1;
      break;
    case "control-button btn-month-rt":
      dateInfo.month += 1;
      break;
    case "control-button btn-year-rt":
      dateInfo.year += 1;
      break;
    default:
      break;
  }
}
