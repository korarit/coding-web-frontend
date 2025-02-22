<template>
  <div class="font-Kanit">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

onMounted(async () => {
  console.log('Setting status bar in app.vue', Capacitor.isNativePlatform());
  if (Capacitor.isNativePlatform()) {
    console.log('Setting status bar in app.vue');
    console.log('Status Bar Info:', await StatusBar.getInfo());
    await StatusBar.show();
    await StatusBar.setOverlaysWebView({ overlay: false });
    await StatusBar.setBackgroundColor({ color: '#000000' });
    await StatusBar.setStyle({ style: Style.Dark });
  }
});

</script>