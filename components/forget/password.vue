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
    <form>
      <div class="text-[28px]">
        <InputPassword
          class_input="border-2 w-full text-[18px] text-[#606060] border-[#c2c2c2] rounded-lg py-1 pl-4 mt-8 font-light 2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] sm:text-[20px] dark:bg-[#282828] dark:border-[#101010] dark:text-[#BEBEBE]"
          class_input_warning="border-2 w-full text-[18px] text-[#606060] border-red-500 rounded-lg py-1 pl-4 mt-8 font-light 2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] sm:text-[20px] dark:bg-[#282828] dark:border-[#101010] dark:text-[#BEBEBE]"
          class_warning="text-red-500 text-[14px] font-light" :show_warning="password_warning !== ''"
          :warning="password_warning" placeholder="Password" fontsize_strength="text-[20px]" v-model:password="password"
          v-model:password_strength="password_strength" />
      </div>
      <div class="text-[28px]">
        <InputWarning 
          type="password" placeholder="ยืนยันรหัสผ่าน"
          warning="รหัสผ่านไม่ตรงกัน"
          :show_warning="password !== '' && password_confirm !== '' && password !== password_confirm"
          class_input="border-2 w-full text-[18px] text-[#606060] border-[#c2c2c2] my-6 py-1 rounded-lg pl-4 font-light 2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] sm:text-[20px] dark:bg-[#282828] dark:border-[#101010] dark:text-[#BEBEBE]"
          class_input_warning="border-2 w-full text-[18px] text-[#606060] border-red-500 my-6 py-1 rounded-lg pl-4 font-light 2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] sm:text-[20px] dark:bg-[#282828] dark:border-[#101010] dark:text-[#BEBEBE]"
          class_warning="mb-2 text-red-500 text-[14px] font-light" :StringCheck="/^[a-zA-Z0-9@.!#+*-?^&]*$/"
          v-model="password_confirm" />
      </div>
      <div class="">
        <button
          class="bg-[#00C7A3] text-[#FEFEFE] drop-shadow-md w-full hover:bg-[rgb(25,156,128)] text-[20px] rounded-lg px-18 py-[6px] lg:py-2 2xl:text-[24px] xl:text-[24px] lg:text-[20px] md:text-[16px] sm:text-[20px] dark:bg-[#3DD6BA] dark:text-[#0F0F0F] dark:hover:bg-[#00C7A3]">
          ตั้งรหัสผ่านใหม่
        </button>
      </div>
      <p
        class="text-[18px] text-[#606060] mx-auto my-9 w-fit 2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] sm:text-[20px] dark:text-[#FEFEFE]">
        กลับที่
        <ins
          class="text-[#2E7FF8] 2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] sm:text-[20px] dark:text-[#67A4FF]">หน้าหลัก</ins>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">

const password = ref<string>('')
const password_confirm = ref<string>('')

const password_strength = ref<number>(0)
const password_warning = ref<string>('')
</script>