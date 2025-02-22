self.addEventListener('push', (event) => {
  const { notification } = event.data.json();
  const title = notification.title;
  const options = {
    body: notification.body,
    icon: notification.icon || '/logo-web-coding.png',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('message', (event) => {
  console.log('SW Received Message: ', event.data);

  if (event.data && event.data.type === 'notification') {
    const { notification } = event.data.payload;

    const options = {
      body: notification.body,
      icon: notification.icon || '/logo-web-coding.png',
    };

    if (self.registration) {
      self.registration.showNotification(notification.title, options);
    } else {
      console.error('self.registration is undefined');
    }
  }
});
