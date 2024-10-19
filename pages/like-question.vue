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

    <div v-else-if="error_message != null" class="min-h-[calc(100dvh-270px)] px-4 xl:px-16 2xl:px-[96px] pt-[64px] h-full flex justify-center items-center ">
      <div class="mx-auto flex items-center space-x-4">
        <font-awesome-icon :icon="['fas', 'circle-exclamation']" class="text-[72px] text-red-600" />
        <p class="text-[28px]">
          เกิดข้อผิดพลาด {{ error_message }}
        </p>
      </div>
    </div>
    <div v-else class="min-h-[calc(100dvh-270px)] px-4 xl:px-16 2xl:px-[96px] pt-[64px] flex flex-col">

      <div class="flex-none pr-[4px] grid grid-cols-6 gap-3 lg:gap-5 items-center">

        <div class="col-span-6 lg:col-span-3 flex items-center space-x-4">
          <font-awesome-icon :icon="['fas', 'book-bookmark']" class="text-[44px] text-[#00C7A3]" />
          <p class="text-[#000000] dark:text-[#FEFEFE] 2xl:text-[32px] lg:text-[24px] sm:text-[24px] text-[24px]">โจทย์ที่ถูกใจไว้</p>
        </div>

        <div class="col-span-2 lg:col-span-1">
          <DropdownCheckSelect block-class="w-full" customclass="w-full border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex items-center justify-between p-2 drop-shadow-md 2xl:text-[20px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[13px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
            v-model="selectIndexLevel" 
            :list_data="LevelListName" 
            icon="caret-down"
            icon-class="text-[#4F4F4F] dark:text-[#8A8A8A] 2xl:text-[28px] xl:text-[28px] lg:text-[28px] md:text-[26px] sm:text-[22px] text-[20px]"
            @select="fitterData"
          />
        </div>
        <div class="col-span-2 lg:col-span-1">
          <DropdownCheckSelect block-class="w-full" customclass="w-full border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex items-center justify-between p-2 drop-shadow-md 2xl:text-[20px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[13px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
            v-model="selectIndexStatus" 
            :list_data="StatusListName" 
            :off="status == 'authenticated' ? false : true"
            icon="caret-down"
            icon-class="text-[#4F4F4F] dark:text-[#8A8A8A] 2xl:text-[28px] xl:text-[28px] lg:text-[28px] md:text-[26px] sm:text-[22px] text-[20px]"
            @select="fitterData"
          />
        </div>

        <div class="col-span-2 lg:col-span-1">
          <DropdownCheckSelect block-class="w-full" customclass="w-full border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex items-center justify-between p-2 drop-shadow-md 2xl:text-[20px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[13px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
            v-model="selectIndexTopic" 
            :list_data="TopicListName" 
            icon="caret-down"
            icon-class="text-[#4F4F4F] dark:text-[#8A8A8A] 2xl:text-[28px] xl:text-[28px] lg:text-[28px] md:text-[26px] sm:text-[22px] text-[20px]"
            @select="fitterData"
          />
        </div>

      </div>

      <hr class="flex-none h-1 border-[#BABABA] dark:border-[#585858] my-6 sm:my-8" />

      <div v-if="list_question.length <= 0" class="flex-auto h-full flex justify-center items-center ">
        <div class="mx-auto flex items-center space-x-4">
          <font-awesome-icon :icon="['fas', 'circle-exclamation']" class="text-[48px] text-red-600" />
          <p class="text-[24px]">
            ไม่มีโจทย์ที่ถูกใจไว้
          </p>
        </div>
      </div>
      <div v-else class="flex-none flex flex-col space-y-6 mb-7">
        <div
        class="w-full flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between border-2 border-[#BABABA] bg-[#FEFEFE] dark:border-[#1D1D1D] dark:bg-[#262626] drop-shadow-md rounded-xl p-3 sm:p-5"
        v-for="(d, index) in list_question"
        >
          <div class="w-full sm:w-fit">
            <h1
              class="text-[#000000] dark:text-[#FEFEFE] 2xl:text-[36px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] text-[20px]"
            >
              {{ d.name }}
            </h1>
            <span
              class="text-[#00C7A3] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[14px]"
              >{{ d.level_name }}</span
            >
            <span
              class="text-[#000000] dark:text-[#FEFEFE] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[14px]"
              >, 15 คะแนน, อัตราสำเร็จ 96.12%</span
            >
          </div>
          <div class="w-full sm:w-fit flex items-center gap-3 sm:gap-6">
            <button v-if="status == 'authenticated'" @click="unlike_question(index, d.id)">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-[32px] h-[32px] sm:w-[30px] sm:h-[30px] md:w-[34px] md:h-[34px] lg:w-9 lg:h-9 xl:w-10 xl:h-10" viewBox="0 0 24 24" fill="currentColor">
                <path :class="d.like ? 'fill-yellow-400' : 'fill-none'" class=" stroke-[#606060] stroke-[1.5]" stroke-linecap="round" stroke-linejoin="round" d="M12 2.25l2.39 6.996h7.347l-5.941 4.318 2.365 7.01-5.986-4.33-5.986 4.33 2.365-7.01-5.941-4.318h7.347z"/>
              </svg>
            </button>

            <button
              class="flex-auto sm:flex-none border-2 text-center border-[#00B191] text-[#FEFEFE] bg-[#00C7A3] hover:bg-[rgb(25,156,128)] rounded-2xl px-14 py-1 drop-shadow-md 2xl:text-[32px] xl:text-[30px] lg:text-[26px] md:text-[24px] sm:text-[22px] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:hover:bg-[#00C7A3] dark:border-[#00B191]"
            >
              ทำโจทย์
            </button>
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
import submission_status  from '~/assets/json/submission_status.json'

//////////////////////////////////// Auth  ////////////////////////////////////

definePageMeta({
    auth: true
})
const { status, data } = useAuth()
if (status.value !== 'authenticated') {
  navigateTo('/')
}

const error_message = ref<string|null>(null)
//////////////////////////////////// Dropdown Level  ////////////////////////////////////

const selectIndexLevel = ref<number>(0);
const LevelListName = ref<any>([]);
const LevelData = ref<any>([]);

LevelListName.value.push('ความยาก');
const load_level = async () => {
  const config = useRuntimeConfig()
  const response = await fetch(config.public.backendApi + '/question/level')
  if (response.status != 200) {
    error_message.value = 'ไม่สามารถโหลดข้อมูล ระดับความยาก ได้'
    return
  }
  const data = await response.json()

  const list_data = data.data.level_list
  LevelData.value = list_data

  list_data.forEach((element: any) => {
    LevelListName.value.push(element['name']);
  });
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
  if (response.status != 200) {
    error_message.value = 'ไม่สามารถโหลดข้อมูล Topic ได้'
    return
  }
  const data = await response.json()
  
  const list_data = data.data.topic_list
  TopicData.value = list_data

  list_data.forEach((element: any) => {
    TopicListName.value.push(element['name']);
  });
}

//////////////////////////////////// Load question List  ////////////////////////////////////

const save_question = ref<any>([]);

const list_question = ref<any[]>([]);
const load_question = async () => {
  const config = useRuntimeConfig()

  if (status.value == 'authenticated') {

    const user_session: any = data.value
    const response = await fetch(config.public.backendApi + '/question/list/user', {
      headers: {
        'Authorization': 'Bearer ' + user_session.sessionToken
      }
    })

    console.log(response.status)
    if (response.status != 200) {
      error_message.value = 'ไม่สามารถโหลดข้อมูล โจทย์ที่ถูกใจไว้ ได้'
      return
    }

    const data_res = await response.json()
    const list_data = Object.values(data_res.data.question_list).filter((data:any) => {
      return data.like == true
    })
    

    console.log(list_data)
    
    save_question.value = list_data
    list_question.value = list_data

  } else {

    const response = await fetch(config.public.backendApi + '/question/list')
    const data = await response.json()
    
    const list_data = data.data.question_list
    save_question.value = list_data
    list_question.value = list_data
  }

}

const loading_all = ref<boolean>(true)
onMounted(async () => {
  await load_level()
  await load_topic()
  await load_question()
  loading_all.value = false
})

//////////////////////////////////// Filter Data By Dropdown  ////////////////////////////////////

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




/////////////////////////////// Like Question //////////////////////

const unlike_question = async (index: number,id: number) => {

  if (status.value != 'authenticated') return;

  const config = useRuntimeConfig()
  const user_session: any = data.value

  const method:string = save_question.value[index].like ? 'DELETE' : 'POST'

  const response = await fetch(config.public.backendApi + '/question/like/'+id, {
    method: method,
    headers: {
      'Authorization': 'Bearer ' + user_session.sessionToken
    }
  })

  if (response.status == 200) {
    //remove index from list
    save_question.value.splice(index, 1)
  }
}

/////////////////////////////// Pagination //////////////////////
const questionShow = ref<any>([])
const page = ref<number>(1)
const pagination = (page: number) =>{
    const start = (page - 1) * 6;
    const end = start + 6;
    console.log(Object.values(toRaw(list_question.value)).slice(start, end))

    const result = Object.values(toRaw(list_question.value)).slice(start, end);
    questionShow.value = result;
}
watch(() => page.value, (value) => {
    pagination(value)
})


</script>