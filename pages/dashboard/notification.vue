<template>
    <NuxtLayout name="dashboard" page_name="notification">
        <div v-show="loading_all" class="flex justify-between items-center h-full">
            <div class="mx-auto flex items-center">
                <svg class=" animate-spin -ml-1 mr-4 h-12 w-12 text-black" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                    </circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                <p class="text-[28px]">
                    Loading . . .
                </p>
            </div>
        </div>
        <div v-show="error_code != null && !loading_all" class=" h-full flex justify-center items-center">
            <div class="mx-auto flex items-center space-x-4">
                <font-awesome-icon :icon="['fas', 'circle-exclamation']" class="text-[72px] text-red-600" />
                <p class="text-[28px]">
                    เกิดข้อผิดพลาด HTTP {{ error_code }}
                </p>
            </div>
        </div>
        <div v-show="!loading_all && error_code == null" class="w-full flex flex-col min-h-full max-h-fit ">
            <div class="flex-none flex justify-between items-center">
                <h1 class="text-4xl font-bold mb-4 dark:text-[#FEFEFE]">จัดการ Notification</h1>
                <button v-if="sessionData?.type_level === 3"
                    @click="addAdmin"
                    class="flex items-center justify-center px-8 py-1 bg-red-500 hover:bg-red-600 border border-red-700 text-2xl text-[#FEFEFE] rounded-md">
                    Notification
                </button>
            </div>

            <div class="flex-auto border-t border-x border-gray-600 pt-10 px-12 mt-8 pb-8 rounded-t-lg min-h-full">

                <div class="grid xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                    <div class=" bg-[#FEFEFE] w-full rounded-xl border-[#BABABA] border drop-shadow-md p-4" v-for="(data, index) in admin_data">
                        <div class="flex items-center space-x-3 mb-3">
                            <font-awesome-icon :icon="['fas', 'bullhorn']" class=" text-[36px] text-[#00C7A3]" />
                            <p class="text-xl font-semibold dark:text-[#FEFEFE]">
                                {{ data.title }}
                            </p>
                        </div>
                        <p class="text-[20px] dark:text-[#FEFEFE]" >
                            {{ data.msg}}
                        </p>

                        <!-- เวลา แจ้งเตือน -->
                        <p class="text-base font-light dark:text-[#FEFEFE]">
                            {{ data.created_at }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div v-show="openAddAdmin" class="absolute min-w-full h-[100dvh] top-0 left-0">
            <ModalSendNotification
                @closeModal="closeModaladdAdmin"
                @refresh-data="load_noti_list"
                :show="openAddAdmin"
            />
        </div>
    </NuxtLayout>
</template>
<script setup lang="ts">

//////////////////////////////////// Auth  ////////////////////////////////////

definePageMeta({
    auth: true
})
const { status, data } = useAuth()

const sessionData = ref<any>(null)

const router = useRouter()
onMounted(() => {
    if (status.value === 'authenticated' && data.value) {
        let user_session: any = data.value;
        if (user_session?.type_level < 2) {
            router.push('/')
        }else{
            sessionData.value = user_session
        }
    }else{
        router.push('/')
    }
})

//////////////////////////////////// Data Loading  ////////////////////////////////////
const loading_all = ref<boolean>(true)
const error_code = ref<number|null>(null)

const config = useRuntimeConfig()

const admin_data = ref<any>(null)
const status_image = ref<boolean[]>([])
const load_noti_list = async () => {
    try {

        const user_session:any = data.value
        const response = await fetch(config.public.backendApi+'/notification/list/admin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user_session.sessionToken
            }
        })

        if (response.status !== 200) {
            error_code.value = response.status
            return
        }
        
        const get_data = await response.json()
        admin_data.value = get_data.data.notification_list

    } catch (error:any) {
        console.log(error)
    }
    loading_all.value = false
}

onMounted(() => {
    load_noti_list()
})

const {open_modal, close_modal} = useModalControl()

//////////////////////////////////// Add Admin  ////////////////////////////////////
const openAddAdmin = ref<boolean>(false)

const addAdmin = () => {
    openAddAdmin.value = true
    open_modal()
}

const closeModaladdAdmin = () => {
    openAddAdmin.value = false
    close_modal()
}

</script>