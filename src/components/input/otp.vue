<template>
    <div ref="container" :class="class_container">
        <div class="relative w-fit h-full" v-for="n in props.count_input" :key="n">
            <input maxlength="1"
                :class="class_input"
                type="text" 

                v-model="otpArray[n-1]"
                @keyup="e => handleEnter(e, n-1)"
                @click="checkInput(n-1)"
            />
            <div :class="class_container_line">
                <div :class="class_line"></div>
            </div>
        </div>
    </div>
    
</template>

<script setup lang="ts">
const props = defineProps<{
    count_input: number
    class_container: string
    class_input: string
    class_container_line: string
    class_line: string

    error_status: boolean
}>()

const otpArray = ref<string[]|null[]>([])
const container = ref<HTMLElement>()

const model = defineModel()


function handleEnter(e: any , index: number) {
    const childen = container.value?.children
    if (childen === undefined) {
        return
    }
    const keypress = e.key
    // console.log("keypress")
    if (index > 0 && (keypress === 'Backspace' || keypress === 'Delete')) {
        otpArray.value[index] = null
        // console.log("backspace")
        setTimeout(() => {
            childen[index - 1].querySelector('input')?.focus()
        }, 50)
    } else{
        const macth = keypress.match(/[0-9]/)
        if (!macth) {
            otpArray.value[index] = null;
            return
        }else if (index < props.count_input - 1) {
            // console.log("index", index)
            setTimeout(() => {
                childen[index + 1].querySelector('input')?.focus()
                console.log("focus", childen[index + 1])
            }, 50)
        }

        if(macth) {
            model.value = otpArray.value.join('')
        }
    }
}

function checkInput(index: number) {
    const childen = container.value?.children
    if (childen === undefined) {
        return
    }
    if (otpArray.value.length === 0) {
        childen[0]?.querySelector('input')?.focus()
    }

    //check in array otpArray is last not null
    otpArray.value.forEach((otp, i) => {
        if (otp !== null && i >= 0) {
            childen[i + 1]?.querySelector('input')?.focus();
            return
        }
    })
    
}

watch(() => props.error_status, (val) => {
    //change color input when error
    if(val) {
        const childen = container.value?.children
        if (childen === undefined) {
            return
        }
        Array.from(childen).forEach((child: Element, i: number) => {
            const element = child as HTMLElement;
            // Rest of the code...
            element.querySelector('input')?.classList.remove('border-[#c2c2c2]')
            element.querySelector('input')?.classList.remove('dark:border-[#101010]')
            element.querySelector('input')?.classList.add('border-red-500')
        });
    }
})
//remove class border-red-500 when input is change
watch(() => model.value, (val) => {
    const childen = container.value?.children
    if (childen === undefined) {
        return
    }
    Array.from(childen).forEach((child: Element, i: number) => {
        const element = child as HTMLElement;
        // Rest of the code...
        element.querySelector('input')?.classList.remove('border-red-500')

        element.querySelector('input')?.classList.add('border-[#c2c2c2]')
         element.querySelector('input')?.classList.add('dark:border-[#101010]')
    });

    if(val === '') {
        childen[0]?.querySelector('input')?.focus()
        otpArray.value = []
    }
})
</script>