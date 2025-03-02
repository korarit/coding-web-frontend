// plugins/app-listening.js
export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.client) {
    const { App } = await import('@capacitor/app');
    const { NativeAuth } = await import('@/utils/auth/native/NativeAuth');
    const auth = NativeAuth();

    console.log('Plugin initialized, setting up appStateChange listener');

    App.addListener('appStateChange', async (state) => {
      console.log('appStateChange triggered:', state); // Log ข้อมูล state ทั้งหมด

      if (state.isActive) {
        console.log('App is active, checking token...');
        if (auth.token.value) {
          console.log('Token found:', auth.token.value);
          console.log('Calling getSession...');
          try {
            const sessionData = await auth.getSession();
            console.log('getSession completed, result:', sessionData);
            console.log('Updated auth.data:', auth.data.value);
          } catch (error) {
            console.error('getSession failed:', error);
          }
        } else {
          console.log('No token found, resetting auth state');
          auth.status.value = 'unauthenticated';
          auth.data.value = null;
          console.log('Auth state reset - status:', auth.status.value, 'data:', auth.data.value);
        }
      } else {
        console.log('App is in background');
      }
    });
  }
});