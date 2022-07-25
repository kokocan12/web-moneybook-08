import { getFormattedDate } from '../../utils/date.js';

export const MoneybookHistoryService = {
  get: async (connection, date) => {
    const BEGIN_DATE = getFormattedDate(date).beginDate;
    const END_DATE = getFormattedDate(date).endDate;

    const sql = `
    SELECT 
        * 
    FROM 
        moneybook_history
    WHERE
        moneybook_history.amount < 0 
        AND
        date between '${BEGIN_DATE}' and '${END_DATE}'
    `;
    console.log(sql);
    const [rows, fields] = await connection.query(sql);

    return rows;
  },
};
