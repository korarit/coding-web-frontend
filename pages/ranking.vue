<template>
    <NuxtLayout name="defaultmain">
      <div class="flex flex-col min-h-[calc(100dvh-65px)] max-w-[100%] pt-[32px] sm:pt-[64px] px-4 xl:px-16 2xl:px-[128px]">
  
        <div class="flex-auto flex flex-col min-h-full w-full px-10 sm:px-20 lg:px-24  sm:border-2 sm:border-b-0 sm:rounded-b-sm sm:rounded-2xl sm:border-[#9C9C9C] dark:border-[#545454]">
            
            <div class="flex-none flex justify-between px-8 sm:pt-10">
                <div class="flex items-center dark:text-[#FEFEFE] text-[20px] 2xl:text-[30px] 2xl:leading-7 xl:text-[28px] lg:text[26px] md:text-[24px] sm:text-[22px]">
                    <font-awesome-icon
                        :icon="['fas', 'ranking-star']"
                        class="text-[#03B796] dark:text-[#3DD6BA] fa-lg pr-2 drop-shadow-lg h-fit"
                    />
                    TOP USER RANKING
                </div>

                <div class="flex items-center space-x-2">
                    <DropdownCheckSelect customclass="w-[200px] border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex items-center justify-between p-2 drop-shadow-md xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[12px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
                        v-model="selectIndexTopic" 
                        :list_data="TopicListName" 
                        icon="caret-down"
                        icon-class=" text-[#4F4F4F] dark:text-[#8A8A8A] 2xl:text-[28px] xl:text-[28px] lg:text-[28px] md:text-[26px] sm:text-[22px] text-[20px]"
                        @select="fitterData"
                    />
                    <DropdownCheckSelect customclass="w-[200px] border-2 border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex items-center justify-between p-2 drop-shadow-md xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[12px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
                        v-model="selectIndexLang" 
                        :list_data="LangListName" 
                        icon="caret-down"
                        icon-class=" text-[#4F4F4F] dark:text-[#8A8A8A] 2xl:text-[28px] xl:text-[28px] lg:text-[28px] md:text-[26px] sm:text-[22px] text-[20px]"
                        @select="fitterData"
                    />
                </div>
            </div>

            <hr class="flex-none mt-5 drop-shadow-lg mb-5 border-[#9C9C9C] dark:border-[#626262]"/>

            <div class="flex-none w-full px-8">
                <div class="flex flex-row border-2 rounded-2xl my-6 drop-shadow-lg h-fit border-[#00B191] text-[#FCFCFC] bg-[#00C7A3] dark:text-[#0F0F0F] dark:bg-[#3DD6BA] dark:border-[#00B191]">
                    <div class="w-[15%] flex justify-center text-[16px] 2xl:text-[26px] xl:text-[24px] lg:text[22px] md:text-[20px] sm:text-[18px]">
                    No.
                    </div>
                    <div class="basis-3/4 border-l-2 border-[#00B191]">
                        <p class="ml-[calc(20%+40px)] text-[16px] 2xl:text-[26px] xl:text-[24px] lg:text[22px] md:text-[20px] sm:text-[18px]">
                            Name
                        </p>
                    </div>
                    <div class="basis-3/4 border-l-2 border-[#00B191] flex justify-center text-[16px] 2xl:text-[26px] xl:text-[24px] lg:text[22px] md:text-[20px] sm:text-[18px]">
                    Point
                    </div>
                </div>
            </div>
  
            <div class="flex-auto flex-col w-full px-8 space-y-6">

                <div v-for="(data, index) in rankingShow" class="flex flex-row items-center odd:border py-2 rounded-2xl h-fit text-[#000000] odd:border-[#BABABA] odd:bg-[#FEFEFE] odd:dark:text-[#FEFEFE] odd:dark:bg-[#262626] odd:dark:border-[#626262]">
                    <div class="w-[15%] flex justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]">
                        <p class="w-fit">{{ index + 1 }}</p>
                    </div>
                    <div class="basis-3/4 flex items-center">
                        <div class="mx-[10%] h-10 w-10 bg-slate-300 rounded-md overflow-hidden shadow-sm shadow-black/30">
                            <img v-if="data.image_profile != '' && data.image_profile != null" class="w-full h-full object-cover" :src="'https://pub-3d57d68059384f598b7ac0875ccf93db.r2.dev/profile/'+data.image_profile">
                            <div v-else class="w-full h-full flex items-center justify-center">
                                <font-awesome-icon :icon="['fas', 'user']" class="text-[#202020] text-5xl" />
                            </div>
                        </div>
                        <p class="text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]">{{ data.name }}</p>
                    </div>
                    <p class="basis-3/4 flex justify-center text-[10px] 2xl:text-[20px] xl:text-[18px] lg:text[16px] md:text-[14px] sm:text-[12px]">{{ data.point }}</p>
                </div>
            </div>

            <div class="flex-none py-7 flex justify-center items-center">
                <Pagination v-model="page" :countAll="rankingData.length" :countPerPage="10" />
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

onMounted(async () => {
    await load_topic()
    await load_lang()
    const status = await load_data()
    if (status) {
        pagination(1)
    }
})

const rankingData = ref<any>([])
const load_data = async () => {
    const config = useRuntimeConfig()
    const response = await fetch(config.public.backendApi + '/ranking')
    if (response.status !== 200) {
        console.error('Failed to fetch data')
        return false
    }
    const data = await response.json()
    rankingData.value = data.data.list_ranking
    return true
}

const fitterData = async () => {
    const topic = TopicData.value[selectIndexTopic.value - 1]
    const lang = LangData[selectIndexLang.value - 1]

    const config = useRuntimeConfig()
    if (selectIndexTopic.value != 0 && selectIndexLang.value !=0) {
        const response = await fetch(config.public.backendApi + '/ranking?topic_id=' + topic.id + '&lang_id=' + lang.id)
        if (response.status !== 200) {
            console.error('Failed to fetch data')
            return false
        }
        const data = await response.json()
        rankingData.value = await data.data.list_ranking
        pagination(page.value)
    } else if (selectIndexTopic.value != 0) {
        const response = await fetch(config.public.backendApi + '/ranking?topic_id=' + topic.id)
        if (response.status !== 200) {
            console.error('Failed to fetch data')
            return false
        }
        const data = await response.json()
        rankingData.value = await data.data.list_ranking

        pagination(page.value)
    } else if (selectIndexLang.value != 0) {
        const response = await fetch(config.public.backendApi + '/ranking?lang_id=' + lang.id)
        if (response.status !== 200) {
            console.error('Failed to fetch data')
            return false
        }
        const data = await response.json()
        rankingData.value = await data.data.list_ranking

        pagination(page.value)
    } else {
        const status = await load_data()
        if (status) {
            pagination(page.value)
        }
    }
}

const rankingShow = ref<any>([])
const page = ref<number>(1)
const pagination = (page: number) =>{
    const start = (page - 1) * 10;
    const end = start + 10;
    const result = rankingData.value.slice(start, end);
    rankingShow.value = result;
}
watch(() => page.value, (value) => {
    pagination(value)
})

</script>