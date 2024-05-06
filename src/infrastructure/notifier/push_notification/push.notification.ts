import { Injectable } from '@nestjs/common';
import { PushNotificationServiceInterface } from '../../../data/protocols/notifier/push_notification/push.notification.interface';
import admin from 'firebase-admin';
import { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID } from 'src/config';

@Injectable()
export class PushNotificationServiceImpl implements PushNotificationServiceInterface {
  private readonly admin: admin.app.App;

  constructor() {
    this.admin = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
  }

  async send(recipients: string[], data: any, message: string): Promise<void> {
    try {
      await Promise.all(
        recipients.map(async (recipient) => {
          await this.admin.messaging().send({
            token: recipient,
            data,
            notification: {
              title: 'Title of the notification',
              body: message,
            },
          });
        }),
      );
    } catch (error) {
      throw new Error(`Error sending push notification: ${error.message}`);
    }
  }
}
