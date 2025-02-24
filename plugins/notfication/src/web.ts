import { WebPlugin } from '@capacitor/core';

import type { AlertNotificationPlugin } from './definitions';

export class AlertNotificationWeb extends WebPlugin implements AlertNotificationPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
