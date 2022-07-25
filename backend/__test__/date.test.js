const getFormattedDate = require('../utils/date.js');

describe('날짜 포맷터 테스트 ', () => {
  test('시작 날짜(7월) 테스트 ', () => {
    const inputDate = '202207';
    const beginDate = '2022-07-01 00:00:00';
    expect(getFormattedDate(inputDate).beginDate).toBe(beginDate);
  }),
    test('종료 날짜(7월) 테스트 ', () => {
      const inputDate = '202207';
      const endDate = '2022-08-01 00:00:00';
      expect(getFormattedDate(inputDate).endDate).toBe(endDate);
    });
});
