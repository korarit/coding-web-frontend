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
                <button v-for="(item, index) in TestCaseList" :key="item.id" @click="TestCaseSelectIndex = index"
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
        <div v-else class="flex-auto">
            <div class="min-w-full min-h-full flex items-center justify-center">
                <p class="text-[20px] font-light text-[#303030]">คุณควร รัน โปรแกรม ที่คุณเขียนก่อน</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
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

function updateInput(id: number, Inputid: number, value: string|null) {
    let indexTestcase = TestCaseList.value.findIndex((item) => item.id === id)
    let indexInput = TestCaseList.value[indexTestcase].input.findIndex((item) => item.id === Inputid)
    TestCaseList.value[indexTestcase].input[indexInput].input = value

    console.log(TestCaseList.value)
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
</script>