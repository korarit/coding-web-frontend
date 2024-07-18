<template>
    <div class="py-2 flex gap-2 w-full">
      <div class="grid grid-cols-1 gap-y-2 h-[200px] overflow-auto w-full px-2">
            <button v-for="(data, index) in props.list_data" @click="selectId(index)" class="hover:bg-[#e0e0e0] w-full rounded-md py-2 px-2 flex items-center justify-between">
                <p class="text-[16px] w-fit text-left text-[#262626] leading-5 mr-6">{{ data }}</p>
                <font-awesome-icon :icon="['fas', 'check']" class="text-[#00C7A3] text-[18px]" v-if="index == idselect" />
            </button>
      </div>
  
  
    </div>
  </template>
  
  
  <script setup>
  import LangData from '~/assets/json/editor_lang.json'
  
//set v-model
const datamodal = defineModel()
const idselect = ref(0)

//props data
const props = defineProps({
    list_data: {
        type: Array,
        default: []
    }
})
  
const selectId = (id) => {
    idselect.value = id
    datamodal.value = id
}
</script>