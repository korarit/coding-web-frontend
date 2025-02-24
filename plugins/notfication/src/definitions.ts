export interface AlertNotificationPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
