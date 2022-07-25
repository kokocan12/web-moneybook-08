export const MoneybookHistoryService = {
  get: async (connection, date) => {
    const BEGIN_DATE = date + '-01 00:00:00';
    const END_DATE = date + '-30 23:59:59';

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
