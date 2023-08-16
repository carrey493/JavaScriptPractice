const domPool = {
  table: null,
};

export function createTable(className) {
  if (!domPool.table) {
    domPool.table = document.createElement("table");
  } else {
    domPool.table.innerHTML = "";
  }
  domPool.table.className = className;

  return domPool.table;
}
