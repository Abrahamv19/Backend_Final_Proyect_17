import { __dirname } from '../configPath.js'; 
import config from '../config/envconfig.js';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import { logger } from '../utils/logger.js';

const GOOGLE_EMAIL = process.env.GOOGLE_EMAIL;
const GOOGLE_PASS = process.env.GOOGLE_PASS;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;


class MailController {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: GOOGLE_EMAIL,
        pass: GOOGLE_PASS,
      },
    });
  }
  async sendMail(options) {
    try {
      const result = await this.transporter.sendMail(options);
      logger.info('Email sent:', result);
      return 'Email sent';
    } catch (error) {
      logger.error('Failed to send email:', error);
      throw new Error('Failed to send email');
    }
  }

  // PARA PROBAR ENDPOINT API/MESSAGEANDMAIL/MAIL ACTIVE LA SIGUIENTE FUNCION Y AGREGUE SU EMAIL 

  // async sendMail() {
  //   const mailOptions = {
  //     from: GOOGLE_EMAIL,
  //     to: 'hugoabrahamv19@gmail.com',
  //     subject: 'Email prueba 2',
  //     html: `
  //       Prueba 11
  //     `,
  //   };

  //   try {
  //     const result = await this.transporter.sendMail(mailOptions);
  //     logger.info('Email sent:', result);
  //     return 'Email sent';
  //   } catch (error) {
  //     logger.error('Failed to send email:', error);
  //     throw new Error('Failed to send email');
  //   }
  // }

}

export const mailController = new MailController();

class SmsController {
  constructor() {
    this.client = new twilio.Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  }
  async sendSms() {
    const messageOptions = {
      body: 'PRUEBA TWILIO',
      from: TWILIO_PHONE_NUMBER,
      to: '+573203170966',
    };
    try {
      const result = await this.client.messages.create(messageOptions);
      logger.info('SMS sent:', result);
      return 'SMS sent';
    } catch (error) {
      logger.error('Failed to send SMS:', error);
      throw new Error('Failed to send SMS, your balance is empty');
    }
  }
}

export const smsController = new SmsController();
