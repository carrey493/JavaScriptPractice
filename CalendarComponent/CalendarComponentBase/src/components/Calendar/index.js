import { getDateInfo } from "./utils";

import { render, update } from "./render";

import "./index.scss";
import event from "./event";
import reactive from "./reactive";

// 导出
export default (handler) => {
  //定义内容
  const oContainer = document.createElement("div");
  const dateInfo = reactive();
  oContainer.className = "my-calendar";

  event(oContainer, handler, dateInfo);

  return {
    render: render(oContainer), // 函数柯里化
    update,
    getDateInfo,
  };
};
