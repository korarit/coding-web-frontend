<template>
    <div class="relative w-fit" ref="dropdownRef">
        <button 
            @click="dropdown_status = !dropdown_status"
            :class="props.customclass"
        >
            <p class="text-[18px] font-light leading-5">{{ props.list_data[idselect] }}</p>

            <font-awesome-icon 
                :icon="['fas', 'chevron-down']" class="text-[18px] h-4 transition duration-300"
                :class="dropdown_status ? 'rotate-180' : 'rotate-0'" 
            />
        </button>

        <transition enter-active-class="transform transition duration-500 ease-custom"
            enter-class="-translate-y-1/2 scale-y-0 opacity-0" enter-to-class="translate-y-0 scale-y-100 opacity-100"
            leave-active-class="transform transition duration-300 ease-custom"
            leave-class="translate-y-0 scale-y-100 opacity-100" leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
        >
            <div v-if="dropdown_status" tabindex="1"
                class="absolute z-20 left-0 right-0 mt-1 w-full bg-white border border-[#8c8c8c] divide-y rounded-md shadow-lg overflow-hidden">
                 <div class="py-2 flex gap-2 w-full">
                        <div class="grid grid-cols-1 gap-y-2 h-[200px] overflow-auto w-full px-2">
                        <button v-for="(data, index) in props.list_data" @click="selectId(index)" class="hover:bg-[#e0e0e0] w-full rounded-md py-2 px-2 flex items-center justify-between">
                            <p class="text-[16px] w-fit text-left text-[#262626] leading-5 mr-6">{{ data }}</p>
                            <font-awesome-icon :icon="['fas', 'check']" class="text-[#00C7A3] text-[18px]" v-if="index == idselect" />
                        </button>
                        </div>
                </div>  
            </div>
        </transition>
    </div>
</template>


<script setup>

//set v-model
const datamodal = defineModel()
const idselect = ref(0)

//props data
const props = defineProps({
    list_data: {
        type: Array,
        default: () => []
    },
    customclass: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['select'])
const selectId = (id) => {
    idselect.value = id
    datamodal.value = id

    emit('select')
    setTimeout(() => {
        dropdown_status.value = false
    }, 250)
}

const dropdown_status = ref(false)
const dropdownRef = ref(null)

onClickOutside(dropdownRef, () => {
  dropdown_status.value = false
})

// เพิ่ม watch เพื่ออัปเดต datamodal เมื่อ idselect เปลี่ยน
watch(idselect, (newValue) => {
  datamodal.value = newValue
})
</script>