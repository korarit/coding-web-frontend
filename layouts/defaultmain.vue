<template>
    <div class="h-[100dvh] flex flex-col max-w-full" :class="show_modal ? 'overflow-hidden' : ''">
        <Navbar 
            :login_status="status"
            @open-login="openLogin"

            @open-user="() => {show_user_modal = !show_user_modal;show_notification_modal = false;}"

            @open-notification="() => {show_notification_modal = !show_notification_modal;show_user_modal = false;}"

            :profile="data?.profile_img"
            :fullname="data?.name[0]"
            :page_name="props.page_name"
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

        <div class="absolute z-50 w-fit h-fit top-20 xl:right-16  2xl:right-[96px] hidden xl:block">
            <ModalUserData :show="show_user_modal" :data="data" />
        </div>

        <div class="absolute z-50 w-fit h-fit top-20 xl:right-16  2xl:right-[168px] hidden xl:block">
            <ModalNotification :show="show_notification_modal" />
        </div>

    </div>
</template>


<style scoped>
body {
    overflow-y: hidden;
}
</style>
<script setup>
import Ably from 'ably';;
import Push from 'ably/push';

const props = defineProps({
    page_name: String
})

///////////////////////// modal control /////////////////////////
const show_user_modal = ref(false)
const show_notification_modal = ref(false)


const status_login = ref(false)

const {run, open_modal_login, close_modal_login} = useLoginModalControl()
const {statusModal, open_modal, close_modal} = useModalControl()
const show_login_modal = run()
const show_modal = statusModal()

const openLogin = () => {
    open_modal_login()
    open_modal()
}

const closeModal = () => {
    close_modal_login()
    close_modal()
}

///////////////////////// login /////////////////////////

const login = (username, password) => {
    console.log(username, password)
    status_login.value = true
}

///////////////////////// login status /////////////////////////

const { status , data } = useAuth()


////////////////////// notification //////////////////////

async function RegisterDevice(ably_id, form_factor, target_url, public_vapid_key, p256dh, auth_id) {
    const user_session = data.value
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
    const user_session = data.value
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
        console.log(data)
        return await data_device
    }
    return null
}

const config = useRuntimeConfig()

onMounted(async() => {

    
    if (status.value === 'authenticated') {
        //notification ably
        if (config.public.ablyApiKey !== null && 'serviceWorker' in navigator) {

            const url_service_worker = await navigator.serviceWorker.register('/service-worker.js')

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
                        callback('error', null);
                    }
                });
            }else if (Notification.permission === 'denied'){
                await client_ably.push.deactivate(async(deviceDetails, callback) => {
                    const device = await DeleteDevice()
                    console.log('deviceDetails', deviceDetails)
                    if (device){
                        callback(null, device);
                    }else{
                        callback('error', null);
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

            if (data.value.type_level === 2) {
                user_ch = 'pushenabled:admin'
            }else if (data.value.type_level === 3) {
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
                    callback('error', null);
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
                    callback('error', null);
                }
            });
        }
    }
})
</script>