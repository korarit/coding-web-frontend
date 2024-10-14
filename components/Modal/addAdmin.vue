<template>
    <div class="w-full h-[100dvh] bg-[#00000048] absolute z-10 flex justify-center items-center">
  
        <Transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 translate-y-full"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-300"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-full"
        >
        <div v-show="show_modal" class="bg-white dark:bg-[#3D3D3D] dark:border-[#676767] p-6 rounded-lg shadow-lg w-[90dvw] sm:w-[480px]  2xl:w-[24dvw]">
            
            <div class="flex items-center justify-between w-full">
                <p class="text-[28px] leading-6 text-[#00C7A3]">เพิ่ม Admin</p>

                <button class="flex items-center justify-center w-fit" @click="closeModal">
                    <font-awesome-icon 
                        :icon="['fas', 'xmark']"
                        class="text-[44px] 2xl:text-[48px] leading-5 text-[#606060] hover:text-[#000000] active:text-black dark:text-[#FEFEFE] dark:hover:text-[#b0b0b0] dark:active:text-black" 
                    />
                </button>
            </div>


            <div class="my-5 flex flex-col space-y-5">
                <input 
                    class="w-full px-4 py-1.5 shadow-inner shadow-black/15 border border-[#C2C2C2] rounded-md text-[20px] placeholder:text-[18px] placeholder:text-[#adadad] placeholder:font-light focus:outline-none"
                    v-model="EmailOrUser"
                    placeholder="Email หรือ Username ของคนที่ต้องการให้"
                />

                <DropdownCheckSelect block-class="w-full"
                    customclass="w-full border border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-md flex items-center justify-between px-4 py-1.5 shadow-inner lg:text-[20px] md:text-[16px] sm:text-[13px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
                    v-model="selectIndexLevel" :list_data="LevelListName" icon="caret-down"
                    icon-class="text-[#4F4F4F] dark:text-[#8A8A8A] lg:text-[24px] md:text-[26px] sm:text-[22px] text-[20px]"
                    placeholder="เลือกระดับของ Admin"
                />
            </div>

            <p v-if="error" class="text-[16px] text-red-600 mb-2">{{ error }}</p>

            <button @click="addAdmin" class="w-full rounded-lg bg-[#00C7A3] dark:bg-[#3DD6BA] hover:bg-[#199c80] active:bg-[#199c80] dark:hover:bg-[#00C7A3] dark:active:bg-[#00C7A3] drop-shadow-md py-1">
                
                <span v-if="!loading" class="text-[24px] text-[#FEFEFE]">เพิ่ม Admin</span>
                <div v-else class="mx-auto py-1 w-fit h-fit">
                    <svg  class=" animate-spin -ml-1 h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            </button>

        </div>
        </transition>
    </div>
  
</template>
  
<style>
.ease-custom {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
<script setup lang="ts">
  
const props = defineProps<{
    show: boolean
}>()

const { status, data } = useAuth()
  
const show_modal = ref<boolean>(false)
const loading = ref<boolean>(false)

const emit = defineEmits(['closeModal','refreshData'])
const closeModal = () => {
    show_modal.value = false
    setTimeout(() => {
      emit('closeModal')
    }, 300)
}

watch(() => props.show, (value) => {
    show_modal.value = value
    if (value) {
        error.value = null
    }
})

const LevelListName = ref<string[]>([
    'เลือกระดับ Admin',
    'Admin (จัดการ question ได้)',
    'Super Admin (จัดการ โจทย์ และ admin ได้)'
])

/////////////////// create ///////////////////
const EmailOrUser = ref<string|null>(null)
const error = ref<string|null>(null)
const selectIndexLevel = ref<number>(0)
async function addAdmin() {
    if (!EmailOrUser.value) {
        error.value = 'กรุณากรอก Email หรือ Username ของคนที่ต้องการให้'
        return
    }
    if (selectIndexLevel.value === 0) {
        error.value = 'กรุณาเลือกระดับของ Admin'
        return
    }

    if (loading.value) {
        return;
    }


    const user_session: any = data.value
    //ส่งข้อมูลไปยัง API
    const config = useRuntimeConfig()

    loading.value = true
    try {
        const response = await fetch(config.public.backendApi + '/admin', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": 'Bearer ' + user_session.sessionToken,
            },
            body: JSON.stringify({
                username_or_email: EmailOrUser.value,
                level: selectIndexLevel.value + 1
            })
        })

        const get_data = await response.json()
        if (response.status !== 200) {
            error.value = get_data.message;
            loading.value = false;
            return;
        }

        error.value = null
        error.value = null
    } catch (error: any) {
        error.value = error.response.status;
    }
    loading.value = false


    //ปิด Modal
    emit('refreshData')
    closeModal();

}
</script>
<style scoped>

.cropper-wrapper {
	overflow: hidden;
	position: relative;
    width: 100%;
    height: 100%;
}
.cropper-background {
	background: rgba(103, 103, 103, 0.1);
}
.image-background {
	position: absolute;
	height: 100%;
	left: 0;
	top: 0;
	background-size: cover;
	background-position: 50%;
	filter: blur(5px);
}

</style>