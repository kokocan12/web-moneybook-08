import express from 'express';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';

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

app.get('*', (req, res) => res.sendFile(`${process.cwd()}/dist/index.html`));
app.listen(PORT, handleListening);
