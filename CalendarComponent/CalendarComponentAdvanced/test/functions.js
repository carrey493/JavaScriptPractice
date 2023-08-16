module.exports = {
  createDecadeYears(year) {
    const str = year.toString().slice(0, 3);
    const yearArr = [];

    for (let i = -0; i < 10; i++) {
      yearArr.push(Number(str + i));
    }

    return yearArr;
  },

  getStartEndYear(year) {
    const str = year.toString().slice(0, 3);
    return [Number(str + "0"), Number(str + "9")];
  },
};
