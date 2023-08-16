import {
  createWeekDaysNode,
  createDateNode,
  createControlArea,
} from "./creator";

export function render(container) {
  const oTable = document.createElement("table");

  const oTHead = document.createElement("thead");

  const oTBody = document.createElement("tbody");

  const weekDayNode = createWeekDaysNode();

  oTable.className = "my-calendar-table";
  oTBody.className = "my-calendar-body";

  return function (year, month) {
    const dateTrs = createDateNode(year, month);
    const controlArea = createControlArea(year, month);

    oTHead.appendChild(weekDayNode);

    dateTrs.forEach((tr) => {
      oTBody.appendChild(tr);
    });

    oTable.appendChild(oTHead);
    oTable.appendChild(oTBody);
    container.appendChild(controlArea);
    container.appendChild(oTable);

    return container;
  };
}

export function update(year, month) {
  const oTBody = document.querySelector(".my-calendar-body");
  const oTitleYear = document.querySelector(".title-year");
  const oTitleMonth = document.querySelector(".title-month");
  const dateTrs = createDateNode(year, month);
  oTBody.innerHTML = "";
  oTitleYear.innerText = year;
  oTitleMonth.innerText = month;

  dateTrs.forEach((tr) => {
    oTBody.appendChild(tr);
  });
}
