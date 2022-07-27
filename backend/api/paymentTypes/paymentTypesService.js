export const MoneybookPaymentTypeService = {
  get: async connection => {
    const sql = `
    SELECT 
        id, name
    FROM 
        moneybook_payment_type
    `;
    const [rows, fields] = await connection.query(sql);

    return rows;
  },
  /**
   * @param {string} name
   * @returns {Promise<number>}
   */
  create: async (connection, name) => {
    if (!name) throw '결제수단을 입력해주세요.';

    const sql = `
    INSERT INTO 
        moneybook_payment_type(name)
    VALUES
        ("${name}")
    `;
    const [result] = await connection.query(sql);
    return result.insertId;
  },
  /**
   * @param {number} id
   */
  delete: async (connection, id) => {
    if (!id) throw Error('결제수단을 선택해주세요');

    const sql = `
      DELETE FROM
        moneybook_payment_type
      WHERE
        id = ${id}
    `;

    const [result] = await connection.query(sql);

    return result;
  },
};
