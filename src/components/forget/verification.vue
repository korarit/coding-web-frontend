<template>
  <div class="sm:w-[50dvh] sm:mx-auto md:w-[50dvh] xl:w-[65dvh] 2xl:w-[80dvh] md:mx-auto lg:w-[80dvh] lg:mx-0">
    <h1
      class="text-[#00c7A3] mb-10 text-[38px] leading-[48px] 2xl:text-[64px] xl:text-[60px] lg:text-[56px] md:text-[52px] md:mt-[70px] sm:text-[48px] dark:text-[#00C7A3]">
      ยืนยันรหัส OTP
    </h1>
    <div class="flex justify-between">
      <p
        class="text-[#606060] mb-4 text-[23px] leading-8 2xl:text-[32px] xl:text-[30px] lg:text-[28px] md:text-[26px] sm:text-[24px] dark:text-[#FEFEFE]">
        Rrf: {{ props.otp_code }}
      </p>
      <P
        class="text-[#00c7A3] mb-4 text-[20px] 2xl:text-[30px] xl:text-[28px] lg:text-[26px] md:text-[24px] sm:text-[22px] dark:text-[#97E1CB]">
        15:00</P>
    </div>
    <InputOtp :count_input="4"
      class_container="grid grid-cols-4 gap-x-6 xl:gap-x-8 w-full h-20 mb-10 2xl:h-[97px] xl:h-[97px] lg:h-[95px] md:h-[80px] sm:h-[70px]"
      class_input="border w-full min-h-full rounded-md border-[#c2c2c2] shadow-inner text-[30px] text-center 2xl:text-[40px] xl:text-[38px] lg:text-[36px] md:text-[34px] sm:text-[32px] dark:bg-[#282828] dark:border-[#101010] dark:text-[#BEBEBE]"
      class_container_line="absolute w-full px-4 bottom-4 -translate-x-1/2 left-1/2 2xl:bottom-6 2xl:left-1/2 xl:bottom-6 lg:-right-1/2 lg:bottom-4 xl:-right-1/2 md:bottom-4 md:-right-1/2 sm:bottom-4 sm:-right-1/2"
      class_line="h-[1px] bg-[#606060] w-full dark:border-[#FEFEFE]"
      v-model="OTPData" 
      :error_status="error_status" 
    />

    <div>
      <button
        @click="verifyOTP"
        class="bg-[#00C7A3] drop-shadow-md w-full hover:bg-[rgb(25,156,128)] rounded-lg px-18 py-[6px] lg:py-2 dark:bg-[#3DD6BA] dark:text-[#0F0F0F] dark:hover:bg-[#00C7A3]">
        <span v-if="!OTP_loading" class="xl:text-[24px] text-[20px] text-[#FEFEFE] dark:text-[#0f0f0f]">
          ยืนยันรหัส OTP
        </span>

        <div v-else class="mx-auto py-1 w-fit h-fit">
          <svg class=" animate-spin -ml-1 mr-3 xl:h-7 xl:w-7 h-6 w-6 text-white dark:text-[#0f0f0f]"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
        </div>
      </button>
    </div>
    <p
      class="text-[18px] text-[#606060] mx-auto mt-10 mb-3 w-fit 2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] sm:text-[20px] dark:text-[#FEFEFE]">
      กลับที่
      <NuxtLink to="/"
        class="text-[#2E7FF8] underline 2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] sm:text-[20px] dark:text-[#67A4FF]">
        หน้าหลัก</NuxtLink>
    </p>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  otp_code: string
  expire: number
  error: string
}>()
const OTP_loading = ref<boolean>(false)
watch(() => props.error, () => {
  if (props.error !== '') {
    error_status.value = true
    OTP_loading.value = false
  }
})

const dayjs = useDayjs()

const minute = ref<number>(0)
const second = ref<number>(0)
onMounted(() => {
  const interval = setInterval(() => {
    if (props.expire === null) {
      clearInterval(interval)
      return
    }
    const now_time = dayjs().tz('Asia/Bangkok').valueOf()
    const calculate = Number(props.expire) - Number(now_time)

    // calculate minute and second from millisec
    minute.value = Math.floor((calculate % (1000 * 60 * 60)) / (1000 * 60))
    second.value = Math.floor((calculate % (1000 * 60)) / 1000)
    if (calculate <= 0) {
      clearInterval(interval)
    }
  }, 1000)
})

const OTPData = ref<string>('')
const error_status = ref<boolean>(false)

const emit = defineEmits(['checkOtp'])
const verifyOTP = () => {
  if (OTPData.value.length < 4) {
    error_status.value = true
    return
  }
  OTP_loading.value = true
  error_status.value = false
  
  emit('checkOtp', OTPData.value)
}
</script>