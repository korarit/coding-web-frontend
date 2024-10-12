<template>
    <Transition
        enter-active-class="transition ease-out duration-500"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-500"
        leave-from-class="opacity-100 translate-y-full"
        leave-to-class="opacity-0 -translate-y-1"
    >
    <div v-show="show_modal" class="w-fit max-h-[400px] h-fit  bg-[#ffffff] rounded-lg border border-[#C1C1C1] drop-shadow-md overflow-hidden flex flex-col">
        <div class="w-full bg-[#00C7A3] px-3 py-2 drop-shadow-md shadow-black/30">
            <div class="flex items-center space-x-2">
                <font-awesome-icon :icon="['fas', 'bell']" class="text-[24px] text-[#FEFEFE]" />
                <p class="text-[20px] text-[#FEFEFE] ">การแจ้งเตือน</p>
            </div>
        </div>
        <div class="flex flex-col w-[280px] overflow-y-auto px-3 divide-y divide-gray-300">
            <div class="flex space-x-3 py-2 items-center text-[#606060]">
                <div class="h-fit flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'bullhorn']" class="text-[16px] text-[#199c80]" />
                </div>
                <p class="text-[18px] font-light">บันทึกการทำโจทย์</p>
            </div>

            <div class="flex space-x-3 py-2 items-center text-[#606060]">
                <div class="h-fit flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'bullhorn']" class="text-[16px] text-[#199c80]" />
                </div>
                <p class="text-[18px] font-light">บันทึกการทำโจทย์</p>
            </div>

            <div class="flex space-x-3 py-2 items-center text-[#606060]">
                <div class="h-fit flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'bullhorn']" class="text-[16px] text-[#199c80]" />
                </div>
                <p class="text-[18px] font-light">บันทึกการทำโจทย์</p>
            </div>

            <div class="flex space-x-3 py-2 items-center text-[#606060]">
                <div class="h-fit flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'bullhorn']" class="text-[16px] text-[#199c80]" />
                </div>
                <p class="text-[18px] font-light">บันทึกการทำโจทย์</p>
            </div>

            <div class="flex space-x-3 py-2 items-center text-[#606060]">
                <div class="h-fit flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'bullhorn']" class="text-[16px] text-[#199c80]" />
                </div>
                <p class="text-[18px] font-light">บันทึกการทำโจทย์</p>
            </div>

            <div class="flex space-x-3 py-2 items-center text-[#606060]">
                <div class="h-fit flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'bullhorn']" class="text-[16px] text-[#199c80]" />
                </div>
                <p class="text-[18px] font-light">บันทึกการทำโจทย์</p>
            </div>


            <div class="flex space-x-3 py-2 items-center text-[#606060]">
                <div class="h-fit flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'bullhorn']" class="text-[16px] text-[#199c80]" />
                </div>
                <p class="text-[18px] font-light">บันทึกการทำโจทย์</p>
            </div>


            <div class="flex space-x-3 py-2 items-center text-[#606060]">
                <div class="h-fit flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'bullhorn']" class="text-[16px] text-[#199c80]" />
                </div>
                <p class="text-[18px] font-light">บันทึกการทำโจทย์</p>
            </div>

            <div class="flex space-x-3 py-2 items-center text-[#606060]">
                <div class="h-fit flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'bullhorn']" class="text-[16px] text-[#199c80]" />
                </div>
                <p class="text-[18px] font-light">บันทึกการทำโจทย์</p>
            </div>

            <div class="flex space-x-3 py-2 items-center text-[#606060]">
                <div class="h-fit flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'bullhorn']" class="text-[16px] text-[#199c80]" />
                </div>
                <p class="text-[18px] font-light">บันทึกการทำโจทย์</p>
            </div>
        </div>
    </div>
    </Transition>
</template>

<script setup>

const props = defineProps({
    show: Boolean,
    data: Object
})

const show_modal = ref(false)

watch(() => props.show, (val) => {
  if(val) {
    show_modal.value = true
  } else {
    show_modal.value = false
  }
})

const { signOut } = useAuth()
</script>