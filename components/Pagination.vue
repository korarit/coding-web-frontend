<template>
    <div class="flex items-center space-x-7">
        <div class="w-[16px]">
          <button v-if="page != 1" @click="prevPage" class="text-[24px] text-[#00C7A3] dark:text-[#FEFEFE]">
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
          </button>
        </div>
        <div class="flex items-center space-x-4">
            <button @click="page = index" v-for="index in pageCount" class="w-9 h-9 flex justify-center items-center rounded-md" :class="index == (page) ? 'bg-[#00C7A3] dark:bg-[#3D3D3D] border border-[#00B493] dark:border-[#141414] text-[#FEFEFE]' : 'text-[#00C7A3] dark:text-[#FEFEFE]'">
                <p class="text-[24px]">{{ index }}</p>
            </button>
        </div>
        <div class="w-[16px]">
          <button v-if="page != pageCount" @click="nextPage" class="text-[24px] text-[#00C7A3] dark:text-[#FEFEFE]" >
            <font-awesome-icon :icon="['fas', 'chevron-right']" />
          </button>
        </div>  
    </div>
</template>
<script setup lang="ts">

const props = defineProps<{
  countAll: number
  countPerPage: number
}>()

const pageCount = ref<number>(0)
const page = defineModel<number>({ default: 1 })

onMounted(() => {
  pageCount.value = Math.ceil(props.countAll / props.countPerPage)
})

watch(() => props.countAll, () => {
  pageCount.value = Math.ceil(props.countAll / props.countPerPage)
})

watch(() => props.countPerPage, () => {
  pageCount.value = Math.ceil(props.countAll / props.countPerPage)
})

const nextPage = () => {
  if (page.value < pageCount.value) {
    page.value++
  }
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
  }
}
</script>