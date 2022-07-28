import { MoneybookCategoryService } from './categoriesService.js';

export const MoneybookCategoryController = {
  get: async (req, res) => {
    const connection = res.locals.connection;

    try {
      const categories = await MoneybookCategoryService.get(connection);

      res.send({ payload: categories });
    } catch (err) {
      res.status(400).send({ message: err.toString() });
      connection.rollback();
    }
    connection.release();
  },
  getStatistics: async (req, res) => {
    const connection = res.locals.connection;
    try {
      const date = req.params.date;
      const categoriesMonth = await MoneybookCategoryService.getCategoriesMonth(connection, date);
      const lastSixMonthExpenditure = await MoneybookCategoryService.getLastSixMonthExpenditure(connection);

      res.send({ payload: { categoriesMonth, lastSixMonthExpenditure } });
    } catch (err) {
      res.status(400).send({ message: err.toString() });
      connection.rollback();
    }

    connection.release();
  },
};
