<template>
    <div class="grid grid-cols-3 gap-4 mb-4 sm:grid sm:grid-cols-5 sm:gap-5 sm:mb-6">
        <b
            class="col-span-3 sm:col-span-1 text-[20px] w-fit flex items-center text-[#1A1A1A] dark:text-[#FEFEFE] 2xl:text-[23px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[15px]">
            {{ props.title }}
        </b>

        <div class="col-span-2 sm:col-span-3">
            <input type="text" :placeholder="props.placeholder" v-model="new_input" :disabled="!open_edit"
                class="w-full border-2 p-2 sm:disabled:bg-white sm:dark:disabled:bg-[#3D3D3D] text-[#1F1F1F] text-[14px] dark:text-[#FEFEFE] border-[#C2C2C2] placeholder-[#1F1F1F] dark:placeholder-[#FEFEFE] rounded-lg hover:border-gray-500 dark:bg-[#262626] dark:border-[#626262] dark:hover:border-[#CFCFCF] 2xl:text-[22px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px]" />
        </div>

        <button v-show="!open_edit" @click="openEdit"
            class="bg-[#00C7A3] hover:bg-[rgb(25,156,128)] shadow-xl text-[#FFFFFF] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] rounded-lg drop-shadow-md 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[16px] sm:text-[14px]">
            แก้ไข
        </button>
    </div>

    <div v-show="open_edit" class="grid grid-cols-4 gap-4 mb-4 sm:grid sm:grid-cols-5 sm:gap-6 sm:mb-6">
        <button class></button>
        <button @click="update"
            class="border rounded-lg bg-[#00C7A3] hover:bg-[rgb(25,156,128)] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] shadow-lg pl-0.5 py-1 sm:p-1 text-[#FFFFFF]">
            <span v-if="!loading_status" class="2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[12px] text-white dark:text-[#0F0F0F]">
                บันทึก
            </span>

            <div v-else class="mx-auto py-1 w-fit h-fit">
                <svg class=" animate-spin -ml-1 mr-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 2xl:h-6 2xl:w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
            </div>
        </button>
        <button @click="cancelEdit"
            class="border rounded-lg bg-[#D41E30] hover:bg-[#ad313e] dark:text-[#FFFFFF] dark:bg-[#E41E31] dark:hover:bg-[#D41E30] shadow-lg sm:p-1 text-[#FFFFFF] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[12px]">
            ยกเลิก
        </button>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string
    placeholder: string
    edit_form: string
    have_wait: boolean
    wait: boolean
    reset: boolean

    value: string | number
    error: string
}>()


const emit = defineEmits(['update'])

const new_input = ref<string | number>(props.value)
const open_edit = ref<boolean>(false)

const old_input = ref<string | number>(props.value)

const openEdit = () => {
    open_edit.value = true
    loading_status.value = false
}

const cancelEdit = () => {
    open_edit.value = false
    new_input.value = old_input.value
}

const update = () => {
    if (new_input.value === old_input.value) {
        open_edit.value = false
        return
    }
    emit('update', props.edit_form, new_input.value)
    loading_status.value = true
    if (props.have_wait) {
        return
    }
    open_edit.value = false
    old_input.value = new_input.value
}

const loading_status = ref<boolean>(false)
watch(() => props.wait, (val) => {
    if (val) {
        loading_status.value = true
    }

    if(val === false){
        open_edit.value = false
    }


});

watch(() => props.reset, (val) => {
    if (val) {
        new_input.value = old_input.value
    }
})
</script>