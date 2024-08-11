<template>
    <input
        v-model="password"
        type="password"
        :class="(props.show_warning) ? props.class_input_warning : props.class_input"
        :placeholder="props.placeholder"
    />
    <div v-if="password !== '' && props.show_warning !== true" class="select-none w-full my-2">
        <div class="flex h-2 border border-grey-30 rounded w-full">
            <div
                :style="{ width: `${width}%` }"
                :class="description.color"
                class="progress-bar flex h-full"
            />
        </div>

        <p class="mt-1" :class="fontsize_strength">
            {{ description.label }}
        </p>
    </div>
    <p v-if="show_warning" :class="props.class_warning">{{ warning }}</p>
    
</template>
<script setup lang="ts">
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core'
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en'

const props = defineProps<{
    placeholder: string
    fontsize_strength: string
    warning: string
    show_warning: boolean

    class_input: string
    class_input_warning: string
    
    class_warning: string
}>()

const descriptions = ref([
    {color: 'bg-red-600', label: 'Weak, my 2 years old son can break it!'},
    {color: 'bg-red-400', label: 'Still weak, keep on trying!'},
    {color: 'bg-yellow-400', label: 'We are getting there...'},
    {color: 'bg-green-400', label: 'Nice, but you can still do better'},
    {color: 'bg-green-600', label: 'Congratulations, you made it!'},
])


const password = ref<string>('')
const score = ref<number>(0)
const description = ref<any | null>(null)
const width = computed(() => (score.value / 5) * 100)


const modal = defineModel('password')
const password_strength = defineModel('password_strength')

watch(() => password.value, (val) => {
    const hasValue = val.length > 0 && val !== '';

    if (!hasValue){
        modal.value = ''
        score.value = 0;
        return
    }
    const score_cal = zxcvbn(val).score + 1;
    
    description.value = descriptions.value[score_cal - 1]
    score.value = score_cal

    //password score strenght return back
    password_strength.value = score_cal

    //password return back
    modal.value = val
})

onMounted(() => {
    zxcvbnOptions.setOptions({
    dictionary: {
        ...zxcvbnCommonPackage.dictionary,
        ...zxcvbnEnPackage.dictionary,
      },
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    translations: zxcvbnEnPackage.translations,
    });
})

</script>