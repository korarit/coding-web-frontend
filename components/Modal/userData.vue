<template>
    <Transition
        enter-active-class="transition ease-out duration-500"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-500"
        leave-from-class="opacity-100 translate-y-full"
        leave-to-class="opacity-0 -translate-y-1"
    >
    <div v-show="show_modal" class="w-fit h-fit p-3 bg-[#ffffff] rounded-lg border border-[#C1C1C1] drop-shadow-md">
        <div class="flex flex-col space-y-3 w-fit min-w-[270px]">
            <div class="flex space-x-3 items-center">
                <div class="w-[64px] h-[64px] rounded-full bg-[#00C7A3] flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'user']" class="text-[32px] text-white" />
                </div>
                <p class="text-[20px] text-[#262626] font-medium">ชื่อผู้ใช้</p>
            </div>

            <div class="bg-[#EBEBEB] h-px w-full"></div>

            <button class="flex space-x-3 items-center text-[#606060] hover:text-[#262626]">
                <div class="w-[64px] h-fit flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'gear']" class="text-[32px] " />
                </div>
                <p class="text-[20px] font-light">ตั้งค่าของผู้ใช้</p>
            </button>

            <div class="bg-[#EBEBEB] h-px w-full"></div>

            <button class="flex space-x-3 items-center text-[#606060] hover:text-[#262626]">
                <div class="w-[64px] h-fit flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'circle-question']" class="text-[32px] " />
                </div>
                <p class="text-[20px] font-light">บันทึกการทำโจทย์</p>
            </button>

            <div class="bg-[#EBEBEB] h-px w-full"></div>

            <button class="flex space-x-3 items-center text-[#606060] hover:text-[#262626]">
                <div class="w-[64px] h-fit flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'book-bookmark']" class="text-[32px] " />
                </div>
                <p class="text-[20px] font-light">โจทย์ที่บันทึกไว้</p>
            </button>

            <div class="bg-[#EBEBEB] h-px w-full"></div>

            <button class="flex space-x-3 items-center text-[#606060] hover:text-[#262626]">
                <div class="w-[64px] h-fit flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'award']" class="text-[32px] " />
                </div>
                <p class="text-[20px] font-light">ลำดับภายในเว็บไซต์</p>
            </button>

            <div class="bg-[#EBEBEB] h-px w-full"></div>

            <button class="flex space-x-3 items-center text-[#606060] hover:text-[#262626]">
                <div class="w-[64px] h-fit flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="text-[32px] " />
                </div>
                <p class="text-[20px] font-light">ออกจากระบบ</p>
            </button>
        </div>
    </div>
    </Transition>
</template>

<script setup>
const props = defineProps({
  show: Boolean
})

const show_modal = ref(false)

watch(() => props.show, (val) => {
  if(val) {
    show_modal.value = true
  } else {
    show_modal.value = false
  }
})
</script>