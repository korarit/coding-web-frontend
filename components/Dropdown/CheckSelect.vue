<template>
    <div :class="`relative ${props.blockClass}`" ref="dropdownRef">
        <button 
            @click="setDropdownStatus"
            :class="props.customclass"
        >
            <p>{{ props.list_data[idselect] }}</p>

            <font-awesome-icon 
                :icon="['fas', props.icon]"
                :class="dropdown_status ? iconClass+' transition duration-300 rotate-180' : iconClass+' transition duration-300 rotate-0'" 
            />
        </button>

        <transition enter-active-class="transform transition duration-500 ease-custom"
            enter-class="-translate-y-1/2 scale-y-0 opacity-0" enter-to-class="translate-y-0 scale-y-100 opacity-100"
            leave-active-class="transform transition duration-300 ease-custom"
            leave-class="translate-y-0 scale-y-100 opacity-100" leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
        >
            <div v-if="dropdown_status && props.heightList != undefined" tabindex="1"
                class="absolute z-20 left-0 right-0 mt-2 w-full bg-white dark:bg-[#3d3d3d] border border-[#8c8c8c] dark:border-[#686868] divide-y rounded-md shadow-lg overflow-hidden">
                 <div class="py-2 flex gap-2 w-full">
                    <div :style="{ maxHeight: `${props.heightList}` }" :class="` grid grid-cols-1 gap-y-2 overflow-auto w-full px-2`">
                        <button v-for="(data, index) in props.list_data" @click="selectId(index)" class="hover:bg-[#e0e0e0] dark:hover:bg-[#5a5a5a] w-full rounded-md py-2 px-2 flex items-center justify-between">
                            <p class="text-[16px] w-fit text-left text-[#262626] dark:text-[#FEFEFE] leading-5 mr-6">{{ data }}</p>
                            <font-awesome-icon :icon="['fas', 'check']" class="text-[#00C7A3] text-[18px]" v-if="index == idselect" />
                        </button>
                    </div>
                </div>  
            </div>
        </transition>
    </div>
</template>


<script setup lang="ts">


//set v-model
const datamodal = defineModel()
const idselect = ref<number>(0)

//props data
const props = defineProps({
    list_data: {
        type: Array,
        default: () => []
    },
    customclass: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: 'chevron-down'
    },
    iconClass: {
        type: String,
        default: 'text-[18px] h-4'
    },
    off: {
        type: Boolean,
        default: false
    },
    blockClass: {
        type: String,
        default: 'w-fit'
    },
    heightList: {
        type: String,
        default: '200px'
    },
    placeholder: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['select'])
const selectId = (id: number) => {
    idselect.value = id
    datamodal.value = id

    emit('select')
    setTimeout(() => {
        dropdown_status.value = false
    }, 250)
}

const dropdown_status = ref(false)
const dropdownRef = ref(null)

const setDropdownStatus = () => {
    if (props.off) return
    dropdown_status.value = !dropdown_status.value
}

onClickOutside(dropdownRef, () => {
  dropdown_status.value = false
})

// เพิ่ม watch เพื่ออัปเดต datamodal เมื่อ idselect เปลี่ยน
watch(idselect, (newValue: number|null) => {
  datamodal.value = newValue
})

watch(datamodal, (newValue) => {
  idselect.value = newValue as number
})
</script>