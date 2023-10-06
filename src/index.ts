import { app } from './app';
import http from 'http';
import * as config from './utils/config';
import logger from './utils/logger';

const server = http.createServer(app);

// Port uses 8000 as set in .env
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
