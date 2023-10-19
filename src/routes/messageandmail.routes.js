// import express from 'express';
// import { mailController, smsController } from '../controller/messages.controller.js';
// const messageandmailRouter = express.Router();

// messageandmailRouter.get('/mail', async (req, res) => {
//   try {
//     const response = await mailController.sendMail();
//     res.send(response);
//   } catch (error) {
//     res.status(500).send('Error sending email');
//   }
// });

// messageandmailRouter.get('/sms', async (req, res) => {
//   try {
//     const response = await smsController.sendSms();
//     res.send(response);
//   } catch (error) {
//     res.status(500).send('Error sending SMS');
//   }
// });

// export default messageandmailRouter;

import express from 'express';
import { mailController, smsController } from '../controller/messageandmail.controller.js';
const messageandmailRouter = express.Router();

messageandmailRouter.get('/mail', async (req, res) => {
  try {
    const response = await mailController.sendMail();
    res.send(response);
  } catch (error) {
    res.status(500).send('Error sending email');
  }
});

messageandmailRouter.get('/sms', async (req, res) => {
  try {
    const response = await smsController.sendSms();
    res.send(response);
  } catch (error) {
    res.status(500).send('Error sending SMS');
  }
});

export default messageandmailRouter;

// messageandmails/mail

// import express from 'express';
// import { viewsController } from '../controller/views.controller.js';
// import { isAdminOrPremium, isLogged } from '../middleware/auth.js';

// const viewsRouter = express.Router();

// viewsRouter.get('/', viewsController.renderHome);
// viewsRouter.get('/products', viewsController.renderAllProducts);
// viewsRouter.get('/products/filter', viewsController.renderFilteredProducts);
// viewsRouter.get('/realtimeproducts', isLogged, isAdminOrPremium, viewsController.renderRealTimeProducts);
// viewsRouter.get('/realtimeproductsadmin', isLogged, isAdminOrPremium, viewsController.renderRealTimeProductsAdmin);
// viewsRouter.get('/products/:pid', viewsController.renderOneProduct);
// viewsRouter.get('/loggerTest', viewsController.testLogger);

// export default viewsRouter;
