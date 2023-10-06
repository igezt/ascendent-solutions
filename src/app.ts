import express from 'express';
import cors from 'cors';
import { caseRouter } from './routes/case-router';
import { clientRouter } from './routes/client-router';

export const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/case', caseRouter);
app.use('/api/client', clientRouter);
