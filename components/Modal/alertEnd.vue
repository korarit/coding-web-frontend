<template>
  <div class="w-full h-[100dvh] bg-[#00000048] absolute z-10 flex justify-center items-center">

    <Transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 translate-y-full"
      enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-300"
      leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-full">
      <div v-show="show_modal" class="bg-white dark:bg-[#3D3D3D] dark:border-[#676767] p-6 rounded-lg shadow-lg w-[90dvw] sm:w-96 xl:w-[32dvw]">
        
        <div class="flex w-full flex-col sapce-y-4">
          <sweetalert-icons :icon="icon" />

          <p class="text-[20px] text-center">{{ props.message }}</p>

          <div v-if="icon == 'success'" class="flex space-x-3 w-fit mt-6 mx-auto">
            <NuxtLink :href="linkToMain" class="w-fit bg-[#00C7A3] hover:bg-[#35bca3] text-white text-center px-3 py-2 rounded-lg">กลับไปยังรายการโจทย์</NuxtLink>
            <NuxtLink :href="$props.linkToEdit" class="w-fit bg-red-500 hover:bg-red-600 text-white text-center px-3 py-2 rounded-lg">แก้ไขโจทย์</NuxtLink>
          </div>
          <div v-else class="flex space-x-3 w-fit mt-6 mx-auto">
            <button @click="closeModal" class="w-fit bg-[#00C7A3] hover:bg-[#35bca3] text-white px-3 py-2 rounded-lg">แก้ไขโจทย์</button>
            <NuxtLink :href="linkToMain" class="w-fit bg-red-500 hover:bg-red-600 text-white text-center px-3 py-2 rounded-lg">ยกเลิก</NuxtLink>
          </div>
        </div>
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



const props = defineProps({
  show: Boolean,
  message: String,
  icon: String,

  linkToEdit: String,
  linkToMain: String
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