import 'dotenv/config';
import { connect } from 'mongoose';
import { logger } from '../utils/logger.js';
import config from './envconfig.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';

export const sessionConfig = session({
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@codercluster.foujega.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 60 * 30,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
});

export async function connectMongo() {
  try {
    await connect(config.mongoUrl);
    logger.info('PLUGGED TO MONGODB');
  } catch (e) {
    logger.error(e);
    throw 'NOT PLUGGED TO MONGODB';
  }
}
