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
                <p class="text-[28px] leading-6 text-[#00C7A3]">ยืนยันรหัส OTP</p>

                <button class="flex items-center justify-center w-fit" @click="closeModal">
                    <font-awesome-icon 
                        :icon="['fas', 'xmark']"
                        class="text-[44px] lg:text-[44px] xl:text-[44px] 2xl:text-[48px] leading-5 text-[#606060] hover:text-[#000000] active:text-black dark:text-[#FEFEFE] dark:hover:text-[#b0b0b0] dark:active:text-black" 
                    />
                </button>
            </div>

            <p v-if="error_status === true" class="text-red-500 text-[20px] leading-5 mt-1">{{ props.error }}</p>

            <div class="mb-8 flex flex-col" :class="error_status === true ? 'mt-1' : 'mt-7'">
                <div class="flex items-center justify-between mb-3">
                    <p class="text-[20px] leading-5 text-[#606060]">Ref: {{ props.otp_code }}</p>
                    <p class="text-[20px] leading-5 text-[#00C7A3]">{{ minute }}:{{ second }}</p>
                </div>

                <InputOtp 
                    :count_input="4" 
                    class_container="mb-3 flex w-full space-x-[6%]  sm:h-[100px] h-[20dvw]"
                    class_input="border w-full min-h-full rounded-md border-[#c2c2c2] shadow-inner text-[30px] text-center 2xl:text-[40px] xl:text-[38px] lg:text-[36px] md:text-[34px] sm:text-[32px] font-normal	 dark:bg-[#282828] dark:border-[#101010] dark:text-[#BEBEBE]"
                    class_container_line="absolute w-full px-4 bottom-4 -translate-x-1/2 left-1/2 lg:-right-1/2 xl:-right-1/2 md:-right-1/2 sm:-right-1/2"
                    class_line="h-[1px] bg-[#606060] w-full dark:border-[#FEFEFE]"

                    v-model="OTPData"
                    :error_status="error_status"
                />

                <div class="w-full flex items-center leading-5" :class="error_status === true ? 'justify-between' : 'justify-end'">

                    <p v-if="time_request > 0 && props.can_request" class="text-[20px] leading-5">
                        <span class="text-[#606060] dark:text-[#FEFEFE] ">ขอรหัส OTP ใหม่ได้ใน </span>
                        <span class="text-[#00C7A3]">{{ time_request_minute }}:{{ time_request_second }}</span>
                    </p>

                    <p v-else-if="time_request <= 0 && props.can_request" @click="requestOtp" class="text-[16px] 2xl:text-[20px] leading-5 underline text-[#00C7A3] dark:bg-[#3DD6BA]">ขอรหัส OTP ใหม่</p>
                </div>

            </div>


            <button @click="sendOtp()" class="w-full rounded-lg bg-[#00C7A3] dark:bg-[#3DD6BA] hover:bg-[#199c80] active:bg-[#199c80] dark:hover:bg-[#00C7A3] dark:active:bg-[#00C7A3] drop-shadow-md py-1">
                
                <span v-if="!OTPloading" class="text-[24px] text-[#FEFEFE]">ยืนยันรหัส OTP</span>
                <div v-else class="mx-auto py-1 w-fit h-fit">
                    <svg  class=" animate-spin -ml-1 mr-3 h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
const dayjs = useDayjs()
  
const props = defineProps<{
    show: boolean
    otp_code: String|null
    otp_expire: Number|null
    can_request: Boolean

    error: String|null
}>()
  
const show_modal = ref<boolean>(true)
const OTPloading = ref<boolean>(false)

const minute = ref(0)
const second = ref(0)

const time_request = ref(120)
const time_request_minute = ref(0)
const time_request_second = ref(0)
watch(() => props.show, (val) => {
    show_modal.value = val
    OTPData.value = ''
    OTPloading.value = false

    if (props.otp_expire === null) {
        return
    }
    // calculate time millisec to min and sec (countdown)
    const refreshIntervalId = setInterval(() => {
        if (props.otp_expire === null) {
            clearInterval(refreshIntervalId)
            return
        }
        const now_time = dayjs().tz('Asia/Bangkok').valueOf()
        const calculate = Number(props.otp_expire) - Number(now_time)

        // calculate minute and second from millisec
        minute.value = Math.floor((calculate % (1000 * 60 * 60)) / (1000 * 60))
        second.value = Math.floor((calculate % (1000 * 60)) / 1000)
        if (calculate <= 0) {
            clearInterval(refreshIntervalId)
            closeModal()
        }
    }, 1000);

    if (props.can_request === true) {
        const refreshRequestIntervalId = setInterval(() => {
            if (time_request.value <= 0) {
                clearInterval(refreshRequestIntervalId)
            }

            time_request.value -= 1

            time_request_minute.value = Math.floor(time_request.value / 60)
            time_request_second.value = time_request.value % 60

        }, 1000)
    }
})

// update time when otp_expire change value
watch(() => props.otp_code, (val) => {
    if (val === null || props.can_request === false) {
        return
    }

    // reset
    OTPData.value = ''
    OTPloading.value = false
    time_request.value = 120
    time_request_minute.value = 0
    time_request_second.value = 0

    // calculate time millisec to min and sec (countdown)
    const refreshIntervalId = setInterval(() => {
        if (props.otp_expire === null) {
            clearInterval(refreshIntervalId)
            return
        }
        const now_time = dayjs().tz('Asia/Bangkok').valueOf()
        const calculate = Number(props.otp_expire) - Number(now_time)

        // calculate minute and second from millisec
        minute.value = Math.floor((calculate % (1000 * 60 * 60)) / (1000 * 60))
        second.value = Math.floor((calculate % (1000 * 60)) / 1000)
        if (calculate <= 0) {
            clearInterval(refreshIntervalId)
            closeModal()
        }
    }, 1000);


    if (props.can_request === true) {
        const refreshRequestIntervalId = setInterval(() => {
            if (time_request.value <= 0) {
                clearInterval(refreshRequestIntervalId)
            }

            time_request.value -= 1

            time_request_minute.value = Math.floor(time_request.value / 60)
            time_request_second.value = time_request.value % 60

        }, 1000)
    }

})
  
const emit = defineEmits(['closeModal', 'checkOtp', 'requestOtp'])
const closeModal = () => {
    show_modal.value = false
    OTPloading.value = false
    OTPData.value = ''
    setTimeout(() => {
      emit('closeModal')
    }, 300)
}

const OTPData = ref<string>('')
const sendOtp = async () => {
    // Array of otp to one string
    if (OTPData.value.length === 4) {
        OTPloading.value = true
        emit('checkOtp', OTPData.value)
    }

    console.log(OTPData.value.length)
    
}

const requestOtp = async () => {
    if (time_request.value > 0) {
        return
    }

    // reset time request
    time_request.value = 900
    time_request_minute.value = 0
    time_request_second.value = 0

    emit('requestOtp')
}

//check error
const error_status = ref(false)
watch(() => props.error, (val) => {
    if (val !== null) {
        OTPloading.value = false
        error_status.value = true
    }
})
watch(() => OTPData.value, (val) => {
    if (val.length === 4) {
        error_status.value = false
    }
})
</script>