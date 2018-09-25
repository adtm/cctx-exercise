import { getFormattedDate } from "../date";

test("should return a formatted date value", () => {
  Date.now = jest.fn(() => 1487076708000);

  const expectedDate = new Date("2017-02-14T12:51:48.000Z");
  expect(getFormattedDate()).toEqual(expectedDate);
});
