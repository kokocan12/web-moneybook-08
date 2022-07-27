import { MoneybookHistoryService } from './historiesService.js';

export const MoneybookHistoryController = {
  create: async (req, res) => {
    const connection = res.locals.connection;

    const { amount, title, category, date, paymentType } = req.body;

    try {
      const insertedHistoryId = await MoneybookHistoryService.create(connection, {
        amount,
        title,
        category,
        date,
        paymentType,
      });

      connection.commit();
      res.send({ history: { id: insertedHistoryId, amount, title, category, date, paymentType } });
    } catch (err) {
      res.status(400).send({ message: err.toString() });
      connection.rollback();
    }

    connection.release();
  },
  update: async (req, res) => {
    const connection = res.locals.connection;

    const id = req.params.id;
    const { amount, title, category, date, payment_type } = req.body;

    try {
      await MoneybookHistoryService.update(connection, { id, amount, category, date, payment_type, title });

      connection.commit();
      res.send({ history: { id } });
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
      await MoneybookHistoryService.delete(connection, id);

      connection.commit();
      res.send({ history: { id } });
    } catch (err) {
      res.status(400).send({ message: err.toString() });
      connection.rollback();
    }
    connection.release();
  },
  get: async (req, res) => {
    const connection = res.locals.connection;
    const { date } = req.params;

    try {
      const histories = await MoneybookHistoryService.get(connection, date);
      res.status(200).send({ payload: histories });
    } catch (err) {
      res.status(400).send({ message: err.toString() });
      connection.rollback();
    }
    connection.release();
  },
};
