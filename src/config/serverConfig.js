import http from 'http';
import { connectMongo } from './configmongodb.js';
import { logger } from '../utils/logger.js';
import { Server as SocketServer } from 'socket.io';
import websockets from '../config/sockets.config.js';

export function setupServer(app, port) {
  const httpServer = http.createServer(app);
  const server = httpServer.listen(port, () => {
    connectMongo()
      .then(() => {
        logger.info('MONGODB CONNECTED');
      })
      .catch((error) => {
        logger.error('Error connecting to MongoDB:', error);
        throw 'Cannot connect to the database';
      });
    logger.info(`PORT: ${port}`);
  });
  server.on('error', (error) => logger.error(error));
  const io = new SocketServer(httpServer);
  websockets(io);
}
