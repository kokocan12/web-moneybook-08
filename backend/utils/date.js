export const getFormattedDate = date => {
  const year = new Date(date.substr(0, 4)).getFullYear();
  const month = new Date(date.substr(4)).getMonth() + 1;

  const nextMonth = month + 1;

  const getFormat = (year, month) => `${year}-${('00' + month.toString()).slice(-2)}-01 00:00:00`;
  const beginDate = getFormat(year, month);
  const endDate = getFormat(year, nextMonth);
  return { beginDate, endDate };
};

//module.exports = getFormattedDate;
