<template>
    <NuxtLayout name="dashboard">
        <div class="flex flex-col items-center justify-center space-y-8 w-fit lg:w-[80dvw] 2xl:w-[60dvw] mx-auto">
            <div class="flex justify-between mb-8 w-full">
                <div
                    class="flex-col items-center justify-center bg-[#FEFEFE] dark:bg-[#262626] shadow-lg rounded-xl p-4 flex w-[30%] h-60 border border-[#BABABA]">
                    <h3 class="text-black text-xl 2xl:text-2xl font-medium mb-2 dark:text-[#fefefe]">
                        ผู้สมัครทั้งหมด
                    </h3>
                    <div class="flex items-center justify-center">
                        <div class="relative">
                            <svg class="w-36 h-36 transform rotate-180" viewBox="0 0 36 36">
                                <path class="text-[#b7fff3]" d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="2" />
                                <path class="text-[#27DEBF]" stroke-dasharray="75, 100" d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="2" />
                            </svg>
                            <span class="absolute inset-0 flex items-center justify-center font-semibold text-xl dark:text-[#fefefe]">
                                {{ tweened.countUser.toFixed(0) }}
                            </span>
                        </div>
                    </div>
                </div>

                <div
                    class="flex-col items-center justify-center bg-[#FEFEFE] dark:bg-[#262626] shadow-lg rounded-xl p-4 flex w-[30%] h-60 border border-[#BABABA]">
                    <h3 class="text-black text-xl 2xl:text-2xl font-medium mb-2 dark:text-[#fefefe]">
                        โจทย์ทั้งหมด
                    </h3>
                    <div class="flex items-center justify-center">
                        <div class="relative">
                            <svg class="w-36 h-36 transform rotate-180" viewBox="0 0 36 36">
                                <path class="text-[#b7fff3]" d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="2" />
                                <path class="text-[#27DEBF]" stroke-dasharray="75, 100" d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="2" />
                            </svg>
                            <span class="absolute inset-0 flex items-center justify-center font-semibold text-xl dark:text-[#fefefe]">
                                {{ tweened.countProblem.toFixed(0) }}
                            </span>
                        </div>
                    </div>
                </div>

                <div
                    class="flex-col items-center justify-center bg-[#FEFEFE] dark:bg-[#262626] shadow-lg rounded-xl p-4 flex w-[30%] h-60 border border-[#BABABA] dark:border-[#282828]">
                    <h3 class="text-black text-xl 2xl:text-2xl font-medium mb-2 dark:text-[#fefefe]">
                        จำนวนครั้งที่มีการทำโจทย์
                    </h3>
                    <div class="flex items-center justify-center">
                        <div class="relative">
                            <svg class="w-36 h-36 transform rotate-180" viewBox="0 0 36 36">
                                <path class="text-[#b7fff3]" d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="2" />
                                <path class="text-[#27DEBF]" stroke-dasharray="75, 100" d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="2" />
                            </svg>
                            <span class="absolute inset-0 flex items-center justify-center font-semibold text-xl dark:text-[#fefef1]">
                                {{ tweened.countSubmit.toFixed(0) }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full">
                <h2 class="text-xl font-semibold mb-4 dark:text-[#fefefe]">
                    โจทย์ที่ถูกทำมากที่สุด
                </h2>
                <div class="overflow-x-auto rounded-xl">
                    <table class="min-w-full table-auto rounded-lg dark:border-[#0f0f0f]">
                        <thead>
                            <tr class="bg-[#00C7A3] dark:bg-[#3DD6BA] text-[20px] font-medium text-white  dark:text-[#0f0f0f]">
                                <th class="font-medium border px-4 py-2">No.</th>
                                <th class="font-medium border px-4 py-2">รายการโจทย์</th>
                                <th class="font-medium border px-4 py-2">จำนวนผู้เข้าทำโจทย์</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(d, index) in listTopSubmit" :key="index"
                                class="bg-white border-b dark:border-[#0f0f0f] hover:bg-gray-200 cursor-pointer dark:bg-[#262626] text-[16px] dark:text-[#fefefe] dark:hover:bg-[#343434]">
                                <td class="border px-4 py-2 text-center">{{ index + 1 }}</td>
                                <td class="border px-4 py-2">
                                    {{ d.question_title }}
                                </td>
                                <td class="border px-4 py-2 text-center">{{ d.submit_count }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
<style scoped>
.table-auto th,
.table-auto td {
  text-align: center;
}
</style>

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
const config = useRuntimeConfig()
const { $gsap } = useNuxtApp()

const countUser = ref<number>(10000)
const countProblem = ref<number>(10000)
const countSubmit = ref<number>(10000)
const tweened = reactive({
    countUser: 0,
    countProblem: 0,
    countSubmit: 0
})

const load_count = async () => {
    const user_session:any = data.value
    const res = await fetch(config.public.backendApi + '/dashboard/report', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user_session.sessionToken
        }
    })
    const datajson = await res.json()
    if (!res.ok) {
        console.log(datajson)
        return false
    }
    countUser.value = datajson.data.count_user
    countProblem.value = datajson.data.count_question
    countSubmit.value = datajson.data.count_submit

    return true
}

const listTopSubmit = ref<any[]>([])
const load_topsubmit = async () => {
    const user_session:any = data.value
    const res = await fetch(config.public.backendApi + '/dashboard/topsubmit/'+10, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user_session.sessionToken
        }
    })
    const datajson = await res.json()
    if (!res.ok) {
        console.log(datajson)
        return false
    }
    listTopSubmit.value = datajson.data

    return true
}

onMounted(async () => {
    const status_load_count = await load_count()
    await load_topsubmit()
    if (status_load_count) {
        $gsap.to(tweened, { duration: 0.5, countUser: Number(countUser.value)})
        $gsap.to(tweened, { duration: 0.5, countProblem: Number(countProblem.value)})
        $gsap.to(tweened, { duration: 0.5, countSubmit: Number(countSubmit.value)})
    }
})
</script>
