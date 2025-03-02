<template>
    <div class="h-screen-safe flex flex-col max-w-full" :class="`${show_modal ? 'overflow-hidden touch-none' : ''} ${isDarkMode ? 'dark' : ''}`">
        <Navbar 

            @open-mobile-nav="openNavMobile"

            @dark-theme="darkTheme"

            :login_status="status"
            @open-login="openLogin"

            @open-user="() => {show_user_modal = !show_user_modal;show_notification_modal = false;}"

            @open-notification="() => {show_notification_modal = !show_notification_modal;show_user_modal = false;}"

            :profile="user_data?.profile_img"
            :fullname="user_data?.name[0]"
            :page_name="props.page_name"

            v-model:-dark-theme="isDarkMode"
        />
            <div class="bg-[#FBFBFB] dark:bg-[#0F0F0F]">
                <slot>
                </slot>
            </div>
                
        <Footer />
        <div v-show="show_login_modal" class="absolute min-w-full h-[100dvh] top-0 left-0">
            <ModalLogin 
                :show="show_login_modal" 
                @close-modal="closeModal" 
                @login="login"
            />
        </div>

        <div  class="absolute z-50 w-fit h-fit top-0 left-0 block sm:hidden">
            <NavMobile :show="show_nav_mobile" :data="user_data" :login-status="status == 'authenticated'" @login-open="openLogin" v-model:-dark-theme="isDarkMode" />
        </div>

        <div class="absolute z-50 w-fit h-fit top-20 sm:right-5 lg:right-4 xl:right-16  2xl:right-[96px] hidden sm:block">
            <ModalUserData :show="show_user_modal" :data="user_data" />
        </div>

        <div class="absolute z-50 w-fit h-fit top-20 sm:right-14 lg:right-14 xl:right-[128px]  2xl:right-[168px] hidden sm:block">
            <ModalNotification :show="show_notification_modal" />
        </div>

    </div>
</template>


<style scoped>
body {
    overflow-y: hidden;
}
</style>
<script setup lang="ts">
import { type ActionPerformed, type PushNotificationSchema, PushNotifications, type Token } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';

import { Preferences } from '@capacitor/preferences';
import { Capacitor } from "@capacitor/core"



const props = defineProps({
    page_name: String
})



///////////////////////// Theme Mode /////////////////////////
const isDarkMode = ref(false)

const darkTheme = (status:boolean) => {
    console.log('dark theme ',status)
    isDarkMode.value = status
}

onMounted(() => {
    // Automatically detect system dark mode setting
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    if (localStorage.getItem('darkMode') !== null) {
        isDarkMode.value = localStorage.getItem('darkMode') === 'true'
    }

    // Listen for changes to dark mode setting
    mediaQuery.addEventListener('change', (e) => {
        if (localStorage.getItem('darkMode') === null) {
            isDarkMode.value = e.matches
            console.log('dark mode ',e.matches)
        }else{
            isDarkMode.value = localStorage.getItem('darkMode') === 'true'
        }
        console.log('dark mode ',e.matches)
    })
})
///////////////////////// NavMobile /////////////////////////
const show_nav_mobile = ref(false)

const openNavMobile = () => {
    if (show_login_modal) {
        close_modal_login()
    }
    show_nav_mobile.value = !show_nav_mobile.value

}
///////////////////////// modal control /////////////////////////
const show_user_modal = ref(false)
const show_notification_modal = ref(false)


const status_login = ref(false)

const {run, open_modal_login, close_modal_login} = useLoginModalControl()
const {statusModal, open_modal, close_modal} = useModalControl()
const show_login_modal = run() as Ref<boolean>
const show_modal = statusModal()

const openLogin = () => {
    if (show_nav_mobile.value) {
        show_nav_mobile.value = false
    }
    open_modal_login()
    console.log('open login')
    open_modal()
}

const closeModal = () => {
    close_modal_login()
    close_modal()
}

///////////////////////// login /////////////////////////

const login = (username :string, password:string) => {
    console.log(username, password)
    status_login.value = true
}

///////////////////////// login status /////////////////////////

const { status , data } = await useNativeAuth()
const user_data = ref<any>(data.value)
onMounted(() => {
    console.log('user_data', data.value, user_data)
})


////////////////////// notification //////////////////////
// listen for push notifications from firebase cloud messaging (FCM) for android
onMounted(async() => {
    if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android') {

        // Check if we already have a device token stored in preferences
        const deviceToken = await Preferences.get({ key: 'ably-device-token' });
        if (deviceToken.value === null) {

            PushNotifications.requestPermissions().then((result) => {
                if (result.receive === 'granted') {
                    // Register with Apple / Google to receive push via APNS/FCM
                    PushNotifications.register();
                } else {
                    // Show some error
                    console.log('Push notification permission denied');
                }
            });

        }

        // On success, we should be able to receive notifications from FCM
        PushNotifications.addListener('registration', async (token: Token) => {
            console.log('Push registration success, token: ' + token.value);
            await Preferences.set({ key: 'ably-device-token', value: token.value });
        });

        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError', (error: any) => {
            console.log('Error on registration: ' + JSON.stringify(error));
        });

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived', async (notification: PushNotificationSchema) => {
            console.log('Push received: ' + JSON.stringify(notification));
            await LocalNotifications.schedule({
                notifications: [
                    {
                        title: notification.title || 'No Title',
                        body: notification.body || 'No Body',
                        id: Math.floor(Date.now() / 1000), // ID เฉพาะ
                        schedule: { at: new Date(Date.now() + 500) }, // แสดงใน 1 วินาที
                    },
                ],
            });
        });

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
            console.log('Push action performed: ' + JSON.stringify(notification));
        });
    }
})
</script>