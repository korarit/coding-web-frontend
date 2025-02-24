import { registerPlugin } from '@capacitor/core';

import type { AlertNotificationPlugin } from './definitions';

const AlertNotification = registerPlugin<AlertNotificationPlugin>('AlertNotification', {
  web: () => import('./web').then((m) => new m.AlertNotificationWeb()),
});

export * from './definitions';
export { AlertNotification };
