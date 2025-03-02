// plugins/auth-loader.js
export default defineNuxtPlugin(async (nuxtApp) => {
    if (process.client) { // รันเฉพาะฝั่งไคลเอนต์
      console.log('Plugin initialized, loading auth data before onMounted');
  
      try {
        const { NativeAuth } = await import('@/utils/auth/native/NativeAuth');
        const auth = NativeAuth();
  
        await auth.getSessionToken();
        console.log('Checking initial token:', auth.token.value);
        if (auth.token.value) {
          console.log('Token found, calling getSession...');

          const sessionData = await auth.getSession();
          console.log('getSession completed, result:', sessionData);
          console.log('Updated auth.data:', auth.data.value);
        } else {
          console.log('No token found, resetting auth state');
          auth.status.value = 'unauthenticated';
          auth.data.value = null;
          console.log('Auth state reset - status:', auth.status.value, 'data:', auth.data.value);
        }
      } catch (error) {
        console.error('Error loading auth data in plugin:', error);
      }
    }
  });