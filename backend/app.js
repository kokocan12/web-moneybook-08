import express from 'express';
import path from 'path';
import cors from 'cors';
import { dbConnectionMiddleware } from './middleware/dbConnection.js';
import { moneybookHistoryRouter } from './api/histories/historiesRouter.js';
import { moneybookCategoryRouter } from './api/categories/categoriesRouter.js';
import { moneybookPaymentTypeRouter } from './api/paymentTypes/paymentTypesRouter.js';
const app = express();
const PORT = process.env.PORT || 4000;
const handleListening = () => {
  console.log(`server listening on http://localhost:${PORT}`);
};
const __dirname = path.resolve();

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(dbConnectionMiddleware);

app.use('/api/moneybook', moneybookHistoryRouter);
app.use('/api/categories', moneybookCategoryRouter);
app.use('/api/paymentTypes', moneybookPaymentTypeRouter);
app.get('*', (req, res) => res.sendFile(`${process.cwd()}/dist/index.html`));

app.listen(PORT, handleListening);
