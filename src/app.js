// IMPORTS
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import exphbs from 'express-handlebars';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { sessionConfig } from './config/configmongodb.js';
import config from './config/envconfig.js';
import './config/passport.config.js';
import initPassport from './config/passport.config.js';
import { __dirname } from './configPath.js';
import specs from './config/swaggerConfig.js';
import { setupServer } from '../src/config/serverConfig.js';
import serveFavicon from 'serve-favicon';

// ROUTES IMPORT

import errorHandler from './middleware/error.js';
import cartsRouter from './routes/carts.routes.js';
import chatRouter from './routes/chat.routes.js';
import messageandmailRouter from './routes/messageandmail.routes.js';
import mockRouter from './routes/mock.routes.js';
import productsRouter from './routes/products.routes.js';
import sessionsRouter from './routes/sessions.routes.js';
import tokensRouter from './routes/tokens.routes.js';
import usersRouter from './routes/users.routes.js';
import viewsRouter from './routes/view.routes.js';

// EXPRESS 
const app = express();
const port = config.port;
// SWAGGER
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
// CORS
  const corsOptions = {
  origin: 'http://localhost:8080',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions)); 
// MIDDLEWARES
app.use(serveFavicon('favicon.ico'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// HANDLEBARS
const hbs = exphbs.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});
app.engine('handlebars', hbs.engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// SERVER
setupServer(app, port);

// SESSION
app.use(cookieParser('mySecret'));
app.use(sessionConfig);

// PASSPORT
initPassport();
app.use(passport.initialize());
app.use(passport.session());

// TEMPLATES
app.use('/', viewsRouter);
app.use('/realtimeproducts', viewsRouter);
app.use('/products', viewsRouter);
app.use('/chat', chatRouter);
app.use('/carts', cartsRouter);
app.use('/auth/profile', sessionsRouter);
app.use('/', productsRouter);
app.use('/', messageandmailRouter);
app.use('/', mockRouter);
app.use('/tokens', tokensRouter);

// API ENDPOINTS
app.use('/api/messageandmails', messageandmailRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/tokens', tokensRouter);


app.get('*', async (req, res) => {
  res.render('notfound');
});

// ERRORHANDLER
app.use(errorHandler);

export default app;





















