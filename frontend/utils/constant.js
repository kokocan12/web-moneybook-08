export const ROUTES = {
  MAIN: '/',
  CALENDAR: '/calendar',
  STATISTICS: '/statistics',
};

export const CATEGORY_TYPE = {
  SHOPPING: 'shopping',
  HEALTH: 'health',
  TRAFFIC: 'traffic',
  FOOD: 'food',
  CULTURE: 'culture',
  LIFE: 'life',
  SALARY: 'salary',
  ALLOWANCE: 'allowance',
  ETC: 'etc',
  UNDEFINED: 'undefined',
};
export const CATEGORY_TYPE_KOREAN = {
  [CATEGORY_TYPE.SHOPPING]: '쇼핑/뷰티',
  [CATEGORY_TYPE.HEALTH]: '의료/건강',
  [CATEGORY_TYPE.TRAFFIC]: '교통',
  [CATEGORY_TYPE.FOOD]: '식비',
  [CATEGORY_TYPE.CULTURE]: '문화/여가',
  [CATEGORY_TYPE.LIFE]: '생활',
  [CATEGORY_TYPE.SALARY]: '월급',
  [CATEGORY_TYPE.ALLOWANCE]: '용돈',
  [CATEGORY_TYPE.ETC]: '기타수입',
  [CATEGORY_TYPE.UNDEFINED]: '미분류',
};
export const CATEGORY_COLOR_TYPE = {
  [CATEGORY_TYPE.SHOPPING]: '#4cb8b8',
  [CATEGORY_TYPE.HEALTH]: '#6ed5eb',
  [CATEGORY_TYPE.TRAFFIC]: '#94d3cc',
  [CATEGORY_TYPE.FOOD]: '#4ca1de',
  [CATEGORY_TYPE.CULTURE]: '#d092e2',
  [CATEGORY_TYPE.LIFE]: '#4a6cc3',
  [CATEGORY_TYPE.SALARY]: '#b9d58c',
  [CATEGORY_TYPE.ALLOWANCE]: '#e6d267',
  [CATEGORY_TYPE.ETC]: '#e2b765',
  [CATEGORY_TYPE.UNDEFINED]: '#817dce',
};

export const DAY_TYPE = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};
export const DAY_KOREAN = {
  [DAY_TYPE.SUNDAY]: '일',
  [DAY_TYPE.MONDAY]: '월',
  [DAY_TYPE.TUESDAY]: '화',
  [DAY_TYPE.WEDNESDAY]: '수',
  [DAY_TYPE.THURSDAY]: '목',
  [DAY_TYPE.FRIDAY]: '금',
  [DAY_TYPE.SATURDAY]: '토',
};
