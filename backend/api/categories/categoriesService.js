import { getFormattedDate, getLastSixMonth } from '../../utils/date.js';

export const MoneybookCategoryService = {
  get: async (connection, id) => {
    const sql = `
        SELECT 
            id, name_en, name_ko, type
        FROM 
            moneybook_category
        ${!id ? '' : `WHERE id = ${id}`}
      `;

    const [rows] = await connection.query(sql);

    return rows;
  },
  getCategoriesMonth: async (connection, date) => {
    const { beginDate, endDate } = getFormattedDate(date);

    const sql = `
        SELECT 
            CAST(SUM(amount) as SIGNED) as total, category.name as 'category'
        FROM
        (
        SELECT  
          ABS(amount) as amount, category
        FROM 
          moneybook_history 
        WHERE 
          amount < 0 
          AND '${beginDate}' <= date
          AND date < '${endDate}'
        ) AS ac
        LEFT JOIN (SELECT id, name_en AS name FROM moneybook_category) AS category 
				ON category.id = ac.category
        GROUP BY category
        ORDER BY total DESC
    `;

    const [rows] = await connection.query(sql);

    const categories = await MoneybookCategoryService.get(connection);
    const categoryMap = categories.reduce((acc, curr) => {
      acc[curr.name_en] = false;
      return acc;
    }, {});

    // get total
    let total = 0;
    for (let i = 0; i < rows.length; i++) {
      total += rows[i].total;
    }

    // set percentage.
    let percentageTotal = 0;
    for (let i = 0; i < rows.length; i++) {
      rows[i].percent = +(rows[i].total / total).toFixed(2);
      percentageTotal += rows[i].percent;
      categoryMap[rows[i].category] = true;
    }

    // adjust percentage total diff
    const offset = 1 - percentageTotal;
    if (percentageTotal > 0) {
      rows[0].percent += offset;
    }

    Object.entries(categoryMap)
      .filter(([key, val]) => !val)
      .forEach(([key]) => {
        rows.push({ category: key, percent: 0, total: 0 });
      });

    return rows;
  },
  getLastSixMonthExpenditure: async connection => {
    const categories = await MoneybookCategoryService.get(connection);
    const categoryMap = categories.reduce((acc, curr) => {
      acc[curr.name_en] = [];
      return acc;
    }, {});

    const lastSixMonths = getLastSixMonth().map(item => ({ date: item, ...getFormattedDate(item) }));

    const beginDate = lastSixMonths[lastSixMonths.length - 1].beginDate;
    const endDate = lastSixMonths[0].endDate;

    const sql = `
    SELECT SUM(amount) as total, category, date
    FROM
    (
    SELECT 
      ABS(amount) as amount, category.name as category, DATE_FORMAT(date, '%Y-%m') as date 
    FROM 
      moneybook_history 
    LEFT JOIN (SELECT id, name_en as name from moneybook_category) as category
    ON category.id = moneybook_history.category
    WHERE 
      amount < 0 AND
      date >= '${beginDate}' AND 
      date < '${endDate}'
    ) AS an
    GROUP BY category, date;
    `;

    const [rows] = await connection.query(sql);

    for (let i = 0; i < rows.length; i++) {
      const { total, category, date } = rows[i];

      categoryMap[category].push({ total, date });
    }

    return categoryMap;
  },
};
