import { MoneybookPaymentTypeService } from './paymentTypesService.js';

export const MoneybookPaymentTypeController = {
  get: async (req, res) => {
    const connection = res.locals.connection;

    try {
      const paymentTypes = await MoneybookPaymentTypeService.get(connection);

      res.send({ payload: paymentTypes });
    } catch (err) {
      res.status(400).send({ message: err.toString() });
      connection.rollback();
    }
    connection.release();
  },
  delete: async (req, res) => {
    const connection = res.locals.connection;
    const id = req.params.id;
    try {
      await MoneybookPaymentTypeService.delete(connection, id);

      connection.commit();
      res.send({ payload: 'success' });
    } catch (err) {
      res.status(400).send({ message: err.toString() });
      connection.rollback();
    }
    connection.release();
  },
  create: async (req, res) => {
    const connection = res.locals.connection;
    const { name } = req.body;
    try {
      const insertId = await MoneybookPaymentTypeService.create(connection, name);

      connection.commit();
      res.send({ payload: { id: insertId, name } });
    } catch (err) {
      res.status(400).send({ message: err.toString() });
      connection.rollback();
    }
    connection.release();
  },
};
