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
    <div v-show="show_modal" class="bg-white p-6 rounded-lg shadow-lg w-[90dvw] sm:w-96 2xl:w-[24dvw]">
      <div class="flex justify-between">
        <div>
          <h2 class="text-[26px] lg:text-[34px] xl:text-[32px] 2xl:text-[36px] text-[#00c7a3]">
            ยินดีต้อนรับกลับมา!
          </h2>
          <p class="text-[22px] 2xl:text-[28px] text-[#606060] mb-4">เข้าสู่ระบบบัญชีของคุณ</p>
        </div>
        <button class="flex items-center justify-center w-[15%]" @click="closeModal">
          <font-awesome-icon :icon="['fas', 'xmark']"
            class="text-[34px] lg:text-[42px] xl:text-[40px] 2xl:text-[56px] text-[#606060] hover:text-[#000000] active:text-black" />
        </button>
      </div>

      <form>
        <div class="mb-4">
          <label for="username" class="sr-only">Username / Email</label>
          <input type="text" id="username" placeholder="Username / Email"
            class="w-full p-2 border border-gray-300 rounded hover:border-gray-500 2xl:text-[20px] placeholder:font-light" />
        </div>
        <div class="mb-4">
          <label for="password" class="sr-only">Password</label>
          <input type="password" id="password" placeholder="Password"
            class="w-full p-2 border border-gray-300 rounded hover:border-gray-500 2xl:text-[20px] placeholder:font-light" />
        </div>
        <div class="flex items-center justify-between mb-4">
          <label class="flex items-center text-sm 2xl:text-[20px] text-gray-600">
            <input type="checkbox" class="mr-2 h-4 w-4" />
            จดจำฉัน
          </label>
          <p class="text-blue-500 hover:text-blue-700 text-sm 2xl:text-[20px]">
            <a href="#" class="underline underline-offset-2">ลืมรหัสผ่าน</a>?
          </p>
        </div>

        <button @click="" type="submit" class="w-full bg-[#00C7A3] hover:bg-[#199c80] active:bg-[#199c80] 2xl:text-[24px] text-white p-2 rounded">
          เข้าสู่ระบบ
        </button>
        <p class="text-center text-sm 2xl:text-[20px] my-4 text-[#606060]">หรือเข้าสู่ระบบด้วย</p>
        <div class="flex justify-center space-x-4 mb-4">
          <a href="#" class="text-gray-600 hover:text-black">
            <font-awesome-icon :icon="['fab', 'github']" class="text-[36px]" />
          </a>
          <a href="#" class="text-gray-600 hover:text-black">
            <font-awesome-icon :icon="['fab', 'facebook']" class="text-[36px]" />
          </a>
          <a href="#" class="text-gray-600 hover:text-black">
            <font-awesome-icon :icon="['fab', 'google']" class="text-[36px]" />
          </a>
          <a href="#" class="text-gray-600 hover:text-black">
            <font-awesome-icon :icon="['fab', 'windows']" class="text-[36px]" />
          </a>
        </div>
        <p class="text-center text-sm 2xl:text-[20px] text-[#606060]">
          ยังไม่มีบัญชีหรือ
          <a href="#" class="text-blue-500 hover:text-blue-700 underline underline-offset-2">สมัคร</a>
          เลย
        </p>
      </form>
    </div>
    </transition>
  </div>

</template>

<style>
.ease-custom {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
<script setup>
import { set } from '@vueuse/core';



const props = defineProps({
  show: Boolean
})

const show_modal = ref(false)

watch(() => props.show, (val) => {
  show_modal.value = val
})


const emit = defineEmits(['closeModal'])
const closeModal = () => {
  show_modal.value = false
  setTimeout(() => {
    emit('closeModal')
  }, 300)
}


</script>