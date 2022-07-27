import { MoneybookCategoryService } from '../categories/categoriesService.js';
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
        date between '${BEGIN_DATE}' and '${END_DATE}'
    `;
    const [rows, fields] = await connection.query(sql);

    return rows;
  },
  /**
   *  @param {import("mysql2/promise").Connection} connection
   *  @param {{amount : number;title : string;category : number;date : string;payment_type : number|null;}} data
   *
   *  @return {Promise<any>}
   */
  create: async (connection, { amount, category, date, paymentType, title }) => {
    if (!date) throw '일자를 입력해주세요.';
    else if (!category) throw '분류를 선택해주세요.';
    else if (!title) throw '내용을 입력해주세요.';
    else if (amount === undefined) throw '금액을 입력해주세요.';

    const [categoryInfo] = await MoneybookCategoryService.get(connection, category);
    const isIncomeHistory = categoryInfo.type === 'I';

    if (!isIncomeHistory && !paymentType) throw '결제수단을 선택해주세요.';

    let sql = '';
    // Case1 : Income
    if (isIncomeHistory) {
      sql = `
        INSERT INTO
          moneybook_history(amount, title, category, date)
        VALUES (${Math.abs(amount)}, "${title}", ${category}, "${date}")
      `;
    }
    // Case2 : Expenditure
    else {
      sql = `
        INSERT INTO
          moneybook_history(amount, title, category, date, payment_type)
        VALUES (${-1 * Math.abs(amount)}, "${title}", ${category}, "${date}", ${paymentType})
      `;
    }

    const [result] = await connection.query(sql);
    return result.insertId;
  },
  /**
   *  @param {import("mysql2/promise").Connection} connection
   *  @param {{id : string;amount : number;title : string;category : number;date : string;payment_type : number|null;}} data
   *
   *  @return {Promise<any>}
   */
  update: async (connection, { id, amount, category, date, payment_type, title }) => {
    if (!id) throw Error('내역을 선택해주세요');

    const sql = `
      UPDATE
        moneybook_history
      SET
        ${amount ? `amount = ${amount},` : ''}
        ${category ? `category = ${category},` : ''}
        ${date ? `date = "${date}",` : ''}
        ${payment_type ? `payment_type = ${payment_type},` : ''}
        ${title ? `title = "${title}",` : ''}
        id = ${id}
      WHERE
        id = ${id}
    `;

    const [result] = await connection.query(sql);

    return result;
  },
  /**
   *  @param {import("mysql2/promise").Connection} connection
   *  @param {number} id
   *
   *  @return {Promise<any>}
   */
  delete: async (connection, id) => {
    if (!id) throw Error('내역을 선택해주세요');

    const sql = `
      DELETE FROM
        moneybook_history
      WHERE
        id = ${id}
    `;

    const [result] = await connection.query(sql);

    return result;
  },
};
