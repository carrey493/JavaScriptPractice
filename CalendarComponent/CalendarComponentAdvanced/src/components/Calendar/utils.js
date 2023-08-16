export function createTrs(count) {
  const trArr = [];
  for (let i = 0; i < count; i++) {
    const oTr = document.createElement("tr");
    trArr.push(oTr);
  }

  return trArr;
}

// 根据时间戳获取日期
export function getDateInfo(timeStamp) {
  let date = timeStamp ? new DataTransfer(timeStamp) : new Date();

  return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
}
