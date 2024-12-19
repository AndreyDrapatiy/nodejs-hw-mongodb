import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import routes from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);
app.use('/api-docs', swaggerDocs());

app.use(routes);

app.use('*', notFoundHandler);

app.use(errorHandler);

export default app;
