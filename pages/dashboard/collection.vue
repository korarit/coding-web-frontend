<template>
  <NuxtLayout name="dashboard">
    <div v-if="loading_all" class="flex justify-between items-center h-full">
      <div class="mx-auto flex items-center">
        <svg class=" animate-spin -ml-1 mr-4 h-12 w-12 text-black" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
          </circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
        <p class="text-[28px]">
          Loading . . .
        </p>
      </div>
    </div>
    <div v-else class="flex flex-col min-h-full h-fit">

      <div class="flex-none flex justify-between">
        <h1
          class="2xl:text-[36px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] text-[20px] text-[#000000] dark:text-[#FEFEFE]">
          รายการโจทย์
        </h1>
        <button
          class="2xl:text-[36px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] text-[20px] rounded-xl border-2 px-4 text-[#FCFCFC] border-[#B12900] hover:bg-[#ad313e] bg-[#DF3E3E] active:bg-[#ef435d]">
          เพิ่มโจทย์
        </button>
      </div>

      <div class="flex-none grid grid-cols-5 gap-5 items-center my-10">
        <div class="col-span-2 sm:col-span-1">
          <DropdownCheckSelect
            block-class="w-full"
            customclass="w-full border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex justify-between p-2 drop-shadow-md 2xl:text-[20px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[13px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
            v-model="selectIndexLevel" :list_data="LevelListName" icon="caret-down"
            icon-class="text-[#4F4F4F] dark:text-[#8A8A8A] 2xl:text-[28px] xl:text-[28px] lg:text-[28px] md:text-[26px] sm:text-[22px] text-[20px]"
            @select="list_question = fitterData(save_question)" />
        </div>

        <div class="col-span-2 sm:col-span-1">
          <DropdownCheckSelect
            block-class="w-full"
            customclass="w-full border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex justify-between p-2 drop-shadow-md 2xl:text-[20px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[13px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
            v-model="selectIndexTopic" :list_data="TopicListName" icon="caret-down"
            icon-class="text-[#4F4F4F] dark:text-[#8A8A8A] 2xl:text-[28px] xl:text-[28px] lg:text-[28px] md:text-[26px] sm:text-[22px] text-[20px]"
            @select="fitterData(save_question)" />
        </div>

        <div class="relative col-span-5 sm:col-span-2">
          <input
            v-model="search_keyword"
            class="w-full border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex justify-between p-2 drop-shadow-md pl-12 2xl:text-[20px] xl:text-[21px] lg:text-[18px] md:text-[19px] sm:text-[15px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
            type="text" name="search" placeholder="ค้นหา" required />
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

      <div v-if="search_loading" class="flex-auto h-full flex justify-center items-center ">
        <div class="mx-auto flex items-center space-x-4">
          <svg class=" animate-spin -ml-1 h-11 w-11 text-black" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
            </circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          <p class="text-[20px]">
            กำลังค้นหาโจทย์ . . .
          </p>
        </div>
      </div>

      <div v-else-if="list_question.length <= 0" class="flex-auto h-full flex justify-center items-center ">
        <div class="mx-auto flex items-center space-x-4">
          <font-awesome-icon :icon="['fas', 'circle-exclamation']" class="text-[48px] text-red-600" />
          <p class="text-[24px]">
            ไม่พบโจทย์ที่เกี่ยวข้อง
          </p>
        </div>
      </div>

      <div v-else class="flex-none flex flex-col space-y-6 mb-12">
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
            <NuxtLink
              :to="'/dashboard/question/' + data.id"
              class="flex-auto sm:flex-none border-2 text-center font-light border-[#00B191] text-[#FEFEFE] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] rounded-2xl px-12 py-1 drop-shadow-md 2xl:text-[32px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] dark:border-[#00B191]">
              รายละเอียด
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">

//////////////////////////////////// Auth  ////////////////////////////////////

definePageMeta({
    auth: true
})
const { status, data } = useAuth()

const router = useRouter()
onMounted(() => {
    if (status.value === 'authenticated' && data.value) {
        let user_session: any = data.value;
        if (user_session?.type_level < 2) {
            router.push('/')
        }
    }
})
//////////////////////////////////// Data  ////////////////////////////////////
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

const loading_all = ref<boolean>(true)
onMounted(async () => {
  await load_level()
  await load_topic()
  await load_question()
  loading_all.value = false
})

const {fitterQuestionDashboard} = useFillterQuestion()

async function fitterData(data: any) {
  const list_data = await fitterQuestionDashboard(data, LevelData.value, TopicData.value, selectIndexLevel.value, selectIndexTopic.value)
  list_question.value = list_data
}

const search_keyword = ref<string>('')
const search_loading = ref<boolean>(false)
const search_question = async () => {

  search_loading.value = true

  const config = useRuntimeConfig()
  if (search_keyword.value == '') {
    const res_list_question = await fetch(config.public.backendApi + '/question/list')
    const res_json = await res_list_question.json()
    save_question.value = res_json.data.question_list
    fitterData(save_question.value)

    search_loading.value = false
    return
  }
  const response = await fetch(config.public.backendApi + '/question/search?keyword=' + search_keyword.value)

  if (response.status == 404) {
    alert('Not found')
    search_loading.value = false
    return
  }
  if (response.status != 200) {
    search_loading.value = false
    return
  }
  const data = await response.json()
  
  const list_search:any[] = data.data.search_result

  const res_list_question = await fetch(config.public.backendApi + '/question/list')
  const res_json = await res_list_question.json()
  
  const list = res_json.data.question_list

  const list_data:any = {}
  list_search.forEach((element: any) => {
    
    if (list[element.payload_data.id] != undefined && list[element.payload_data.id] != null) {
      list_data[element.payload_data.id] = list[element.payload_data.id]
    }

  });

  save_question.value = await list_data
  fitterData(save_question.value)

  search_loading.value = false
}
</script>