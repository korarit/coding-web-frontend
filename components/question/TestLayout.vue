<template>
    <div
        class="flex flex-col w-full h-full bg-[#FFFFFF] dark:bg-[#262626] border border-[#B0B0B0] dark:border-[#545454] rounded-md overflow-hidden drop-shadow-md">

        <!-- head title test -->
        <div
            :class="`flex-none w-full bg-[#F6F6F6] dark:bg-[#3D3D3D] border-b border-[#B0B0B0] dark:border-[#545454] flex ${isVerticalRightMode ? 'h-full justify-between vertical-mode' : 'h-9 items-center justify-between px-1'}`">
            <div class="flex h-full items-center gap-[2px]" v-show="statusShowTitle">
                <button @click="ShowTestCase = true"
                    :class="`hover:bg-[#e4e4e4] dark:hover:bg-[#2e2e2e] rounded-md flex items-center gap-2 ${isVerticalRightMode ? 'h-fit py-2' : 'h-8 px-2'}`">
                    <font-awesome-icon @mouseover="expandButtonShow(1, false)" :icon="['far', 'square-check']"
                        :class="`text-[20px] ${ShowTestCase ? 'text-[#00C7A3]' : 'text-[#7FDBC1]'}`" />
                    <span :class="`text-[16px] ${ShowTestCase ? 'text-[#000000] dark:text-[#E6E6E6]  font-medium' : 'text-[#6B6B6B] dark:text-[#C8C8C8] font-light'} `"> Test Case</span>
                </button>

                <div class="h-5 w-[1px] bg-[#B0B0B0]"></div>

                <button @click="ShowTestCase = false"
                    :class="`hover:bg-[#e4e4e4] dark:hover:bg-[#2e2e2e] rounded-md h-8 px-2 flex items-center gap-2 ${isVerticalRightMode ? 'h-fit py-2' : 'h-8 px-2'}`">
                    <font-awesome-icon :icon="['fas', 'terminal']"
                        :class="`text-[20px] ${!ShowTestCase ? 'text-[#00C7A3]' : 'text-[#7FDBC1]'}`" />
                    <span :class="`text-[16px] ${!ShowTestCase ? 'text-[#000000] dark:text-[#E6E6E6]  font-medium' : 'text-[#6B6B6B] dark:text-[#C8C8C8] font-light'} `">Test Result</span>
                </button>
            </div>

            <div class="flex items-center gap-[4px]">
                <button @click="setHeightTest(0)" v-show="paneTest > 2 && TestHidden == false"
                    class="hover:bg-[#e4e4e4] dark:hover:bg-[#2e2e2e] rounded-md h-8 w-8 flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'chevron-up']" class="text-[24px] text-[#6B6B6B] dark:text-[#B3B2B2]" />
                </button>
                <button @blur="expandButtonShow(1, true)" @mouseleave="expandButtonShow(1, true)"
                    @click="setHeightTest(null)" v-show="paneTest < 2 || TestHidden == true"
                    class="hover:bg-[#e4e4e4] dark:hover:bg-[#2e2e2e] rounded-md h-8 w-8 flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'chevron-down']" class="text-[24px] text-[#6B6B6B] dark:text-[#B3B2B2]" />
                </button>
            </div>
        </div>

        <!-- test cases -->
        <div class="flex-auto w-full h-[calc(100%-36px)] p-3 overflow-y-auto" v-if="ShowTestCase">
            <div class="flex gap-x-3">
                <button v-for="(item, index) in TestCaseList" :key="item.id" @click="selectTestCase(index)"
                    class="  border border-[#AEAEAE] rounded-md py-[4px] px-3 text-[16px] leading-2 h-fit text-[#202020] dark:text-[#FEFEFE]"
                    :class="TestCaseSelectIndex === index ? 'bg-[#e2e2e2] dark:bg-[#4d4c4c] ' : 'bg-[#F9F9F9] dark:bg-[#656565] hover:bg-[#e2e2e2] dark:hover:bg-[#4d4c4c] active:bg-[#e2e2e2] active:hover:bg-[#4d4c4c]'"
                    >
                    Case {{ item.id }}
                </button>
                <button
                    @click="addTestCase()"
                    class=" hover:bg-[#e2e2e2] dark:hover:bg-[#404040] active:bg-[#e2e2e2] active:hover:bg-[#404040] flex items-center justify-center rounded-md h-[32px] w-[32px] text-[28px] text-[#202020] dark:text-[#E6E6E6] ">
                    <font-awesome-icon :icon="['fas', 'plus']" />
                </button>
            </div>

            <div class="w-full h-px bg-[#AEAEAE] my-3"></div>

            <div class="flex flex-col gap-y-3 min-w-full">
                <div class="flex items-center w-full gap-x-3" v-for="(item, index) in TestCaseList[TestCaseSelectIndex].input">
                    <p class="text-[16px] text-[#202020] dark:text-[#E6E6E6] flex-none leading-4">Input line</p>
                    <input type="text"
                        v-model="TestCaseList[TestCaseSelectIndex].input[index].input"
                        @change="updateInput"
                        @input="updateInput"
                        class="flex-auto h-8 border border-[#AEAEAE] dark:border-[#676767] dark:bg-[#242424] rounded-md px-2 text-[16px] text-[#202020] dark:text-[#FEFEFE] placeholder:text-[16px] placeholder:font-light placeholder:text-[#AEAEAE] shadow-inner"
                        :placeholder="String(index + 1)" />
                    <button @click="removeInput(TestCaseSelectIndex, index)" class="text-[16px] text-[#FEFEFE] h-8 w-8 rounded-md bg-red-500 hover:bg-red-600 flex items-center justify-center">
                        <font-awesome-icon :icon="['fas', 'trash']" />
                    </button>
                </div>
                <div class="flex items-center w-full gap-x-3">
                    <p class="text-[16px] text-[#202020] dark:text-[#E6E6E6] flex-none leading-4">Input Add </p>
                    <button @click="addInput(TestCaseSelectIndex)" class="flex-auto bg-[#606060] dark:bg-[#FEFEFE] hover:bg-[#303030] dark:hover:bg-[#5b5b5b] active:bg-[#303030] active:hover:bg-[#5b5b5b] drop-shadow-md rounded-md py-[6px] px-3 text-[16px] font-medium text-[#FEFEFE] dark:text-[#202020] dark:hover:text-[#FEFEFE] dark:active:text-[#FEFEFE]">
                        เพิ่ม input
                    </button>
                </div>
            </div>
            <div class="w-full h-px bg-[#AEAEAE] my-[12px]"></div>
            <div class="flex flex-col gap-y-3 min-w-full">
                <div class="flex items-center w-full gap-x-3">
                    <p class="text-[16px] text-[#202020] dark:text-[#E6E6E6] flex-none leading-4">Target &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <input type="text"
                        v-model="TestCaseList[TestCaseSelectIndex].target"
                        class="flex-auto h-8 border border-[#AEAEAE] dark:border-[#676767] dark:bg-[#242424] rounded-md px-2 text-[16px] text-[#202020] placeholder:text-[16px] placeholder:font-light placeholder:text-[#AEAEAE] shadow-inner"
                        placeholder="Target" />
                </div>
            </div>
        </div>

        <!-- Test Result -->
        <div v-else-if="ShowTestCase == false && resultTest == null && testLoading == false && resultType != 'submit'" class="flex-auto">
            <div class="min-w-full min-h-full flex items-center justify-center">
                <p class="text-[20px] font-light text-[#303030] dark:text-[#FEFEFE]">คุณควร รัน โปรแกรม ที่คุณเขียนก่อน</p>
            </div>
        </div>

        <!-- Test Result -->
        <div v-else-if="testLoading == true && resultType == 'test'" class="flex-auto">
            <div class="min-w-full min-h-full flex items-center justify-center">
                <div class="flex gap-x-3 items-center">
                    <div  class="mx-auto py-[1.154px] px-1 w-fit h-fit">
                        <svg  class=" animate-spin -ml-1 h-[28px] w-[28px] text-[#303030] dark:text-[#FEFEFE]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                    <p class="text-[24px] font-light text-[#303030] dark:text-[#FEFEFE]">กำลังรันโปรแกรมของคุณ</p>
                </div>
            </div>
        </div>
        <div v-else class="flex-auto w-full h-[calc(100%-36px)] overflow-y-auto">

            <!-- ผลลัพท์การทดสอบ code -->
            <div class="flex flex-col gap-y-2 p-3" v-if="resultType == 'test' && resultTest != null">
                <p v-if="resultTest.status == 'success'" class="text-[32px] leading-9 text-green-500">Success</p>
                <p v-else class="text-[32px] leading-7 text-red-500 capitalize">{{ resultTest.status }}</p>

                <!-- ถ้า code error -->
                <div v-if="resultTest.status == 'code error'" class="w-full h-fit px-2 py-1 rounded-md bg-[#ffe5e5] text-[16px] text-red-500 my-3 ">{{ resultTest.code_error }}</div>

                <p class="text-[20px] leading-5">Input</p>
                <div class="w-full h-fit rounded bg-gray-200 px-2 py-1">
                    <p v-if="resultTest.input != ''" class="text-[16px]">{{ resultTest.input }}</p>
                    <p v-else class="text-[16px]">&nbsp;</p>
                </div>

                <p v-if="resultTest.status != 'code error'" class="text-[20px] leading-6">Output</p>
                <div v-if="resultTest.status != 'code error'" class="w-full rounded bg-gray-200 px-2 py-1">
                    <p class="text-[16px]">{{ resultTest.code_output }}</p>
                </div>

                <p class="text-[20px] leading-6">Expexted</p>
                <div class="w-full rounded bg-gray-200 px-2 py-1">
                    <p v-if="TestCaseList[TestCaseSelectIndex].target != ''" class="text-[16px]">{{ TestCaseList[TestCaseSelectIndex].target }}</p>
                    <p v-else class="text-[16px]">&nbsp;</p>
                </div>
            </div>


            <!-- ผลลัพท์การส่ง code -->
            <div class="flex flex-col px-3 divide-y divide-gray-300" v-else-if="resultType == 'submit' && TestCaseCount != 0">
                <!-- รายการ Testcase ที่ทดสอบ -->
                <div class="w-full flex flex-col" v-for="i in TestCaseCount">
                    <div class="w-full flex justify-between" :class="ShowTestResult[i-1] ? 'pt-5' : 'py-5'">
                        <p class="text-[24px] leading-5">Test Case {{ i }}</p>

                        <div v-if="resultSubmit[i-1] == undefined" class="py-[1.154px] px-1 w-fit h-fit">
                            <svg  class=" animate-spin -ml-1 h-[20px] w-[20px] text-[#303030] dark:text-[#FEFEFE]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                        <div v-else class="flex items-center gap-x-2">
                            <p v-if="resultSubmit[i-1].status == 'success'" class="text-[18px] leading-5 text-green-500 capitalize">{{ resultSubmit[i-1].status }}</p>
                            <p v-else class="text-[18px] leading-5 text-red-500 capitalize">{{ resultSubmit[i-1].status }}</p>
                            <p class="text-[20px] text-[#5e5d5d] leading-3" @click="ShowTestResult[i-1] = !ShowTestResult[i-1]">
                                <font-awesome-icon :icon="['fas', 'chevron-down']" class="transition duration-500" :class="ShowTestResult[i-1] ? 'rotate-180' : 'rotate-0'" />
                            </p>
                        </div>
                    </div>
                    <div class="w-full flex flex-col gap-y-3 mt-4 mb-5" v-if="resultSubmit[i-1] != undefined && ShowTestResult[i-1]">
                        <p v-if="resultSubmit[i-1].status == 'success'" class="text-[22px] leading-5 text-green-500">Success</p>
                        <p v-else class="text-[22px] leading-7 text-red-500 capitalize">{{ resultSubmit[i-1].status }}</p>

                        <!-- ถ้า code error -->
                        <div v-if="resultSubmit[i-1].status == 'code error'" class="w-full h-fit px-2 py-1 rounded-md bg-[#ffe5e5] text-[16px] text-red-500 my-3 ">{{ resultSubmit[i-1].code_error }}</div>

                        <div>
                            <p class="text-[16px] leading-4">Input</p>
                            <div class="w-full rounded bg-gray-200 px-2 py-1 mt-1">
                                <p v-if="resultSubmit[i-1].input != ''" class="text-[16px]">{{ resultSubmit[i-1].input }}</p>
                                <p v-else class="text-[16px]">&nbsp;</p>
                            </div>   
                        </div>
                        

                        <div v-if="resultSubmit[i-1].status != 'code error'">
                            <p class="text-[16px] leading-4">Output</p>
                            <div class="w-full rounded bg-gray-200 px-2 py-1 mt-1">
                                <p v-if="resultSubmit[i-1].code_output != ''" class="text-[16px]">{{ resultSubmit[i-1].code_output }}</p>
                                <p v-else class="text-[16px]">&nbsp;</p>
                            </div>
                        </div>

                        <div>
                            <p class="text-[16px] leading-4">Expexted</p>
                            <div class="w-full rounded bg-gray-200 px-2 py-1 mt-1">
                                <p v-if="resultSubmit[i-1].expected != ''" class="text-[16px]">{{ resultSubmit[i-1].expected }}</p>
                                <p v-else class="text-[16px]">&nbsp;</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
type resultOfSummit = {
    status:string
    memory_usage:number
    time_usage:number
    input:string
    expected:string
    args:string[]
    error:string
    code_output:string
    code_error:string
}

type resultOfTest = {
    status:string
    memory_usage:number
    time_usage:number
    input:string
    error:string
    code_output:string
    code_error:string
}

const props = defineProps<{
    resultType: string
    resultTest: resultOfTest|null
    resultSubmit: resultOfSummit[]

    TestCaseCount: number

    paneTest: number
    isVerticalRightMode: boolean
    TestHidden: boolean
    statusShowTitle: boolean
}>()
const ShowTestCase = ref(true)



const emit = defineEmits(['expandButtonShow', 'setHeightTest'])

function setHeightTest(height: number | null) {
    emit('setHeightTest', height)
}

function expandButtonShow(index: number, status: boolean) {
    emit('expandButtonShow', index, status)
}

type InputTest = {
    id: number
    input: string|null
}
type TestCase = {
    id: number
    input_length: number
    input: InputTest[]
    target: string
}

const TestCaseList = ref<TestCase[]>([{
    id: 1,
    input_length: 2,
    input: [{id: 1, input: ''}, {id: 2, input: ''}],
    target: ''
},
])

const TestCaseSelectIndex = ref<number>(0)
function addInput(index: number) {

    // + 1 input
    TestCaseList.value[index].input_length += 1

    TestCaseList.value[index].input.push({
        id: TestCaseList.value[index].input_length,
        input: ''
    })

}

function removeInput(TestCaseSelectIndex: number, index: number) {
    if (TestCaseList.value[TestCaseSelectIndex].input.length > 1) {
        TestCaseList.value[TestCaseSelectIndex].input.splice(index, 1)
    }
}

function addTestCase() {
    const id = TestCaseList.value[TestCaseList.value.length - 1].id + 1
    TestCaseList.value.push({
        id: id,
        input_length: 1,
        input: [{id: 0, input: ''}],
        target: ''
    })
}

const TestInput = defineModel<string>('testInput')
const TestOutput = defineModel<string>('testOutput')


watch(() => TestCaseList.value[TestCaseSelectIndex.value].target, (val) => {
    TestOutput.value = val
})


function selectTestCase(index: number) {
    TestCaseSelectIndex.value = index

    // set input and \n to input
    TestInput.value = TestCaseList.value[index].input.map((item) => item.input).join('\n')
    TestOutput.value = TestCaseList.value[index].target
}

function updateInput() {
    let input = TestCaseList.value[TestCaseSelectIndex.value].input.map((item) => item.input).join('\n')
    TestInput.value = input
    console.log(input)
}


/////////////////////////// control test result /////////////////////////////////

const testLoading = defineModel<boolean>('testLoading')
const submitLoading = defineModel<boolean>('submitLoading')
watch(() => testLoading.value, (val) => {
    if (val == true) {
        ShowTestCase.value = false
    }
})
watch(() => submitLoading.value, (val) => {
    if (val == true) {
        ShowTestCase.value = false
    }
})

////////////////////////////// control test case /////////////////////////////////
const ShowTestResult = ref<boolean[]>([])

watch(() => props.TestCaseCount, (val) => {
    if (ShowTestResult.value.length > 0) {
        ShowTestResult.value = []
    }

    if (val == 0) {
        return
    }
    for (let i = 0; i < val; i++) {
        ShowTestResult.value.push(false)
    }
})
</script>