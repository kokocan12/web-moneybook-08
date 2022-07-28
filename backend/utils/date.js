export const getFormattedDate = date => {
  const year = new Date(date.substr(0, 4)).getFullYear();
  const month = new Date(date.substr(4)).getMonth() + 1;

  const nextMonth = month + 1;

  const getFormat = (year, month) => `${year}-${('00' + month.toString()).slice(-2)}-01 00:00:00`;
  const beginDate = getFormat(year, month);
  const endDate = getFormat(year, nextMonth);
  return { beginDate, endDate };
};

export const getLastSixMonth = () => {
  const currentDate = new Date();

  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;

  const result = [];

  for (let i = 0; i < 6; i++) {
    result.push(`${year}${month >= 10 ? month : `0${month}`}`);
    if (month === 1) {
      month = 12;
      year -= 1;
    } else {
      month -= 1;
    }
  }

  return result;
};

//module.exports = getFormattedDate;
