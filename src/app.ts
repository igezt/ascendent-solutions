import express from 'express';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { caseRouter } from './routes/case-router';
import { clientRouter } from './routes/client-router';

export const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/case', caseRouter);
app.use('/api/client', clientRouter);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.ts'],
};

const specs = swaggerJsDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
