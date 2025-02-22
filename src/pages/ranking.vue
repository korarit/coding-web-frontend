<template>
    <NuxtLayout name="defaultmain" page_name="อันดับ">
        <div
            class="flex flex-col min-h-[calc(100dvh-65px)] max-w-[100%] pt-[32px] sm:pt-[64px] px-4 xl:px-16 2xl:px-[128px]">

            <div
                class="flex-auto flex flex-col min-h-full w-full sm:px-16 lg:px-[72px] xl:px-24  sm:border-2 sm:border-b-0 sm:rounded-b-sm sm:rounded-2xl sm:border-[#9C9C9C] dark:border-[#545454]">

                <div class="flex-none flex flex-col  lg:flex-row lg:justify-between space-y-4 lg:space-y-0 sm:px-8 sm:pt-10">
                    <div class="mx-auto lg:mx-0 flex items-center dark:text-[#FEFEFE] text-[20px] 2xl:text-[30px] 2xl:leading-7 xl:text-[28px] lg:text[26px] md:text-[24px] sm:text-[22px]">
                        <font-awesome-icon :icon="['fas', 'ranking-star']" class="text-[#03B796] dark:text-[#3DD6BA] fa-lg pr-2 drop-shadow-lg h-fit" />
                        TOP USER RANKING
                    </div>

                    <div class="w-full lg:w-fit flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
                        <DropdownCheckSelect
                            block-class="w-full sm:w-[50%] lg:w-fit"
                            customclass="w-full lg:w-[200px] border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex items-center justify-between p-2 drop-shadow-md xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[12px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
                            v-model="selectIndexTopic" :list_data="TopicListName" icon="caret-down"
                            icon-class=" text-[#4F4F4F] dark:text-[#8A8A8A] 2xl:text-[28px] xl:text-[28px] lg:text-[28px] md:text-[26px] sm:text-[22px] text-[20px]"
                            @select="fitterData" />
                        <DropdownCheckSelect
                            block-class="w-full sm:w-[50%] lg:w-fit"
                            customclass="w-full  lg:w-[200px] border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex items-center justify-between p-2 drop-shadow-md xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[12px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
                            v-model="selectIndexLang" :list_data="LangListName" icon="caret-down"
                            icon-class=" text-[#4F4F4F] dark:text-[#8A8A8A] 2xl:text-[28px] xl:text-[28px] lg:text-[28px] md:text-[26px] sm:text-[22px] text-[20px]"
                            @select="fitterData" />
                    </div>
                </div>

                <hr class="flex-none mt-5 drop-shadow-lg mb-5 border-[#9C9C9C] dark:border-[#626262]" />


                <div class="flex-none w-full sm:px-8">
                    <div
                        class="flex flex-row border-2 rounded-2xl mt-0 mb-6 sm:mt-4 drop-shadow-lg h-fit border-[#00B191] text-[#FCFCFC] bg-[#00C7A3] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:border-[#00B191]">
                        <div
                            class="w-[15%] flex justify-center text-[16px] 2xl:text-[26px] xl:text-[24px] lg:text[22px] md:text-[20px] sm:text-[18px]">
                            No.
                        </div>
                        <div class="basis-3/4 border-l-2 border-[#00B191]">
                            <p
                                class="text-center sm:text-left sm:ml-[calc(20%+40px)] text-[16px] 2xl:text-[26px] xl:text-[24px] lg:text[22px] md:text-[20px] sm:text-[18px]">
                                Name
                            </p>
                        </div>
                        <div
                            class="basis-3/4 border-l-2 border-[#00B191] flex justify-center text-[16px] 2xl:text-[26px] xl:text-[24px] lg:text[22px] md:text-[20px] sm:text-[18px]">
                            Point
                        </div>
                    </div>
                </div>

                <div v-if="loading" class="flex-auto h-full flex justify-center items-center ">
                    <div class="mx-auto flex items-center space-x-4">
                        <svg class=" animate-spin -ml-1 h-10 w-10 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        <p class="text-[20px] dark:text-white">
                            กำลังดึงข้อมูล Ranking . . .
                        </p>
                    </div>
                </div>
                <div class="flex-auto flex items-center justify-center" v-else-if="rankingData.length === 0">
                    <div class="mx-auto flex items-center space-x-4">
                        <font-awesome-icon :icon="['fas', 'circle-exclamation']" class="text-[48px] text-red-600" />
                        <p class="text-[24px] dark:text-white">
                            ไม่พบข้อมูล Ranking
                        </p>
                    </div>
                </div>
                <div class="flex-auto w-full" v-else>

                    <div class="flex flex-col space-y-6 sm:px-8">
                        <div v-for="(data, index) in rankingShow"
                            class="flex flex-row items-center odd:border py-2 rounded-2xl h-fit text-[#000000] odd:border-[#BABABA] odd:bg-[#FEFEFE] dark:text-[#FEFEFE] odd:dark:bg-[#262626] odd:dark:border-[#626262]">
                            <div
                                class="w-[15%] flex justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]">
                                <p class="w-fit">{{ index + 1 }}</p>
                            </div>
                            <div class="basis-3/4 flex items-center">
                                <div
                                    class="mx-[10%] h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 bg-slate-300 rounded-md overflow-hidden shadow-sm shadow-black/30">
                                    <img v-if="data.image_profile != '' && data.image_profile != null"
                                        class="w-full h-full object-cover"
                                        :src="'https://pub-3d57d68059384f598b7ac0875ccf93db.r2.dev/profile/' + data.image_profile">
                                    <div v-else class="w-full h-full flex items-center justify-center">
                                        <font-awesome-icon :icon="['fas', 'user']" class="text-[#202020] text-5xl" />
                                    </div>
                                </div>
                                <p
                                    class="text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]">
                                    {{ data.name }}</p>
                            </div>
                            <p
                                class="basis-3/4 flex justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]">
                                {{ data.point }}</p>
                        </div>
                    </div>

                    <div class="flex-none py-7 flex justify-center items-center" >
                        <Pagination v-model="page" :countAll="rankingData.length" :countPerPage="10" />
                    </div>
                </div>



            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import LangData from '~/assets/json/editor_lang.json'


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


const selectIndexLang = ref<number>(0);
const LangListName = ref<any>([]);

LangListName.value.push('ภาษา');
const load_lang = async () => {

    LangData.forEach((element: any) => {
        LangListName.value.push(element['name']);
    });
}

const loading = ref<boolean>(true)
onMounted(async () => {
    await load_topic()
    await load_lang()
    const status = await load_data()
    if (status) {
        pagination(1)
    }
    loading.value = false
})

const rankingData = ref<any>([])
const load_data = async () => {
    const config = useRuntimeConfig()
    loading.value = true
    const response = await fetch(config.public.backendApi + '/ranking')
    if (response.status !== 200) {
        console.error('Failed to fetch data')
        loading.value = false
        return false
    }
    const data = await response.json()
    loading.value = false
    if (data.data.count === 0) {
        return false
    }
    rankingData.value = data.data.list_ranking
    return true
}

const fitterData = async () => {
    const topic = TopicData.value[selectIndexTopic.value - 1]
    const lang = LangData[selectIndexLang.value - 1]

    const config = useRuntimeConfig()

    let status:number = 0
    let res:any = []

    if (selectIndexTopic.value != 0 && selectIndexLang.value != 0) {
        const response = await fetch(config.public.backendApi + '/ranking?topic_id=' + topic.id + '&lang_id=' + lang.id)
        const data = await response.json()
        status = response.status
        res = data
    } else if (selectIndexTopic.value != 0) {
        const response = await fetch(config.public.backendApi + '/ranking?topic_id=' + topic.id)
        const data = await response.json()
        status = response.status
        res = data
    } else if (selectIndexLang.value != 0) {
        const response = await fetch(config.public.backendApi + '/ranking?lang_id=' + lang.id)
        
        const data = await response.json()
        status = response.status
        res = data
    } else {
        const status = await load_data()
        if (status) {
            pagination(page.value)
        }
        return 
    }

    if (status !== 200) {
            console.error('Failed to fetch data')
            return false
    }
    if (res.data.count === 0) {
        rankingData.value = []
        return false
    }
    rankingData.value = await res.data.list_ranking
    pagination(page.value)
}

const rankingShow = ref<any>([])
const page = ref<number>(1)
const pagination = (page: number) => {
    const start = (page - 1) * 10;
    const end = start + 10;
    const result = rankingData.value.slice(start, end);
    rankingShow.value = result;
}
watch(() => page.value, (value) => {
    pagination(value)
})

</script>