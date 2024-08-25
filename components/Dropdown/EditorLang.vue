<template>
  <div class="py-2 px-2 flex gap-2 w-fit">

    <div class="grid grid-rows-4 grid-flow-col">
      <div class="relative flex items-center" v-for="(data, index) in LangData">
        <button @click="setLangEditor(data)" class="hover:bg-[#e0e0e0] w-[128px] rounded-md py-2 px-2 mx-2">
          <p class="text-[16px] text-left text-[#262626] leading-4">{{ data.name }}</p>
        </button>
        <div v-if="index < 8" class="absolute inset-y-0 right-0 w-px">
          <div class="w-px bg-gray-400 h-full"></div>
        </div>
      </div>
    </div>


  </div>
</template>


<script setup>
import LangData from '~/assets/json/editor_lang.json'

  //set v-model
  const datamodal = defineModel()

  const setLangEditor = (lang) => {
    datamodal.value = {
      id: lang.id,
      lang: lang.lang,
      name: lang.name,
      version: lang.version[0]
    }
  }
</script>