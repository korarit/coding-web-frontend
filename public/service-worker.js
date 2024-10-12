self.addEventListener('push', (event) => {
    const data = event.data.json();
    const title = data.notification.title;
    const options = {
      body: data.notification.body,
      icon: data.notification.icon || '/img_programmer.svg' // ให้แน่ใจว่ามีไฟล์ icon ที่ถูกต้อง
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });
  