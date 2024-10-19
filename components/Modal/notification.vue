<template>
    <Transition
        enter-active-class="transition ease-out duration-500"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-500"
        leave-from-class="opacity-100 translate-y-full"
        leave-to-class="opacity-0 -translate-y-1"
    >
    <div v-show="show_modal" class="w-[280px] h-[400px]  bg-[#ffffff] rounded-lg border border-[#C1C1C1] drop-shadow-md overflow-hidden flex flex-col">
        <div class="w-full bg-[#00C7A3] px-3 py-2 drop-shadow-md shadow-black/30">
            <div class="flex items-center space-x-2">
                <font-awesome-icon :icon="['fas', 'bell']" class="text-[24px] text-[#FEFEFE]" />
                <p class="text-[20px] text-[#FEFEFE] ">การแจ้งเตือน</p>
            </div>
        </div>
        <div class="flex-auto flex justify-center items-center" v-if="loading">
            <div class="flex items-center space-x-2 w-fit mt-6 mx-auto">
                <svg class=" animate-spin -ml-1 h-[28px] w-[28px] text-[#303030] dark:text-[#FEFEFE]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
                </svg>

                <p class="text-[20px] text-[#303030] dark:text-[#FEFEFE]">กำลังดึงข้อมูล</p>
            </div>
        </div>
        <div v-else class="flex flex-col w-[280px] overflow-y-auto px-3 divide-y divide-gray-300">
            <div class="flex space-x-3 py-2 text-[#606060]" v-for="(datas, index) in notificationData">
                <div class="h-fit flex items-center justify-center pt-1">
                    <font-awesome-icon :icon="['fas', 'bullhorn']" class="text-[18px] text-[#199c80]" />
                </div>
                <div class="flex flex-col">
                    <p class="text-[18px] " v-if="datas.title">{{ datas.title }}</p>
                    <p class="text-[16px] font-light"  v-if="datas.msg">{{ datas.msg }}</p>

                    <p class="text-[14px] font-extralight text-black">{{ datas.created_at }}</p>
                </div>
        </div>

            
        </div>
    </div>
    </Transition>
</template>

<script setup lang="ts">

const props = defineProps({
    show: Boolean
})

const show_modal = ref(false)

watch(() => props.show, async (val) => {
  if(val) {
    show_modal.value = true
    loading.value = true
    await load_data()
    loading.value = false
  } else {
    show_modal.value = false
  }
})

const loading = ref(false)

const {data} = useAuth()

const notificationData = ref<any[]>([])
const load_data = async () => {
    const user_session: any = data.value
    const config = useRuntimeConfig()
    const res = await fetch(config.public.backendApi + '/notification', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user_session.sessionToken
        }
    })

    if(res.status === 200) {
        const data = await res.json()
        console.log(data)

        notificationData.value = data.data.notification_list
    }
}


</script>