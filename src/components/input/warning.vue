<template>
    <input
        :value="input"
        :type="type"
        :class="props.show_warning ? props.class_input_warning : props.class_input"
        :placeholder="props.placeholder"
        @input="checkInput"
    />
    <p v-if="show_warning" :class="props.class_warning">{{ warning }}</p>
</template>

<script setup lang="ts">

const props = defineProps<{
    type: string
    placeholder: string
    warning: string
    show_warning: boolean

    class_input: string
    class_input_warning: string

    class_warning: string
    StringCheck: RegExp
}>()

const input = ref<string>('')
const modal = defineModel()

function checkInput(event: Event) {
    const inputElement = event.target as HTMLInputElement
    const newValue = inputElement.value
    
    if (props.StringCheck.test(newValue) || newValue === '') {
        input.value = newValue
        modal.value = newValue
    } else {
        // ถ้าไม่ตรงกับ regex ให้กลับไปใช้ค่าเดิม
        inputElement.value = input.value
        modal.value = input.value
    }
}

</script>