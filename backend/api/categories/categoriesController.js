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
};
