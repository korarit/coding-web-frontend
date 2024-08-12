<template>
  <div class="w-auto h-fit">
    <h1
      class="text-[#00c7A3] text-[38px] mb-10 leading-[48px] 2xl:text-[64px] xl:text-[60px] lg:text-[56px] md:text-[52px] md:mt-[70px] sm:text-[48px] dark:text-[#00C7A3]">
      สร้างรหัสผ่าน
    </h1>
    <p
      class="text-[#606060] text-[23px] leading-8 2xl:text-[32px] xl:text-[30px] lg:text-[28px] md:text-[26px] sm:text-[24px] dark:text-[#FEFEFE]">
      กรอก รหัสผ่านใหม่ ที่ตรงนี้
    </p>
      <div class="text-[28px]">
        <InputPassword
          class_input="border-2 w-full text-[18px] text-[#606060] border-[#c2c2c2] rounded-lg py-1 pl-4 mt-8 font-light 2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] sm:text-[20px] dark:bg-[#282828] dark:border-[#101010] dark:text-[#BEBEBE]"
          class_input_warning="border-2 w-full text-[18px] text-[#606060] border-red-500 rounded-lg py-1 pl-4 mt-8 font-light 2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] sm:text-[20px] dark:bg-[#282828] dark:border-[#101010] dark:text-[#BEBEBE]"
          class_warning="text-red-500 text-[14px] font-light" :show_warning="password_warning !== ''"
          :warning="password_warning" placeholder="Password" fontsize_strength="text-[20px]" v-model:password="password"
          v-model:password_strength="password_strength" />
      </div>
      <div class="text-[28px]" :class="password.length === 0 ? 'my-6' : 'mt-2 mb-2'">
        <InputWarning 
          type="password" placeholder="ยืนยันรหัสผ่าน"
          warning="รหัสผ่านไม่ตรงกัน"
          :show_warning="password !== '' && password_confirm !== '' && password !== password_confirm"
          class_input="border-2 w-full text-[18px] text-[#606060] border-[#c2c2c2] py-1 rounded-lg pl-4 font-light 2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] sm:text-[20px] dark:bg-[#282828] dark:border-[#101010] dark:text-[#BEBEBE]"
          class_input_warning="border-2 w-full text-[18px] text-[#606060] border-red-500 py-1 rounded-lg pl-4 font-light 2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] sm:text-[20px] dark:bg-[#282828] dark:border-[#101010] dark:text-[#BEBEBE]"
          class_warning="mb-2 text-red-500 text-[14px] font-light" :StringCheck="/^[a-zA-Z0-9@.!#+*-?^&]*$/"
          v-model="password_confirm" />
      </div>
      <div class="">
        <button
          @click="setPassword"
          class="bg-[#00C7A3] drop-shadow-md w-full hover:bg-[rgb(25,156,128)] rounded-lg px-18 py-[6px] lg:py-2  dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3]">
          <span v-if="!setPasswordStatus" class="xl:text-[24px] text-[20px] text-[#FEFEFE] dark:text-[#0f0f0f]">
            ตั้งรหัสผ่านใหม่
          </span>

          <div v-else class="mx-auto py-1 w-fit h-fit">
            <svg class=" animate-spin -ml-1 mr-3 xl:h-7 xl:w-7 h-6 w-6 text-white dark:text-[#0f0f0f]" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </div>

        </button>
      </div>
      <p
        class="text-[18px] text-[#606060] mx-auto my-9 w-fit 2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] sm:text-[20px] dark:text-[#FEFEFE]">
        กลับที่
        <NuxtLink to="/" class="text-[#2E7FF8] underline 2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] sm:text-[20px] dark:text-[#67A4FF]">หน้าหลัก</NuxtLink>
      </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: string
}>()

const setPasswordStatus= ref<boolean>(false)

//check error
watch(() => props.error, (value) => {
  if (value !== '') {
    setPasswordStatus.value = false
  }
})

const password = ref<string>('')
const password_confirm = ref<string>('')

const password_strength = ref<number>(0)
const password_warning = ref<string>('')

const emit = defineEmits(['resetPassword'])
const setPassword = () => {
  if (password.value !== password_confirm.value) {
    password_warning.value = 'รหัสผ่านไม่ตรงกัน'
    return
  }
  password_warning.value = ''
  setPasswordStatus.value = true

  emit('resetPassword', password.value) 
}

</script>