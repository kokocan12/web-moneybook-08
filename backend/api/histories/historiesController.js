import { MoneybookHistoryService } from './historiesService.js';

export const MoneybookHistoryController = {
  create: (req, res) => {},
  update: (req, res) => {},
  delete: (req, res) => {},
  get: async (req, res) => {
    const connection = res.locals.connection;
    const { date } = req.params;

    try {
      const histories = await MoneybookHistoryService.get(connection, date);

      res.send({ histories });
    } catch (err) {
      res.send({ message: err.toString() });
      connection.rollback();
    }
    connection.release();
  },
};
