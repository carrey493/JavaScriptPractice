// 获取某年某月的第一天是星期几
export function getFirstWeekDay(year, month) {
  const date = new Date(year, month - 1, 1);
  return date.getDay();
}
// console.log(getFirstWeekDay(2023, 6)); //4

// 获取某个月有多少天
export function getMonthDayCount(year, month) {
  const date = new Date(year, month, 0);
  return date.getDate();
}
// console.log(getMonthDayCount(2023, 6)); //30

// 获取上一个月在本月日历上有几天
export function getLastMonthRestDays(year, month) {
  const days = getFirstWeekDay(year, month);
  let lastDate = getMonthDayCount(year, month - 1);
  const restDays = [];

  while (restDays.length < days) {
    restDays.push(lastDate--);
  }
  return restDays.reverse();
}
// console.log(getLastMonthRestDays(2023, 6)); //[ 28, 29, 30, 31 ]

// 获取下一个月在本月日历上有几天
export function getNextMonthRestDays(year, month) {
  const lastMonthRestDaysCount = getFirstWeekDay(year, month);
  const currentMonthDayCount = getMonthDayCount(year, month);
  const nextMonthRestDayCount =
    42 - (lastMonthRestDaysCount + currentMonthDayCount);
  let restDays = [];

  for (let i = 1; i <= nextMonthRestDayCount; i++) {
    restDays.push(i);
  }

  return restDays;
}

// console.log(getNextMonthRestDays(2023, 6)); //[1, 2, 3, 4,5, 6, 7, 8]

// 格式化日期
export function getFormatDate(yeay, month, date) {
  const dateArr = [yeay, month, date];

  for (let i = 1; i < dateArr.length; i++) {
    dateArr[i] < 10 && (dateArr[i] = "0" + dateArr[i]);
  }

  return dateArr.join("-");
}
// console.log(getFormatDate(2023, 6, 5)); //2023-06-05
