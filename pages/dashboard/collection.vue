<template>
  <NuxtLayout name="dashboard">
    <div class="flex justify-between">
      <h1
        class="2xl:text-[36px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] text-[20px] text-[#000000] dark:text-[#FEFEFE]">
        รายการโจทย์
      </h1>
      <button
        class="2xl:text-[36px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] text-[20px] rounded-xl border-2 px-4 text-[#FCFCFC] border-[#B12900] hover:bg-[#ad313e] bg-[#DF3E3E] active:bg-[#ef435d]">
        เพิ่มโจทย์
      </button>
    </div>

    <div class="grid grid-cols-6 gap-5 items-center my-10">
      <div class="col-span-2 sm:col-span-1">
        <DropdownCheckSelect
          block-class="w-full"
          customclass="w-full border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex justify-between p-2 drop-shadow-md 2xl:text-[20px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[13px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
          v-model="selectIndexLevel" :list_data="LevelListName" icon="caret-down"
          icon-class="text-[#4F4F4F] dark:text-[#8A8A8A] 2xl:text-[28px] xl:text-[28px] lg:text-[28px] md:text-[26px] sm:text-[22px] text-[20px]"
          @select="fitterData" />
      </div>

      <div class="col-span-2 sm:col-span-1">
        <DropdownCheckSelect
          block-class="w-full"
          customclass="w-full border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex justify-between p-2 drop-shadow-md 2xl:text-[20px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[13px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
          v-model="selectIndexStatus" :list_data="StatusListName" icon="caret-down"
          icon-class="text-[#4F4F4F] dark:text-[#8A8A8A] 2xl:text-[28px] xl:text-[28px] lg:text-[28px] md:text-[26px] sm:text-[22px] text-[20px]"
          @select="fitterData" />
      </div>

      <div class="col-span-2 sm:col-span-1">
        <DropdownCheckSelect
          block-class="w-full"
          customclass="w-full border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex justify-between p-2 drop-shadow-md 2xl:text-[20px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[13px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
          v-model="selectIndexLevel" :list_data="LevelListName" icon="caret-down"
          icon-class="text-[#4F4F4F] dark:text-[#8A8A8A] 2xl:text-[28px] xl:text-[28px] lg:text-[28px] md:text-[26px] sm:text-[22px] text-[20px]"
          @select="fitterData" />
      </div>

      <div class="relative col-span-5 sm:col-span-2">
        <input
          v-model="search_keyword"
          class="w-full border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex justify-between p-2 drop-shadow-md pl-12 2xl:text-[20px] xl:text-[21px] lg:text-[18px] md:text-[19px] sm:text-[15px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
          type="search" name="search" placeholder="ค้นหา" required />
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <font-awesome-icon
            class="text-[#4F4F4F] dark:text-[#8A8A8A] text-[25px] 2xl:text-[28px] xl:text-[31px] lg:text-[30px] md:text-[29px] sm:text-[22px]"
            :icon="['fas', 'magnifying-glass']" />
        </div>
      </div>

      <button
        @click="search_question"
        class="col-span-1 border-2 border-[#00B191] text-[#FCFCFC] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] rounded-lg flex p-2 drop-shadow-md justify-center text-[14px] px-6 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[20px] sm:text-[16px] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] dark:border-[#00B191]">
        ค้นหา
      </button>
    </div>

    <div class="flex flex-col space-y-6">
      <div v-for="(data, index) in list_question" class="w-full flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between border-2 border-[#BABABA] bg-[#FEFEFE] dark:border-[#1D1D1D] dark:bg-[#262626] drop-shadow-md rounded-xl p-3 sm:p-5">
        <div class="w-full sm:w-fit">
          <h1
            class="text-[#000000] dark:text-[#FEFEFE] 2xl:text-[36px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] text-[20px]">
            {{ data.name }}
          </h1>
          <span
            class="text-[#00C7A3] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[14px]">{{ data.level_name }}</span>
          <span
            class="text-[#000000] dark:text-[#FEFEFE] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[14px]">,
            Max scroce 15, Success Rate: 96.12%</span>
        </div>
        <div class="w-full sm:w-fit flex items-center gap-3 sm:gap-6">
          <button
            class="flex-auto sm:flex-none border-2 text-center font-light border-[#00B191] text-[#FEFEFE] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] rounded-2xl px-12 py-1 drop-shadow-md 2xl:text-[32px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] dark:border-[#00B191]">
            รายละเอียด
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import submission_status  from '~/assets/json/submission_status.json'

const selectIndexLevel = ref<number>(0);
const LevelListName = ref<any>([]);
const LevelData = ref<any>([]);

LevelListName.value.push('ระดับความยาก');
const load_level = async () => {
  const config = useRuntimeConfig()
  const response = await fetch(config.public.backendApi + '/question/level')
  const data = await response.json()

  const list_data = data.data.level_list
  LevelData.value = list_data

  list_data.forEach((element: any) => {
    LevelListName.value.push(element['name']);
  });
}

const selectIndexStatus = ref<number>(0);
const StatusListName = ref<any>([]);
submission_status.filter((data) => {
  StatusListName.value.push(data.name);
})


const selectIndexTopic = ref<number>(0);
const TopicListName = ref<any>([]);
const TopicData = ref<any>([]);
TopicListName.value.push('Topic');
const load_topic = async () => {
  const config = useRuntimeConfig()
  const response = await fetch(config.public.backendApi + '/question/topic')
  const data = await response.json()
  
  const list_data = data.data.topic_list
  TopicData.value = list_data

  list_data.forEach((element: any) => {
    TopicListName.value.push(element['name']);
  });
}


const save_question = ref<any>([]);
const list_question = ref<any>([]);
const load_question = async () => {
  const config = useRuntimeConfig()
  const response = await fetch(config.public.backendApi + '/question/list')
  const data = await response.json()
  
  const list_data = data.data.question_list
  save_question.value = list_data
  list_question.value = list_data
}

onMounted(async () => {
  await load_level()
  await load_topic()
  await load_question()
})

const fitterData = async () => {
  if (selectIndexLevel.value != 0 && selectIndexStatus.value != 0 && selectIndexTopic.value != 0) {
    list_question.value = Object.values(save_question.value).filter((data:any) => {
      return data.level_id == LevelData.value[selectIndexLevel.value - 1].id && data.status == submission_status[selectIndexStatus.value - 1].eng && data.topic_id == TopicData.value[selectIndexTopic.value - 1].id
    })
  } else if (selectIndexLevel.value != 0 && selectIndexStatus.value != 0) {
    list_question.value = Object.values(save_question.value).filter((data:any) => {
      return data.level_id == LevelData.value[selectIndexLevel.value - 1].id && data.status == submission_status[selectIndexStatus.value - 1].eng
    })
  } else if (selectIndexLevel.value != 0 && selectIndexTopic.value != 0) {
    console.log('test')
    list_question.value = Object.values(save_question.value).filter((data:any) => {
      return data.level_id == LevelData.value[selectIndexLevel.value - 1].id && data.topic_id == TopicData.value[selectIndexTopic.value - 1].id
    })
  } else if (selectIndexStatus.value != 0 && selectIndexTopic.value != 0) {
    list_question.value = Object.values(save_question.value).filter((data:any) => {
      return data.status == submission_status[selectIndexStatus.value - 1].eng && data.topic_id == TopicData.value[selectIndexTopic.value - 1].id
    })
  } else if (selectIndexLevel.value != 0) {
    list_question.value = Object.values(save_question.value).filter((data:any) => {
      return data.level_id == LevelData.value[selectIndexLevel.value - 1].id
    })
  } else if (selectIndexStatus.value != 0) {
    list_question.value = Object.values(save_question.value).filter((data:any) => {
      return data.status == submission_status[selectIndexStatus.value - 1].eng
    })
  } else if (selectIndexTopic.value != 0) {
    list_question.value = Object.values(save_question.value).filter((data:any) => {
      return data.topic_id == TopicData.value[selectIndexTopic.value - 1].id
    })
  } else {
    list_question.value = save_question.value
  }
}

const search_keyword = ref<string>('')
const search_question = async () => {
  const config = useRuntimeConfig()
  if (search_keyword.value == '') {
    const res_list_question = await fetch(config.public.backendApi + '/question/list')
    const res_json = await res_list_question.json()
    save_question.value = res_json.data.question_list
    fitterData()
    return
  }
  const response = await fetch(config.public.backendApi + '/question/search?keyword=' + search_keyword.value)

  if (response.status == 404) {
    alert('Not found')
    return
  }
  if (response.status != 200) {
    return
  }
  const data = await response.json()
  
  const list_search:any[] = data.data.search_result

  const res_list_question = await fetch(config.public.backendApi + '/question/list')
  const res_json = await res_list_question.json()
  
  const list = res_json.data.question_list

  const list_data:any = {}
  list_search.forEach((element: any) => {
    list_data[element.payload_data.id] = list[element.payload_data.id]
  });

  save_question.value = list_data
  fitterData()
}
</script>