const { createDecadeYears, getStartEndYear } = require("./functions");

test("createDecadeYears", () => {
  expect(createDecadeYears(1994)).toStrictEqual([
    1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
  ]);
});

test("getStartEndYear", () => {
  expect(getStartEndYear(1994)).toStrictEqual([1990, 1999]);
});
