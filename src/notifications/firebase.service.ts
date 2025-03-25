import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
var serviceAccount = require('../../auth-2c46a-firebase-adminsdk-mn08e-38b74de0cd.json');

@Injectable()
export class FirebaseService {
  constructor() {
    // Initialize Firebase only once
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as ServiceAccount),
      });
    }
  }

  async sendPushNotification(
    token: string | undefined,
    title: string,
    body: string,
  ) {
    if (!token) {
      return null;
    }
    const message = {
      notification: { title, body },
      token,
    };

    try {
      const response = await admin.messaging().send(message);
      console.log('Push notification sent successfully:', response);
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }
}
