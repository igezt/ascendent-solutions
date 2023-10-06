import express from 'express';
import caseRouter from './routes/case';

const app = express();

app.use('/api/case', caseRouter);

app.listen(8000);
