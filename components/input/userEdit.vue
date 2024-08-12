<template>
    <div class="grid grid-cols-3 gap-4 mb-4 sm:grid sm:grid-cols-5 sm:gap-5 sm:mb-6">
        <b class="col-span-3 sm:col-span-1 text-[20px] w-fit flex items-center text-[#1A1A1A] dark:text-[#FEFEFE] 2xl:text-[23px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[15px]">
            {{ props.title }}
        </b>

        <div class="col-span-2 sm:col-span-3">
            <input 
                type="text" 
                :placeholder="props.placeholder" 
                v-model="new_input"
                :disabled="!open_edit"
                class="w-full border-2 p-2 sm:disabled:bg-white sm:dark:disabled:bg-[#3D3D3D] text-[#1F1F1F] text-[14px] dark:text-[#FEFEFE] border-[#C2C2C2] placeholder-[#1F1F1F] dark:placeholder-[#FEFEFE] rounded-lg hover:border-gray-500 dark:bg-[#262626] dark:border-[#626262] dark:hover:border-[#CFCFCF] 2xl:text-[22px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px]" />
        </div>

        <button
            v-show="!open_edit"
            @click="open_edit = !open_edit"
            class="bg-[#00C7A3] hover:bg-[rgb(25,156,128)] shadow-xl text-[#FFFFFF] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] rounded-lg drop-shadow-md 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[16px] sm:text-[14px]">
            แก้ไข
        </button>
    </div>

    <div v-show="open_edit" class="grid grid-cols-4 gap-4 mb-4 sm:grid sm:grid-cols-5 sm:gap-6 sm:mb-6">
        <button class></button>
        <button
            @click="update"
            class="border rounded-lg bg-[#00C7A3] hover:bg-[rgb(25,156,128)] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] shadow-lg pl-0.5 py-1 sm:p-1 text-[#FFFFFF] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[12px]">
            บันทึก
        </button>
        <button
            @click="cancelEdit"
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

    value: string|number
    error: string
}>()

const emit = defineEmits(['update'])

const new_input = ref<string|number>(props.value)
const open_edit = ref<boolean>(false)

const old_input = ref<string|number>(props.value)

const cancelEdit = () => {
    open_edit.value = false
    new_input.value = old_input.value
}

const update = () => {
    emit('update', props.edit_form, new_input.value)
    open_edit.value = false
    old_input.value = new_input.value
}
</script>