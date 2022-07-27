export function getCurrentMonth() {
  const dt = new Date();
  const year = dt.getFullYear();
  const month = dt.getMonth() + 1;

  return `${year}-${month >= 10 ? month : `0${month}`}`;
}

export function getNextMonth(dateString) {
  const currentYear = +dateString.split('-')[0];
  const currentMonth = +dateString.split('-')[1];

  if (currentMonth === 12) {
    const nextMonth = 1;
    return `${currentYear + 1}-0${nextMonth}`;
  } else {
    const nextMonth = currentMonth + 1;
    return `${currentYear}-${nextMonth >= 10 ? nextMonth : `0${nextMonth}`}`;
  }
}

export function getPrevMonth(dateString) {
  const currentYear = +dateString.split('-')[0];
  const currentMonth = +dateString.split('-')[1];

  if (currentMonth === 1) {
    const nextMonth = 12;
    return `${currentYear - 1}-${nextMonth}`;
  } else {
    const nextMonth = currentMonth - 1;
    return `${currentYear}-${nextMonth >= 10 ? nextMonth : `0${nextMonth}`}`;
  }
}
