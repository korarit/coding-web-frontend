<template>
  <NuxtLayout name="defaultmain" page_name="โจทย์">
    <div v-if="loading_all" class="min-h-[calc(100dvh-270px)] px-4 xl:px-16 2xl:px-[96px] pt-[64px] flex justify-center items-center">
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

    <div v-else-if="loading_error != null" class="min-h-[calc(100dvh-270px)] px-4 xl:px-16 2xl:px-[96px] pt-[64px] h-full flex justify-center items-center ">
      <div class="mx-auto flex items-center space-x-4">
        <font-awesome-icon :icon="['fas', 'circle-exclamation']" class="text-[72px] text-red-600" />
        <p class="text-[28px]">
          เกิดข้อผิดพลาด {{ loading_error }}
        </p>
      </div>
    </div>

    <div v-else class="min-h-[calc(100dvh-270px)] px-4 xl:px-16 2xl:px-[128px] pt-[64px] flex flex-col">
      <div class="flex-none relative min-h-[80px] h-fit w-full">
        <div
          class="absolute z-0 top-1/2 -translate-y-1/2 w-full h-fit pr-[4px] flex gap-3 md:gap-5 pb-4 items-center overflow-hidden">
          <button
            class="w-[50%] sm:w-[40%] xl:w-[16.66%] border-2 rounded-2xl flex items-center justify-center px-4 py-2 drop-shadow-md border-[#00B191] text-[#FCFCFC] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[16px] sm:py-[8px] sm:px-[3px] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] dark:border-[#00B191]">
            <font-awesome-icon :icon="['fas', 'box-archive']"
              class="text-[0px] text-[#FFFFFF] dark:text-[#0F0F0F] 2xl:text-[32px] xl:text-[30px] lg:text-[24px] md:text-[0px] sm:text-[0px] lg:mr-2" />
            <p class="whitespace-nowrap">All Topics</p>
          </button>

          <button
            class="w-[50%] sm:w-[40%] xl:w-[16.66%] border-2 rounded-2xl flex items-center justify-center px-4 py-2 drop-shadow-md border-[#BABABA] bg-[#FEFEFE] text-[#606060] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[16px] sm:py-[8px] sm:px-[3px] dark:text-[#FEFEFE] dark:bg-[#3D3D3D] dark:border-[#292929]">
            <font-awesome-icon :icon="['fas', 'code']"
              class="text-[0px] text-[#606060] dark:text-[#FEFEFE] 2xl:text-[32px] xl:text-[30px] lg:text-[24px] md:text-[0px] sm:text-[0px] lg:mr-2" />
            Algorithm
          </button>

          <button
            class="w-[50%] sm:w-[40%] xl:w-[16.66%] border-2 rounded-2xl flex items-center justify-center px-4 py-2 drop-shadow-md border-[#BABABA] bg-[#FEFEFE] text-[#606060] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[16px] sm:py-[8px] sm:px-[2px] dark:text-[#FEFEFE] dark:bg-[#3D3D3D] dark:border-[#292929]">
            <font-awesome-icon :icon="['fab', 'js']"
              class="text-[0px] text-[#606060] dark:text-[#FEFEFE] 2xl:text-[32px] xl:text-[30px] lg:text-[24px] md:text-[0px] sm:text-[0px] lg:mr-2" />
            JavaScript
          </button>

          <button
            class="w-[50%] sm:w-[40%] xl:w-[16.66%] border-2 rounded-2xl flex items-center justify-center px-4 py-2 drop-shadow-md border-[#BABABA] bg-[#FEFEFE] text-[#606060] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[16px] sm:py-[8px] sm:px-[2px] dark:text-[#FEFEFE] dark:bg-[#3D3D3D] dark:border-[#292929]">
            <font-awesome-icon :icon="['fas', 'person-running']"
              class="text-[0px] text-[#606060] dark:text-[#FEFEFE] 2xl:text-[32px] xl:text-[30px] lg:text-[24px] md:text-[0px] sm:text-[0px] lg:mr-2" />
            Contest
          </button>

          <button
            class="w-[50%] sm:w-[40%] xl:w-[16.66%] border-2 rounded-2xl flex items-center justify-center px-4 py-2 drop-shadow-md border-[#BABABA] bg-[#FEFEFE] text-[#606060] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[16px] sm:py-[8px] sm:px-[2px] dark:text-[#FEFEFE] dark:bg-[#3D3D3D] dark:border-[#292929]">
            <font-awesome-icon :icon="['fab', 'python']"
              class="text-[0px] text-[#606060] dark:text-[#FEFEFE] 2xl:text-[32px] xl:text-[30px] lg:text-[24px] md:text-[0px] sm:text-[0px] lg:mr-2" />
            Python
          </button>

          <button
            class="w-[50%] sm:w-[30%] xl:w-[16.66%] border-2 rounded-2xl flex items-center justify-center px-4 py-2 drop-shadow-md border-[#BABABA] bg-[#FEFEFE] text-[#606060] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[16px] sm:py-[8px] sm:px-[2px] dark:text-[#FEFEFE] dark:bg-[#3D3D3D] dark:border-[#00B191]">
            <font-awesome-icon :icon="['fab', 'java']"
              class="text-[0px] text-[#606060] dark:text-[#FEFEFE] 2xl:text-[32px] xl:text-[30px] lg:text-[24px] md:text-[0px] sm:text-[0px] lg:mr-2" />
            Java
          </button>
        </div>
        <div
          class="absolute w-[104px] z-10 right-0 top-1/2 -translate-y-1/2 flex self-end min-h-full text-label-3 dark:text-dark-label-3">
          <span
            class="from-[#FAFAFA] dark:from-[#0F0F0F] min-h-full to-transparent dark:from-dark-paper w-16 bg-gradient-to-l">
          </span>
          <span
            class="bg-[#FAFAFA] dark:bg-[#0F0F0F] min-h-full dark:bg-dark-paper w-10 cursor-pointer pl-1 font-normal text-[20px] text-[#606060] dark:text-dark-label-3">
            <div class="flex items-center h-[80%] dark:text-white">
              >>
            </div>
          </span>
        </div>
      </div>

      <div class="flex-none pr-[4px] grid grid-cols-6 gap-3 lg:gap-5 items-center">
        <div class="col-span-2 lg:col-span-1">
          <DropdownCheckSelect block-class="w-full"
            customclass="w-full border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex items-center justify-between p-2 drop-shadow-md 2xl:text-[20px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[13px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
            v-model="selectIndexLevel" :list_data="LevelListName" icon="caret-down"
            icon-class="text-[#4F4F4F] dark:text-[#8A8A8A] 2xl:text-[28px] xl:text-[28px] lg:text-[28px] md:text-[26px] sm:text-[22px] text-[20px]"
            @select="filterData" />
        </div>
        <div class="col-span-2 lg:col-span-1">
          <DropdownCheckSelect block-class="w-full"
            customclass="w-full border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex items-center justify-between p-2 drop-shadow-md 2xl:text-[20px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[13px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
            v-model="selectIndexStatus" :list_data="StatusListName" :off="status == 'authenticated' ? false : true"
            icon="caret-down"
            icon-class="text-[#4F4F4F] dark:text-[#8A8A8A] 2xl:text-[28px] xl:text-[28px] lg:text-[28px] md:text-[26px] sm:text-[22px] text-[20px]"
            @select="filterData" />
        </div>

        <div class="col-span-2 lg:col-span-1">
          <DropdownCheckSelect block-class="w-full"
            customclass="w-full border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex items-center justify-between p-2 drop-shadow-md 2xl:text-[20px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[13px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
            v-model="selectIndexTopic" :list_data="TopicListName" icon="caret-down"
            icon-class="text-[#4F4F4F] dark:text-[#8A8A8A] 2xl:text-[28px] xl:text-[28px] lg:text-[28px] md:text-[26px] sm:text-[22px] text-[20px]"
            @select="filterData" />
        </div>

        <div class="relative col-span-5 lg:col-span-2">
          <input
            class="w-full border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex items-center justify-between p-2 drop-shadow-md pl-12 2xl:text-[22px] xl:text-[21px] lg:text-[18px] md:text-[19px] sm:text-[15px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
            type="text" name="search" placeholder="ค้นหา" v-model="search_keyword" required />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <font-awesome-icon
              class="text-[#4F4F4F] dark:text-[#8A8A8A] text-[25px] 2xl:text-[28px] xl:text-[31px] lg:text-[30px] md:text-[29px] sm:text-[22px]"
              :icon="['fas', 'magnifying-glass']" />
          </div>
        </div>

        <button @click="search_question"
          class="col-span-1 border-2 border-[#00B191] text-[#FCFCFC] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] rounded-lg flex p-2 drop-shadow-md justify-center text-[14px] px-6 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[20px] sm:text-[16px] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] dark:border-[#00B191]">
          ค้นหา
        </button>
      </div>

      <hr class="flex-none h-1 border-[#BABABA] dark:border-[#585858] my-6 sm:my-8" />

      <div v-if="search_loading" class="flex-auto h-full flex justify-center items-center ">
        <div class="mx-auto flex items-center space-x-4">
          <svg class=" animate-spin -ml-1 h-12 w-12 text-black" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
            </circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          <p class="text-[24px]">
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

      <div v-else class="flex-none flex flex-col space-y-6 mb-7">
        <div
          class="w-full flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between border-2 border-[#BABABA] bg-[#FEFEFE] dark:border-[#1D1D1D] dark:bg-[#262626] drop-shadow-md rounded-xl p-3 sm:p-5"
          v-for="(data, index) in questionShow">
          <div class="w-full sm:w-fit">
            <h1
              class="text-[#000000] dark:text-[#FEFEFE] 2xl:text-[36px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] text-[20px]">
              {{ data.name }}
            </h1>
            <span class="text-[#00C7A3] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[14px]">{{
              data.level_name }}</span>
            <span
              class="text-[#000000] dark:text-[#FEFEFE] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[14px]">
              , 15 คะแนน, อัตราสำเร็จ 96.12%
            </span>
          </div>
          <div class="w-full sm:w-fit flex items-center gap-3 sm:gap-6">
            <button v-if="status == 'authenticated'" @click="like_question(index, data.id)">
              <svg xmlns="http://www.w3.org/2000/svg"
                class="w-[32px] h-[32px] sm:w-[30px] sm:h-[30px] md:w-[34px] md:h-[34px] lg:w-9 lg:h-9 xl:w-10 xl:h-10"
                viewBox="0 0 24 24" fill="currentColor">
                <path :class="data.like ? 'fill-yellow-400' : 'fill-none'" class=" stroke-[#606060] stroke-[1.5]"
                  stroke-linecap="round" stroke-linejoin="round"
                  d="M12 2.25l2.39 6.996h7.347l-5.941 4.318 2.365 7.01-5.986-4.33-5.986 4.33 2.365-7.01-5.941-4.318h7.347z" />
              </svg>
            </button>

            <NuxtLink :to="'/question/' + data.id"
              class="flex-auto sm:flex-none border-2 text-center border-[#00B191] text-[#FEFEFE] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] rounded-2xl px-14 py-1 drop-shadow-md 2xl:text-[32px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] dark:border-[#00B191]">
              ทำโจทย์
            </NuxtLink>
          </div>
        </div>

        <div class="flex-none py-7 flex justify-center items-center">
          <Pagination v-model="page" :countAll="Object.values(list_question).length" :countPerPage="6" />
        </div>
      </div>

    </div>
  </NuxtLayout>
</template>
<style scoped>
.star-icon::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: yellow;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  z-index: -1;
}
</style>

<script setup lang="ts">
import submission_status from '~/assets/json/submission_status.json'

//////////////////////////////////// Auth  ////////////////////////////////////

definePageMeta({
  auth: { unauthenticatedOnly: false, navigateAuthenticatedTo: '/' }
})
const { status, data } = useAuth()



//////////////////////////////////// Dropdown Level  ////////////////////////////////////

const selectIndexLevel = ref<number>(0);
const LevelListName = ref<any>([]);
const LevelData = ref<any>([]);

LevelListName.value.push('ความยาก');
const load_level = async () => {
  const config = useRuntimeConfig()
  const response = await fetch(config.public.backendApi + '/question/level')

  if (response.status == 500) {
    return [false, 'มีข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์']
  }

  const data = await response.json()

  const list_data = data.data.level_list
  LevelData.value = list_data

  list_data.forEach((element: any) => {
    LevelListName.value.push(element['name']);
  });

  return [true, null]
}


//////////////////////////////////// Dropdown status  ////////////////////////////////////

const selectIndexStatus = ref<number>(0);
const StatusListName = ref<any>([]);
submission_status.filter((data) => {
  StatusListName.value.push(data.name);
})


//////////////////////////////////// Dropdown Topic  ////////////////////////////////////

const selectIndexTopic = ref<number>(0);
const TopicListName = ref<any>([]);
const TopicData = ref<any>([]);
TopicListName.value.push('Topic');

const load_topic = async () => {
  const config = useRuntimeConfig()
  const response = await fetch(config.public.backendApi + '/question/topic')

  if (response.status == 500) {
    return [false, 'มีข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์']
  }
  const data = await response.json()

  const list_data = data.data.topic_list
  TopicData.value = list_data

  list_data.forEach((element: any) => {
    TopicListName.value.push(element['name']);
  });

  return [true, null]
}

//////////////////////////////////// Load question List  ////////////////////////////////////

const save_question = ref<any>([]);
const list_question = ref<any>([]);
const load_question = async () => {
  const config = useRuntimeConfig()

  if (status.value == 'authenticated') {

    const user_session: any = data.value
    const response = await fetch(config.public.backendApi + '/question/list/user', {
      headers: {
        'Authorization': 'Bearer ' + user_session.sessionToken
      }
    })

    if (response.status == 401) {
      return [null, 'ไม่มีการเข้าสู่ระบบ']
    } else if (response.status == 400) {
      return [null, 'ไม่มีสิทธิ์เข้าถึง']
    } else if (response.status == 404) {
      return [null, 'ไม่พบข้อมูล']
    } else if (response.status != 200) {
      return [null, 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้']
    }
    
    const data_res = await response.json()
    const list_data = data_res.data.question_list

    return [list_data, null]

  } else {

    const response = await fetch(config.public.backendApi + '/question/list')

    if (response.status == 401) {
      return [null, 'ไม่มีการเข้าสู่ระบบ']
    } else if (response.status == 400) {
      return [null, 'ไม่มีสิทธิ์เข้าถึง']
    } else if (response.status == 404) {
      return [null, 'ไม่พบข้อมูล']
    } else if (response.status != 200) {
      return [null, 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้']
    }

    const data = await response.json()

    const list_data = data.data.question_list

    return [list_data, null]
  }

}


const loading_all = ref<boolean>(true)
const loading_error = ref<string|null>(null)
onMounted(async () => {
  const status_level = await load_level()
  if (!status_level[0] || status_level[1] != null) {
    loading_error.value = typeof status_level[1] === 'string' ? status_level[1] : null
    loading_all.value = false
    return
  }
  const status_topic = await load_topic()
  if (!status_topic[0] || status_topic[1] != null) {
    loading_error.value = typeof status_topic[1] === 'string' ? status_topic[1] : null
    loading_all.value = false
    return
  }

  const question = await load_question()
  if (question[0] == null) {
    loading_error.value = typeof question[1] === 'string' ? question[1] : null
    loading_all.value = false
    return
  }
  list_question.value = question[0]
  save_question.value = Object.values(question[0])

  page.value = 1
  pagination(1)

  loading_all.value = false
})

//////////////////////////////////// Filter Data By Dropdown  ////////////////////////////////////
const {fillterQuestionMain} = useFillterQuestion()

//////////////////////////////////// Search Question By Keyword  ////////////////////////////////////

const search_loading = ref<boolean>(false)
const search_keyword = ref<string>('')

const search_question = async () => {

  search_loading.value = true

  const config = useRuntimeConfig()
  if (search_keyword.value == '') {
    const list = await load_question()
    save_question.value = list

    list_question.value = await fillterQuestionMain(save_question.value, LevelData.value, TopicData.value, selectIndexLevel.value, selectIndexStatus.value, selectIndexTopic.value)
    search_loading.value = false
    return
  }
  const response = await fetch(config.public.backendApi + '/question/search?keyword=' + search_keyword.value)

  if (response.status == 500) {
    alert('Unauthorized')
    search_loading.value = false
    return
  }

  if (response.status == 401) {
    alert('Unauthorized')
    search_loading.value = false
    return
  }

  if (response.status == 400) {
    alert('Forbidden')
    search_loading.value = false
    return
  }

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

  const list_search: any[] = data.data.search_result

  const list = await load_question()
  console.log(list)

  const list_data: any = {}
  list_search.forEach((element: any) => {
    if (list[element.payload_data.id] != undefined && list[element.payload_data.id] != null) {
      list_data[element.payload_data.id] = list[element.payload_data.id]
    }
  });

  save_question.value = Object.values(list_data)
  list_question.value = await fillterQuestionMain(save_question.value, LevelData.value, TopicData.value, selectIndexLevel.value, selectIndexStatus.value, selectIndexTopic.value)
  
  page.value = 1
  pagination(1)

  search_loading.value = false
}



/////////////////////////////// Like Question //////////////////////

const like_question = async (index: number, id: number) => {

  if (status.value != 'authenticated') return;

  const config = useRuntimeConfig()
  const user_session: any = data.value

  console.log(save_question.value[index])
  const method: string = save_question.value[index].like ? 'DELETE' : 'POST'

  const response = await fetch(config.public.backendApi + '/question/like/' + id, {
    method: method,
    headers: {
      'Authorization': 'Bearer ' + user_session.sessionToken
    }
  })

  if (response.status == 200) {
    save_question.value[index].like = !save_question.value[index].like
  }
}


const questionShow = ref<any>([])
const page = ref<number>(1)
const pagination = (page: number) =>{
    const start = (page - 1) * 6;
    const end = start + 6;

    const result = Object.values(toRaw(list_question.value)).slice(start, end);
    questionShow.value = result;
}
watch(() => page.value, (value) => {
    pagination(value)
})


//////////////////////////////////// Filter Data By Dropdown  ////////////////////////////////////

const filterData = async () => {
  const list = await fillterQuestionMain(save_question.value, LevelData.value, TopicData.value, selectIndexLevel.value, selectIndexStatus.value, selectIndexTopic.value)
  list_question.value = list

  page.value = 1
  pagination(page.value)
}
</script>