import express from 'express';
import { MoneybookHistoryController } from './historiesController.js';

export const moneybookHistoryRouter = express.Router();

moneybookHistoryRouter.get('/:date', MoneybookHistoryController.get);
moneybookHistoryRouter.post('/', MoneybookHistoryController.create);
moneybookHistoryRouter.delete('/', MoneybookHistoryController.delete);
moneybookHistoryRouter.put('/', MoneybookHistoryController.update);
