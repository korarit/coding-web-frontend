import { registerPlugin } from '@capacitor/core';

export interface NotificationPlugin {
    registerDevice(): Promise<{ success: boolean; message: string; }>;
    unregisterDevice(): Promise<{ success: boolean; message: string; }>;
}

const Notification = registerPlugin<NotificationPlugin>('Notification');

export default Notification;