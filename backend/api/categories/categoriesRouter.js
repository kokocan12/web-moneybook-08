import express from 'express';
import { MoneybookCategoryController } from './categoriesController.js';

export const moneybookCategoryRouter = express.Router();

moneybookCategoryRouter.get('/', MoneybookCategoryController.get);
