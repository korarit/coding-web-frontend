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
            <div v-show="show_modal" class="bg-white dark:bg-[#3D3D3D] dark:border-[#676767] p-6 rounded-lg shadow-lg w-[90dvw] sm:w-96 2xl:w-[35dvw]">
                <div class="flex w-full justify-between items-center">
                    <p class="text-[26px] lg:text-[34px] xl:text-[32px] 2xl:text-[36px] text-[#00c7a3]">อัพโหลดรูป</p>
                </div>
            </div>
        </transition>
    </div>
</template>
<script setup lang="ts">

const props = defineProps({
    show: Boolean
})

const show_modal = ref(false)

watch(() => props.show, (val) => {
    show_modal.value = val
})


const emit = defineEmits(['closeModal', 'login'])
const closeModal = () => {
    show_modal.value = false
    setTimeout(() => {
        emit('closeModal')
    }, 300)
}
</script>