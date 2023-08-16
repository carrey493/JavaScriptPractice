import {
  createWeekDaysNode,
  createDateNode,
  createControlArea,
} from "./creator";

import { createTable } from "../creator";

import "./index.scss";

export function render(container, year, month) {
  container.innerHTML = "";

  // const oTable = document.createElement("table");
  const oTable = createTable("my-calendar-table");

  const oTHead = document.createElement("thead");

  const oTBody = document.createElement("tbody");

  const weekDayNode = createWeekDaysNode();

  // oTable.className = "my-calendar-table";
  oTBody.className = "my-calendar-body";

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
