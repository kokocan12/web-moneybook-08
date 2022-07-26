import express from 'express';
import { MoneybookPaymentTypeController } from './paymentTypesController.js';

export const moneybookPaymentTypeRouter = express.Router();

moneybookPaymentTypeRouter.get('/', MoneybookPaymentTypeController.get);
