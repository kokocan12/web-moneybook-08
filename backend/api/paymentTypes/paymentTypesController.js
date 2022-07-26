import { MoneybookPaymentTypeService } from './paymentTypesService.js';

export const MoneybookPaymentTypeController = {
  get: async (req, res) => {
    const connection = res.locals.connection;

    try {
      const paymentTypes = await MoneybookPaymentTypeService.get(connection);

      res.send({ payload: paymentTypes });
    } catch (err) {
      res.send({ message: err.toString() });
      connection.rollback();
    }
    connection.release();
  },
};
