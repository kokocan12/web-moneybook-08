import express from 'express';
import { MoneybookHistoryController } from './historiesController.js';

export const moneybookHistoryRouter = express.Router();

moneybookHistoryRouter.get('/:date', MoneybookHistoryController.get);
moneybookHistoryRouter.post('/', MoneybookHistoryController.create);
moneybookHistoryRouter.delete('/:id', MoneybookHistoryController.delete);
moneybookHistoryRouter.put('/:id', MoneybookHistoryController.update);
