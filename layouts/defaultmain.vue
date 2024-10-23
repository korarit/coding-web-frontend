<template>
    <div class="h-[100dvh] flex flex-col max-w-full" :class="`${show_modal ? 'overflow-hidden' : ''} ${isDarkMode ? 'dark' : ''}`">
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
import Ably from 'ably';;
import Push from 'ably/push';

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
const show_login_modal:boolean = run()
const show_modal = statusModal()

const openLogin = () => {
    if (show_nav_mobile.value) {
        show_nav_mobile.value = false
    }
    open_modal_login()
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

const { status , data } = useAuth()
const user_data = ref<any>(data.value)


////////////////////// notification //////////////////////

async function RegisterDevice(ably_id:string, form_factor:string, target_url:string, public_vapid_key:string, p256dh:string, auth_id:string) {
    const user_session = user_data.value
    const config = useRuntimeConfig()
    console.log({
            ably_id: ably_id,
            form_factor: form_factor,
            target_url: target_url,
            public_vapid_key: public_vapid_key,
            p256dh: p256dh,
            auth_id: auth_id
        })
    const res = await fetch(config.public.backendApi + '/notification/reg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user_session.sessionToken
        },
        body: JSON.stringify({
            ably_id: ably_id,
            form_factor: form_factor,
            target_url: target_url,
            public_vapid_key: public_vapid_key,
            p256dh: p256dh,
            auth_id: auth_id
        })
    })

    if (res.status === 200) {
        const data_device = await res.json()
        console.log(data)
        return await data_device
    }
    return null
}

async function DeleteDevice() {
    const user_session = user_data.value
    const config = useRuntimeConfig()
    const res = await fetch(config.public.backendApi + '/notification', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user_session.sessionToken
        }
    })

    if (res.status === 200) {
        const data_device = await res.json()
        return await data_device
    }
    return null
}

const config = useRuntimeConfig()

onMounted(async() => {

    
    if (status.value === 'authenticated') {
        //notification ably
        if (config.public.ablyApiKey !== null && 'serviceWorker' in navigator) {

            const url_service_worker:any = await navigator.serviceWorker.register('/service-worker.js')

            navigator.serviceWorker.getRegistration().then((registration) => {
                if (registration) {
                registration.update();
                }
            });

            console.log(url_service_worker.scope+'service-worker.js')

            //setlocalstorage status notification
            localStorage.setItem('notification', 'true')

            const client_ably  = new Ably.Realtime({ key: config.public.ablyApiKey, pushServiceWorkerUrl: url_service_worker.scope+'service-worker.js' , plugins: {Push}});
            if(Notification.permission === 'default'){
                await client_ably.push.activate(async(deviceDetails, callback) => {
                    console.log('deviceDetails', deviceDetails)
                    callback(null, deviceDetails);
                    const device = await RegisterDevice(deviceDetails.id, 
                        deviceDetails.formFactor, 
                        deviceDetails.push.recipient.targetUrl, 
                        deviceDetails.push.recipient.publicVapidKey, 
                        deviceDetails.push.recipient.encryptionKey.p256dh, 
                        deviceDetails.push.recipient.encryptionKey.auth
                    )
                    if (device){
                        callback(null, device);
                    }else{
                        callback({ name: 'Error', code: 500, statusCode: 500, message: 'error' }, undefined);
                    }
                });
            }else if (Notification.permission === 'denied'){
                await client_ably.push.deactivate(async(deviceDetails, callback) => {
                    const device = await DeleteDevice()
                    console.log('deviceDetails', deviceDetails)
                    if (device){
                        callback(null, device);
                    }else{
                        callback({ name: 'Error', code: 500, statusCode: 500, message: 'error' }, undefined);
                    }
                });
            }


            const channel = client_ably.channels.get('pushenabled:all');
            console.log('channel')
            channel.subscribe('example',(message) => {
                url_service_worker.active.postMessage({
                    type: 'notification',
                    payload: message.data
                });
                console.log('message notification', message)
            });

            let user_ch = ''

            if (user_data.value.type_level === 2) {
                user_ch = 'pushenabled:admin'
            }else if (user_data.value.type_level === 3) {
                user_ch = 'pushenabled:super_admin'
            }else{
                user_ch = 'pushenabled:user'
            }

            const user_channel = client_ably.channels.get(user_ch);

            user_channel.subscribe('example',(message) => {
                url_service_worker.active.postMessage({
                    type: 'notification',
                    payload: message.data
                });
                console.log('message notification', message)
            });

            console.log('test')

        }
    } else {
        //notification ably
        if (config.public.ablyApiKey) {

            //setlocalstorage status notification
            const url_service_worker = await navigator.serviceWorker.register('/service-worker.js')

            const clinet_ably = new Ably.Realtime({ key: config.public.ablyApiKey , plugins: {Push}, pushServiceWorkerUrl: url_service_worker.scope+'service-worker.js' });
            
            await clinet_ably.push.deactivate(async(deviceDetails, callback) => {
                console.log('deviceDetails', deviceDetails)
                const device = await DeleteDevice()
                    console.log('deviceDetails', deviceDetails)
                if (device){
                    callback(null, device);
                }else{
                    callback({ name: 'Error', code: 500, statusCode: 500, message: 'error' }, undefined);
                }
            });
        }
    }
})

watch(() => status.value ,async () => {
    if (status.value === 'authenticated') {
        const ably_key = process.env.ABLY_API_KEY
        //notification ably
        if (ably_key) {

            //setlocalstorage status notification
            localStorage.setItem('notification', 'true')

            const clinet_ably = new Ably.Realtime({ key: ably_key , plugins: {Push}});
            
            await clinet_ably.push.activate(async(deviceDetails, callback) => {
                console.log('deviceDetails', deviceDetails)
            });
        }
    } else {
        const ably_key = process.env.ABLY_API_KEY
        //notification ably
        if (ably_key) {

            //setlocalstorage status notification
            localStorage.setItem('notification', 'true')

            const clinet_ably = new Ably.Realtime({ key: ably_key , plugins: {Push}});
            
            await clinet_ably.push.deactivate(async(deviceDetails, callback) => {
                console.log('deviceDetails', deviceDetails)
                const device = await DeleteDevice()
                console.log('deviceDetails', deviceDetails)
                if (device){
                    callback(null, device);
                }else{
                    callback({ name: 'Error', code: 500, statusCode: 500, message: 'error' }, undefined);
                }
            });
        }
    }
})
</script>