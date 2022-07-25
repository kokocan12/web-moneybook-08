import express from 'express';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';
import { moneybookHistoryRouter } from './api/histories/historiesRouter.js';
import { dbConnectionMiddleware } from './middleware/dbConnection.js';
const app = express();
const PORT = process.env.PORT || 4000;
const handleListening = () => {
  console.log(`server listening on http://localhost:${PORT}`);
};
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

app.use(dbConnectionMiddleware);
app.use('/api/moneybook', moneybookHistoryRouter);
app.get('*', (req, res) => res.sendFile(`${process.cwd()}/dist/index.html`));

app.listen(PORT, handleListening);
