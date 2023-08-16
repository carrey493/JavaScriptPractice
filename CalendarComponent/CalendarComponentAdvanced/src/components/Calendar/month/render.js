import { createMonthControlArea, createMonthNode } from "./creator";
import { createTable } from "../creator";

import "./index.scss";

export function render(container, year, month) {
  container.innerHTML = "";
  const oTable = createTable("my-month-calendar-table");
  const controlArea = createMonthControlArea(year);
  const monthNode = createMonthNode(month);

  monthNode.forEach((tr) => {
    oTable.appendChild(tr);
  });

  container.appendChild(controlArea);
  container.appendChild(oTable);
}

export function update(year) {
  const oYear = document.querySelector(".title-year");
  oYear.innerText = year;
}
