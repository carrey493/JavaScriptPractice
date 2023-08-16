import MyCalendar from "./components/Calendar"; //引入组件模块

(() => {
  MyCalendar("#app", (date) => {
    console.log(date);
  });
})();
