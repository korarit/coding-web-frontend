<template>
  <div class="w-full h-[100dvh] bg-[#00000048] absolute z-10 flex justify-center items-center">

    <Transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 translate-y-full"
      enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-300"
      leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-full">
      <div v-show="show_modal" class="bg-white dark:bg-[#3D3D3D] dark:border-[#676767] p-6 rounded-lg shadow-lg w-[90dvw] sm:w-96 xl:w-[32dvw]">
        
        <div class="flex w-full flex-col sapce-y-4">
          <sweetalert-icons :icon="icon" />

          <p class="text-[20px] text-center">{{ props.message }}</p>

          <div class="flex space-x-3 w-fit mt-6 mx-auto" v-if="loading === false">
            <button @click="comfirm" class="w-fit bg-[#00C7A3] hover:bg-[#35bca3] text-white px-3 py-2 rounded-lg">ยืนยัน</button>
            <button @click="closeModal" class="w-fit bg-red-500 hover:bg-red-600 text-white text-center px-3 py-2 rounded-lg">ยกเลิก</button>
          </div>
          <div class="flex items-center space-x-2 w-fit mt-6 mx-auto" v-else>
            <svg class=" animate-spin -ml-1 h-[28px] w-[28px] text-[#303030] dark:text-[#FEFEFE]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>

            <p class="text-[20px] text-[#303030] dark:text-[#FEFEFE]">{{ props.loadingMessage }}</p>
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
  linkToMain: String,

  loading: Boolean,
  loadingMessage: String

})

const show_modal = ref(false)

watch(() => props.show, (val) => {
  show_modal.value = val
})


const emit = defineEmits(['closeModal', 'comfirm'])

const closeModal = () => {
  emit('closeModal')
}

const comfirm = () => {
  emit('comfirm');
}

</script>