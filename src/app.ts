import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { caseRouter } from './routes/case-router';
import { clientRouter } from './routes/client-router';
import logger from './utils/logger';

export const app = express();
app.use(cors());

app.use(express.json());

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`Received request for ${req.url}`);

  next();
};

app.use('/', loggerMiddleware);

app.use('/api/case', caseRouter);
app.use('/api/client', clientRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ err: 'Endpoint not found.' });
});
