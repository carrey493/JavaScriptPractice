import MyCalendar from "./components/Calendar"; //引入组件模块

(() => {
  const myCalendar = MyCalendar(handler);

  //获取渲染对象
  const oApp = document.getElementById("app");
  const oYear = document.querySelector(".year");
  const oMonth = document.querySelector(".month");
  const oYearSpan = oYear.querySelector("span");
  const oMonthSpan = oMonth.querySelector("span");

  //获取日期信息
  const dateInfo = myCalendar.getDateInfo();

  //初始化函数
  const init = () => {
    render(...dateInfo);
    // /* bindEvent(); */
  };

  function bindEvent() {
    oYear.addEventListener("click", setYear, false);
    oMonth.addEventListener("click", setMonth, false);
  }

  function setYear(e) {
    const tar = e.target;
    const className = tar.className;
    const currentYear = Number(oYearSpan.innerText);

    if (className === "lt" || className === "gt") {
      switch (className) {
        case "lt":
          dateInfo[0] = currentYear - 1;
          break;
        case "gt":
          dateInfo[0] = currentYear + 1;
          break;
        default:
          break;
      }
    }

    oYearSpan.innerText = dateInfo[0];
    myCalendar.update(...dateInfo);
  }

  function setMonth(e) {
    const tar = e.target;
    const className = tar.className;
    const currentMonth = Number(oMonthSpan.innerText);

    if (className === "lt" || className === "gt") {
      switch (className) {
        case "lt":
          dateInfo[1] = currentMonth - 1;
          break;
        case "gt":
          dateInfo[1] = currentMonth + 1;
          break;
        default:
          break;
      }
    }

    oMonthSpan.innerText = dateInfo[1];
    myCalendar.update(...dateInfo);
  }

  function handler(date) {
    console.log(date);
  }

  //渲染函数
  function render(...args) {
    oApp.appendChild(myCalendar.render(...args));
  }

  init();
})();
