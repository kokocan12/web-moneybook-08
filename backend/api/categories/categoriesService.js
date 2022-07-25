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
};
