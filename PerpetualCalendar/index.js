(function () {
  let calendar = {
    curDate: new Date(), // 当前日期对象
    holidays: [
      "假期安排",
      "元旦",
      "除夕",
      "春节",
      "清明节",
      "劳动节",
      "端午节",
      "中秋节",
      "国庆节",
    ],
    init() {
      this.renderSelect(this.curDate);
      this.getData(this.curDate);
    },
    renderSelect(d) {
      // 获取dom
      let yearList = document.querySelector(".yearSelect .selectedBox ul");
      let monthList = document.querySelector(
        ".monthSelect .select .selectedBox ul"
      );
      let holidayList = document.querySelector(
        ".holidaySelect .selectedBox ul"
      );

      let yearSelected = document.querySelector(".yearSelect .selected span");
      let monthSelected = document.querySelector(".monthSelect .selected span");
      let holidaySelected = document.querySelector(
        ".holidaySelect .selected span"
      );

      // 生成年份
      let li = "";
      yearList.innerHTML = "";
      for (let i = 1900; i <= 2050; i++) {
        li += `<li ${
          i === d.getFullYear() ? 'class="active"' : ""
        }>${i}年</li>`;
      }
      yearList.innerHTML = li;
      yearSelected.innerHTML = d.getFullYear() + "年";

      // 生成月份
      li = "";
      monthList.innerHTML = "";
      for (let i = 1; i <= 12; i++) {
        li += `<li ${
          i === d.getMonth() + 1 ? 'class="active"' : ""
        }>${i}月</li>`;
      }
      monthList.innerHTML = li;
      monthSelected.innerHTML = d.getMonth() + 1 + "月";

      // 生成节日
      li = "";
      holidayList.innerHTML = "";
      for (let i = 0; i <= this.holidays.length; i++) {
        li += `<li ${i === 0 ? 'class="active"' : ""}>${this.holidays[i]}</li>`;
      }
      holidayList.innerHTML = li;
      holidaySelected.innerHTML = this.holidays[0];

      this.selectBindEvent();
    },
    // 关闭下拉框方法
    closeSelect() {
      let selects = [...document.querySelectorAll(".select")]; // NodeList类数组
      let open = selects.find((select) => select.classList.contains("active"));
      open && open.classList.remove("active");
    },
    //日期下拉框添加事件
    selectBindEvent() {
      let selects = document.querySelectorAll(".select");

      selects.forEach((select, index) => {
        let cl = select.classList;
        let selected = select.querySelector("span"); // 当前下拉框选中的值

        let _this = this;
        select.onclick = function (ev) {
          if (cl.contains("active")) {
            // 点击自己
            cl.remove("active");
          } else {
            // 点击别人
            _this.closeSelect();
            cl.add("active");
            _this.scrollBar();
          }

          if (ev.target.tagName !== "LI") {
            // 说明现在点击的不是列表
            return;
          }

          // 说明现在点击的是li
          let lis = [...select.querySelectorAll("ul li")]; // NodeList类数组
          lis
            .find((li) => li.classList.contains("active"))
            .classList.remove("active");
          ev.target.classList.add("active");

          //根据索引区分点击的是谁
          switch (index) {
            case 0:
              // 年
              _this.curDate.setFullYear(parseInt(ev.target.innerHTML));
              selected.innerHTML = ev.target.innerHTML;
              break;
            case 1:
              // 月
              _this.curDate.setMonth(parseInt(ev.target.innerHTML) - 1);

              selected.innerHTML = ev.target.innerHTML;
              break;
            case 2:
              // 假期
              selected.innerHTML = ev.target.innerHTML;
              break;
            default:
              break;
          }
          _this.getData(_this.curDate);
        };
      });

      this.monthChange();
      this.backToday();
    },
    //滚动条
    scrollBar() {
      let scrollWrap = document.querySelector(".yearSelect .selectedBox");
      let content = document.querySelector(".yearSelect .selectedBox ul");
      let barWrap = document.querySelector(".yearSelect .selectedBox .scroll");
      let bar = document.querySelector(".yearSelect .selectedBox span");

      // 初始化
      bar.style.transform = content.style.transform = "translateY(0)";

      // 设置滑块高度
      let multiple = (content.offsetHeight + 18) / scrollWrap.offsetHeight; //内容是内容父级的几倍
      multiple = multiple > 20 ? 20 : multiple;
      bar.style.height = scrollWrap.offsetHeight / multiple + "px"; //根据倍数算出坏块的高度(相反的关系)

      // 滑块拖拽
      let scrollTop = 0; //滑动条走的距离
      let maxHeight = barWrap.offsetHeight - bar.offsetHeight; //滑块能走的最大距离

      let scroll = function () {
        if (scrollTop < 0) scrollTop = 0;
        if (scrollTop > maxHeight) scrollTop = maxHeight;
        let scaleY = scrollTop / maxHeight; //滚动条的比例
        bar.style.transform = "translateY(" + scrollTop + "px)";
        content.style.transform =
          "translateY(" +
          (scrollWrap.offsetHeight - content.offsetHeight - 18) * scaleY +
          "px)";
      };

      bar.onmousedown = function (ev) {
        let startY = ev.clientY; // 按下时鼠标的坐标
        let startT = parseInt(this.style.transform.split("(")[1]); // 按下时元素移动的距离
        bar.style.transition = content.style.transition = null;
        document.onmousemove = (ev) => {
          scrollTop = ev.clientY - startY + startT; //滚动条移动的位置
          scroll();
          ev.preventDefault(); //阻止浏览器默认行为
        };
        document.onmouseup = () => {
          document.onmousemove = null;
        };
      };

      scrollWrap.onwheel = (ev) => {
        ev.deltaY > 0 ? (scrollTop += 10) : (scrollTop -= 10);
        bar.style.transition = content.style.transition = "0.2s";
        scroll();
      };

      barWrap.onclick = (ev) => ev.stopPropagation();
    },
    getData(d) {
      $.ajax({
        url: `https://www.rili.com.cn/rili/json/pc_wnl/${d.getFullYear()}/${
          d.getMonth() + 1
        }.js`,
        dataType: "jsonp",
      });
      let _this = this;
      window.jsonrun_PcWnl = function (res) {
        _this.renderData(d, res.data); // 渲染日期
        _this.renderLunar(
          res.data.find(
            (item) =>
              item.nian === d.getFullYear() &&
              item.yue === d.getMonth() + 1 &&
              item.ri === d.getDate()
          )
        );
      };
    },
    getEndDay: (year, month) => new Date(year, month, 0).getDate(), //获取到某个月的最后一天
    getFirstWeek: (year, month) => new Date(year, month - 1, 1).getDay(), //获取到某个月的第一天是周几，月份是几月就传几月
    delTag: (str) => str.replace(/<\/?.+?\/?>/g, ""), //删除标签
    repair: (v) => {
      return v < 10 ? "0" + v : v;
    },
    renderData(d, data) {
      let tbody = document.querySelector(".dateWrap tbody");

      let lastEndDay = this.getEndDay(d.getFullYear(), d.getMonth()); // 上个月最后一天

      let curEndDay = this.getEndDay(d.getFullYear(), d.getMonth() + 1); // 当前月最后一天

      let week = this.getFirstWeek(d.getFullYear(), d.getMonth() + 1); // 当前月第一天是周几

      let cn = -1; // 记录42次循环走的每一次
      let lastDateNum = week - 1;
      lastDateNum = week === 0 ? 6 : lastDateNum; // 如果当前月第一天为周日，那week的值就为0，这时候就给上个月留6个格子。
      let prevStartDate = lastEndDay - lastDateNum; // 上个月的起始日期
      let nextStartDate = 1; // 下个月起始日期
      let curStartDate = 1; // 当前月起始日期

      let calendar = document.querySelector("#calendar");
      calendar.classList.remove("active");

      tbody.innerHTML = "";

      for (let i = 0; i < 6; i++) {
        // 循环tr
        let tr = document.createElement("tr");
        let td = "";
        for (let j = 0; j < 7; j++) {
          // 循环td
          // td += "<td></td>";
          cn++;
          let festival = data[cn].jie ? this.delTag(data[cn].jie) : data[cn].r2; // 节假日
          let weekday = data[cn].jia === 90 ? "weekday" : ""; // 假
          let holiday = data[cn].jia > 90 ? "holiday" : ""; //休
          if (cn < lastDateNum) {
            //上个月
            td += `<td>
              <div class="prevMonth ${weekday + " " + holiday}">
              <span>${++prevStartDate}</span>
              <span>${festival}</span>
              </div>
            </td>`;
          } else if (cn >= lastDateNum + curEndDay) {
            //下个月
            td += `<td>
            <div class="nextMonth ${weekday + " " + holiday}">
            <span>${nextStartDate++}</span>
            <span>${festival}</span>
            </div>
          </td>`;
          } else {
            // 当前月
            let cl = "";
            if (curStartDate === d.getDate()) {
              // 格子里的数值与当前日期对象数据作对比
              cl = "active";
            }
            if (
              new Date().getFullYear() === d.getFullYear() &&
              new Date().getMonth() === d.getMonth() &&
              new Date().getDate() === d.getDate() &&
              new Date().getDate() === curStartDate &&
              d.getDate() === curStartDate
            ) {
              cl += " today";
            }
            td += `<td>
            <div class="curMonth ${cl + weekday + " " + holiday}">
            <span>${curStartDate++}</span>
            <span>${festival}</span>
            </div>
          </td>`;

            if (cl.indexOf("active") !== -1 && holiday === "holiday") {
              // 这个条件是表示节假日
              let curDay = this.delTag(data[cn].jie); // 循环到这个td是否是节日
              this.holidays.includes(curDay) &&
                calendar.classList.add("active");
            }
          }
          tr.innerHTML = td;
        }
        tbody.appendChild(tr);
      }
      this.dateBindEvent(data);
    },
    monthChange() {
      let arrows = document.querySelectorAll(".arrow");

      //上个月
      arrows[0].onclick = () => {
        this.curDate.setMonth(this.curDate.getMonth() - 1); // 月份减1
        this.renderSelect(this.curDate);
        this.getData(this.curDate);
        this.closeSelect();
      };

      //下个月
      arrows[1].onclick = () => {
        this.curDate.setMonth(this.curDate.getMonth() + 1); // 月份加1
        this.renderSelect(this.curDate);
        this.getData(this.curDate);
        this.closeSelect();
      };
    },
    backToday() {
      let returnBtn = document.getElementById("returnToday");
      returnBtn.onclick = () => {
        this.curDate = new Date();
        this.renderSelect(this.curDate);
        this.getData(this.curDate);
      };
    },
    dateBindEvent(data) {
      let boxs = [...document.querySelectorAll(".dateWrap tbody tr td div")];
      let last = boxs.find((box) => box.classList.contains("active"));
      let curYear = this.curDate.getFullYear();
      let curMonth = this.curDate.getMonth();
      boxs.forEach(
        (box, index) =>
          (box.onclick = () => {
            let date = box.children[0].innerHTML; //点击的日期
            let cl = box.classList;
            last && last.classList.remove("active");
            cl.add("active");
            last = box;
            this.closeSelect(); // 隐藏下拉框
            if (cl.contains("prevMonth")) {
              // 点击的是上个月
              this.curDate = new Date(curYear, curMonth - 1, date);
              this.renderSelect(this.curDate);
              this.getData(this.curDate);
            } else if (cl.contains("nextMonth")) {
              // 点击的是下个月
              this.curDate = new Date(curYear, curMonth + 1, date);
              this.renderSelect(this.curDate);
              this.getData(this.curDate);
            } else {
              // 渲染农历
              let calendar = document.querySelector("#calendar");
              let curDay = box.children[1].innerHTML;
              calendar.className = this.holidays.includes(curDay)
                ? "active"
                : "";
              console.log(data[index]);
              this.renderLunar(data[index]);
            }
          })
      );
    },
    renderLunar(data) {
      console.log(data, data.nain);
      let date = document.querySelector(".right .date");
      let day = document.querySelector(".right .day");
      let ps = document.querySelectorAll(".right .lunar p");
      let holidayLyst = document.querySelector(".right .holidayLyst");
      date.innerHTML =
        data.nian +
        "-" +
        this.repair(parseInt(data.yue)) +
        "-" +
        this.repair(parseInt(data.ri));
      day.innerHTML = data.ri;
      ps[0].innerHTML = data.n_yueri;
      ps[1].innerHTML = data.gz_nian + "年 " + data.shengxiao;
      ps[2].innerHTML = data.gz_yue + "月 " + data.gz_ri;

      // 节日
      let holidays = this.delTag(data.jieri).split(",");
      holidays = holidays.length > 2 ? holidays.slice(0, 2) : holidays;
      holidayLyst.innerHTML = "";
      holidays.forEach((h) => {
        holidayLyst.innerHTML += `<li>${h}</li>`;
      });

      let defaultDl = document.querySelectorAll(".suit .default dl");
      let hoverDl = document.querySelectorAll(".suit .hover dl");
      defaultDl[0].innerHTML = "<dt>宜</dt>";
      data.yi.forEach((y) => {
        defaultDl[0].innerHTML += `<dd>${y}</dd>`;
      });
      defaultDl[1].innerHTML = "<dt>忌</dt>";
      data.ji.forEach((y) => {
        defaultDl[1].innerHTML += `<dd>${y}</dd>`;
      });
      let str1 = "";
      data.yi.forEach((y) => {
        str1 += `${y}、`;
      });
      hoverDl[0].innerHTML = "<dt>宜</dt>" + str1;
      let str2 = "";
      data.ji.forEach((y) => {
        str2 += `${y}、`;
      });
      hoverDl[1].innerHTML = "<dt>忌</dt>" + str2;
    },
  };
  calendar.init();
})();
