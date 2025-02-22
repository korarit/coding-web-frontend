<template>
  <div class="w-auto h-fit">
    <h1
      class="text-[#00c7A3] text-[38px] leading-[48px] 2xl:text-[64px] xl:text-[60px] lg:text-[56px] md:text-[52px] md:mt-[70px] sm:text-[48px] dark:text-[#00C7A3]">
      เข้าสู่ระบบ
    </h1>
    <p
      class="text-[#606060] text-[23px] my-8 leading-8 2xl:text-[32px] xl:text-[30px] lg:text-[28px] md:text-[26px] sm:text-[24px] dark:text-[#FEFEFE]">
      ด้วยรหัสผ่านใหม่ ที่ท่านได้ตั้ง
    </p>
      <div class="">
        <button
          @click="openLogin"
          class="bg-[#00C7A3] text-[#FEFEFE] drop-shadow-md w-full hover:bg-[rgb(25,156,128)] text-[20px] rounded-lg px-18 py-[6px] lg:py-2 2xl:text-[24px] xl:text-[24px] lg:text-[20px] md:text-[16px] sm:text-[20px] dark:bg-[#3DD6BA] dark:text-[#0F0F0F] dark:hover:bg-[#00C7A3]"
        >
          เข้าสู่ระบบ

          
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
const {open_modal_login} = useLoginModalControl()
const {open_modal} = useModalControl()

const openLogin = () => {
    open_modal_login()
    open_modal()
}



</script>