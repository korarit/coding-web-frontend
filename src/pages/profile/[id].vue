<template>
    <NuxtLayout name="defaultmain">

        <div v-if="loading_all" class="min-h-[calc(100dvh-270px)] px-4 xl:px-16 2xl:px-[96px] pt-[64px] flex justify-center items-center">
            <div class="mx-auto flex items-center">
                <svg class=" animate-spin -ml-1 mr-4 h-12 w-12 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                    </circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                <p class="text-[28px] dark:text-white">
                Loading . . .
                </p>
            </div>
        </div>
        <div v-else-if="error_message != null" class="min-h-[calc(100dvh-270px)] px-4 xl:px-16 2xl:px-[96px] pt-[64px] h-full flex justify-center items-center ">
            <div class="mx-auto flex items-center space-x-4">
                <font-awesome-icon :icon="['fas', 'circle-exclamation']" class="text-[72px] text-red-600" />
                <p class="text-[28px] dark:text-white">
                เกิดข้อผิดพลาด {{ error_message }}
                </p>
            </div>
        </div>
        <div v-else class="min-h-[calc(100dvh-270px)] px-4 xl:px-16 2xl:px-[128px] py-[64px]">
                <div class="flex flex-col xl:flex-row space-y-10 xl:space-y-0 xl:space-x-10">
                    <!-- Profile Section - Adjusted to span two rows -->
                    <div class="w-full xl:min-h-[60dvh] h-full xl:w-[25%] border border-[#BABABA] bg-white dark:bg-[#262626] dark:border-[#262626] rounded-xl shadow p-6 flex flex-col">
                            <div class="flex items-center mb-6">
                                <div class="w-20 h-20 bg-gray-300 border border-gray-300 mr-4 rounded-xl overflow-hidden">
                                    <img v-if="profile != '' && profile != null" class="w-full h-full object-cover" :src="'https://pub-3d57d68059384f598b7ac0875ccf93db.r2.dev/profile/'+profile">
                                    <div v-else class="w-full h-full flex items-center justify-center">
                                        <font-awesome-icon :icon="['fas', 'user']" class="text-[#202020] text-5xl" />
                                    </div>
                                </div>
                                <div>
                                    <h2 class="text-2xl font-bold dark:text-[#fefefe]">{{ name }}</h2>
                                    <p class="text-gray-600 dark:text-[#ececec]">Rank 1 - 5000</p>
                                </div>
                            </div>
                            <NuxtLink
                                v-if="status === 'authenticated' && data && data_user.username === route.params.id"
                                to="/user"
                                class=" border border-[#199c80] w-full bg-[#00C7A3] text-white text-center py-2 px-4 rounded-xl hover:bg-[#199c80] active:bg-[#199c80] dark:bg-[#3DD6BA] dark:hover:bg-[#00c7a3] dark:active:bg-[#00c7a3] dark:text-[#0f0f0f]">
                                <font-awesome-icon :icon="['fas', 'edit']" /> Edit Profile
                            </NuxtLink>
                            <div class="mb-6">
                                <h3 class="text-[18px] font-medium mb-2 dark:text-[#fefefe]">Languages</h3>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="(d, i) in language_list" class="bg-gray-200 dark:bg-[#3d3d3d] dark:text-[#fefefe] rounded-xl px-3 py-1 text-sm">{{ d.language_name }}</span>
                                </div>
                            </div>
                    </div>

                    <div class="h-fit w-full xl:w-[75%] grid grid-cols-2 gap-10">
                        <!-- Status Section -->
                        <div class="col-span-2 md:col-span-1 h-fit border border-[#BABABA] bg-white dark:bg-[#262626] dark:border-[#262626] rounded-xl shadow p-6 flex items-center flex-col space-y-4 md:flex-row md:space-x-4 xl:space-x-6 2xl:space-x-10">
                            <!-- Difficulty buttons -->
                            <div class="w-full sm:flex-auto flex flex-col gap-6">
                                <div class="flex flex-col">
                                    <div class="flex space-x-2 items-center">
                                        <p class=" sm:text-[16px] xl:text-[14px] 2xl:text-md font-normal dark:text-[#fefefe]">ง่าย</p>
                                        <p class="sm:text-xl xl:text-lg 2xl:text-xl font-normal">
                                            <span class="text-green-600">{{ level_easy[0] }}</span>
                                            <span class="text-gray-600"> / {{ level_easy[1] }}</span>
                                        </p>
                                    </div>
                                    <div class="w-full bg-[#bff3d2] rounded-full h-2 dark:bg-gray-700">
                                        <div class="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-out" :style="{width: `${progress_easy}%`}"></div>
                                    </div>
                                </div>

                                <div class="flex flex-col">
                                    <div class="flex space-x-2 items-center">
                                        <p class="text-md xl:text-[14px] 2xl:text-md font-normal dark:text-[#fefefe]">ปานกลาง</p>
                                        <p class="text-xl xl:text-lg 2xl:text-xl font-normal">
                                            <span class="text-yellow-600">{{ level_medium[0] }}</span>
                                            <span class="text-gray-600"> / {{ level_medium[1] }}</span>
                                        </p>
                                    </div>
                                    <div class="w-full bg-[#f6e3a8] rounded-full h-2 dark:bg-gray-700">
                                        <div class="bg-yellow-500 h-2 rounded-full" :style="{width: `${progress_medium}%`}"></div>
                                    </div>
                                </div>

                                <div class="flex flex-col">
                                    <div class="flex space-x-2 items-center">
                                        <p class="text-md xl:text-[14px] 2xl:text-[16px] font-normal dark:text-[#fefefe]">ยาก</p>
                                        <p class="text-xl xl:text-lg 2xl:text-xl font-normal">
                                            <span class="text-red-600">{{  level_hard[0] }}</span>
                                            <span class="text-gray-600"> / {{ level_hard[1] }}</span>
                                        </p>
                                    </div>
                                    <div class="w-full bg-[#f4adad] rounded-full h-2 dark:bg-gray-700">
                                        <div class="bg-red-500 h-2 rounded-full" :style="{width: `${progress_hard}%`}"></div>
                                    </div>
                                </div>
                            </div>
                            <!-- SVG and text -->
                            <div class="flex-none h-fit pt-4 2xl:pt-3 w-fit flex justify-center items-center">
                                <div class="relative size-48 sm:size-32 2xl:size-[172px]">
                                    <svg class="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                        <!-- Background Circle -->
                                        <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-[#b6e9e0] dark:text-neutral-700" stroke-width="2"></circle>
                                        <!-- Progress Circle -->
                                        <circle v-if="progress_all != 100" cx="18" cy="18" r="16" fill="none" class="stroke-current text-[#00C7A3] dark:text-blue-500" stroke-width="2" stroke-dasharray="100" :stroke-dashoffset="progress_all" stroke-linecap="round"></circle>
                                    </svg>

                                    <!-- Percentage Text -->
                                    <div class="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[80%] flex flex-col space-y-2 md:sapce-y-1">
                                        <p class="text-center text-[#202020] dark:text-[#FEFEFE]">
                                            <span class="text-[28px] sm:text-[20px] leading-5 font-medium 2xl:text-[24px] 2xl:leading-6">{{ level_easy[0] + level_medium[0] + level_hard[0] }}</span>
                                            <span class="text-[20px] sm:text-[14px] 2xl:text-[16px]"> / {{ level_easy[1] + level_medium[1] + level_hard[1] }}</span>
                                        </p>
                                        <span class="text-center text-[16px] sm:text-[10px] sm:leading-3 lg:text-[14px] 2xl:text-[16px] 2xl:leading-4 font-medium text-[#202020] dark:text-[#FEFEFE]">
                                            โจทย์ที่ทำสำเร็จ
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Badges Section -->
                        <div class="col-span-2 md:col-span-1 h-fit sm:h-full border border-[#BABABA] bg-white dark:bg-[#262626] dark:border-[#262626] rounded-xl shadow p-6 flex flex-col space-y-4 lg:flex-row lg:space-y-0 justify-between items-center">
                            <div class="flex-none w-fit badge-details">
                                <h3 class="text-xl lg:text-2xl font-bold dark:text-[#fefefe]">แผนผังความสามารถ</h3>
                            </div>

                            <div v-if="datasets.labels.length > 0 && datasets.datasets[0].data.length > 0" class="size-48 sm:size-32 md:w-[118px] md:h-[118px] lg:w-[160px] lg:h-[160px] 2xl:w-[220px] 2xl:h-[184px]">
                                <Radar ref="radarChart" :data="datasets" :options="{ responsive: true,maintainAspectRatio: true,plugins:{legend: {display: false}},scales:{r:{pointLabels:{display: false}}}}" />
                            </div>
                        </div>

                        <div class="border border-[#BABABA]dark:bg-[#262626] dark:border-[#262626] col-span-full md:col-span-2 bg-white rounded-xl shadow">
                            <h3
                                class="text-xl font-medium text-white bg-[#00C7A3] dark:bg-[#3DD6BA] dark:text-[#0f0f0f] py-3 px-6 rounded-t-lg">
                                โจทย์ที่ทำสำเร็จ
                            </h3>
                            <div v-if="submitlist?.length == 0 || submitlist == null" class="divide-y divide-gray-300 dark:bg-[#262626] dark:border-[#262626] h-[130px]">
                                <div class="w-full h-full flex py-3 px-4 items-center justify-center">
                                    <p class="text-2xl text-wrap font-medium ml-4 dark:text-[#fefefe]">
                                        ยังไม่มีข้อมูล
                                    </p>
                                </div>
                            </div>
                            <div class="divide-y divide-gray-300 dark:bg-[#262626] dark:border-[#262626]">
                                <div v-for="(d, n) in submitlist" :key="n" class="w-full flex py-3 px-4 items-center">
                                    <p class="text-lg font-medium w-8 text-right dark:text-[#fefefe]">{{ n + 1 }}.</p>
                                    <p class="text-lg text-wrap font-medium ml-4 dark:text-[#fefefe]">
                                        {{ d.question_name }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </NuxtLayout>
</template>
<script setup lang="ts">

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'
import { Radar } from 'vue-chartjs'


const config = useRuntimeConfig()

////////////////////////////////////// Auth //////////////////////////////////////
definePageMeta({
    auth: { unauthenticatedOnly: false, navigateAuthenticatedTo: '/' }
})

const { status, data } = useAuth()
const data_user = ref<any>(data.value)

////////////////////////////////////// Radar Chart //////////////////////////////////////
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const radarChart:any = ref(null)

const datasets = ref<{
  labels: string[],
  datasets: {
    label: string,
    backgroundColor: string,
    borderColor: string,
    pointBackgroundColor: string,
    pointBorderColor: string,
    pointHoverBackgroundColor: string,
    pointHoverBorderColor: string,
    data: any[]
  }[]
}>({
  labels: [],
  datasets: [
    {
      label: 'My Second dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: []
    }
  ]
})


const route = useRoute()

const error_message = ref<string|null>(null)

const name = ref('')
const profile = ref('')

const submitlist = ref<any[]|null>(null)
const topic_list = ref<any[]|null>(null)
const language_list = ref<any[]|null>(null)

// data for level [count_user_do, total_question]
const level_easy = ref([0,0])
const level_medium = ref([0,0])
const level_hard = ref([0,0])

const load_topic = async () => {
  const config = useRuntimeConfig()
  const response = await fetch(config.public.backendApi + '/question/topic')

  if (response.status == 500) {
    return [null, 'มีข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์']
  }
  const data = await response.json()

  const list_data = data.data.topic_list

  return [list_data, null]
}

const load_level = async () => {    
    const config = useRuntimeConfig()
    const response = await fetch(config.public.backendApi + '/question/level')

    if (response.status == 500) {
        return [null, 'มีข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์']
    }
    const data = await response.json()

    const list_data = data.data.level_list
    let level_total = [0,0,0]
    if (list_data != null) {
        console.log(list_data)
        list_data.forEach((element:any) => {
            if (element.name === 'ง่าย') {
                level_easy.value[1] = element.question_count
                level_total[0] = element.question_count
            } else if (element.name === 'ปานกลาง') {
                level_medium.value[1] = element.question_count
                level_total[1] = element.question_count
            } else if (element.name === 'ยาก') {
                level_hard.value[1] = element.question_count
                level_total[2] = element.question_count
            }
        });
    }

    console.log('tevel count',level_total)
    return [level_total, null]
}

const load_data = async () => {

    let payload = {}
    let path = '/profile/'
    const user_session:any = data.value
    if (status.value === 'authenticated') {
        payload = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + user_session.sessionToken
            }
        }
        path += 'auth/'
    } else {
        payload = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        path += 'notauth/'
    }
        const res = await fetch(config.public.backendApi + path + route.params.id, payload)
        
        if (res.status === 404) {
            error_message.value = 'ไม่พบข้อมูลผู้ใช้งาน Username นี้'
            return null
        }
        
        if (res.status === 406) {
            error_message.value = 'บัญชีนี้ไม่ได้เปิด Profile เป็นสาธารณะ'
            return null
        }

        if (res.status === 500) {
            error_message.value = 'ฝั่ง Server มีปัญหา กรุณาลองใหม่อีกครั้ง'
            return null
        }

        const topic_all = await load_topic()

        if (topic_all[0] === null) {
            error_message.value = topic_all[1]
            return null
        }

        const data_profile = await res.json()
        name.value = data_profile.data.name
        profile.value = data_profile.data.image_profile
        submitlist.value = data_profile.data.submit_list.list
        language_list.value = data_profile.data.language_list.list

        let level_data:any[] = data_profile.data.level_list.list

        let level_count = [0,0,0]
        if (level_data != null) { 
            level_data.forEach((element:any) => {
                if (element.level_name === 'ง่าย') {
                    level_easy.value[0] = element.pass_question
                    level_count[0] = element.pass_question
                } else if (element.level_name === 'ปานกลาง') {
                    level_medium.value[0] = element.pass_question
                    level_count[1] = element.pass_question
                } else if (element.level_name === 'ยาก') {
                    level_hard.value[0] = element.pass_question
                    level_count[2] = element.pass_question
                }
            });
        }

        let topic_data:any[] = data_profile.data.topic_list.list

        topic_list.value = topic_data

        topic_all[0].forEach((topic:any) => {
            datasets.value.labels.push(topic.name)

            let has_topic = false
            let count = 0

            if (topic_data != null) {
                topic_data.forEach((element:any) => {
                if (element.topic_id === topic.id) {
                    has_topic = true
                    count = element.pass_question
                }
            });
            }

            if (has_topic) {
                datasets.value.datasets[0].data.push(count)
            } else {
                datasets.value.datasets[0].data.push(null)
            }
        });

        console.log(datasets.value)

        return level_count
}
const loading_all = ref(true)

const progress_easy = ref(0)
const progress_medium = ref(0)
const progress_hard = ref(0)
const progress_all = ref(100)

onMounted(async () => {
    const level_total_data = await load_level()
    const level_count = await load_data()
    
    loading_all.value = false

    if (level_count === null || level_count === undefined) {
        return
    }


    if (level_total_data[0] === null) {
        return
    }

    //callculate
    if (level_count[0] > 0 && level_count[0] !== null) {
        let total = 1;

        console.log("level_total_data", level_total_data[0])
        if (level_total_data && level_total_data[0] && level_total_data[0][0]) {
            total = Number(level_total_data[0][0]);  // ใช้ค่าใน array ถ้ามี
        } else {
            total = 1;  // กำหนดค่าเริ่มต้นเป็น 1 หรือค่าที่เหมาะสมแทน 0
        }

        console.log("total", total)
        console.log(total)
        const interval_easy = setInterval(() => {
        if (progress_easy.value < (level_count[0] / Number(total)) * 100) {
            progress_easy.value += 1
        } else {
            clearInterval(interval_easy)
        }
        }, 20)
    }


    if (level_count[1] > 0 && level_count[1] !== null) {
        let total = 1

        if (level_total_data && level_total_data[0] && level_total_data[0][1]) {
            total = Number(level_total_data[0][1]);  // ใช้ค่าใน array ถ้ามี
        } else {
            total = 1;  // กำหนดค่าเริ่มต้นเป็น 1 หรือค่าที่เหมาะสมแทน 0
        }
        const interval_medium = setInterval(() => {
            if (progress_medium.value < (level_count[1] / Number(total)) * 100) {
                progress_medium.value += 1
            } else {
            clearInterval(interval_medium)
            }
        }, 20)
    }

    if (level_count[2] > 0 && level_count[2] !== null) {
        let total = 1

        if (level_total_data && level_total_data[0] && level_total_data[0][2]) {
            total = Number(level_total_data[0][2]);  // ใช้ค่าใน array ถ้ามี
        } else {
            total = 1;  // กำหนดค่าเริ่มต้นเป็น 1 หรือค่าที่เหมาะสมแทน 0
        }

        const interval_hard = setInterval(() => {
            if (progress_hard.value < (level_count[2] / Number(total)) * 100) {
                progress_hard.value += 1
            } else {
            clearInterval(interval_hard)
            }
        }, 20)
    }

    if (level_count[0] + level_count[1] + level_count[2] > 0 && level_count[2] !== null) {
        let total_easy = level_total_data?.[0]?.[0] ? level_total_data[0][0] : 0
        let total_medium = level_total_data?.[0]?.[1] ? level_total_data[0][1] : 0
        let total_hard = level_total_data?.[0]?.[2] ? level_total_data[0][2] : 0

        let progress_cal = 100 - (((level_count[0] + level_count[1] + level_count[2]) / (Number(total_easy) + Number(total_medium) + Number(total_hard))) * 100)

        const interval_all = setInterval(() => {
            if (progress_all.value > progress_cal) {
                progress_all.value -= 1
            } else {
            clearInterval(interval_all)
            }
        }, 20)
    }

})

useSeoMeta({
  title: 'Profile ME Coding in Code with Me',
  ogTitle: 'Profile ME Coding in Code with Me',
  description: 'นี่คือ profile การเขียนโค้ดของฉัน',
  ogDescription: 'นี่คือ profile การเขียนโค้ดของฉัน'
})

</script>