<template>
    <NuxtLayout name="dashboard">
        <div v-show="loading_all" class="flex justify-between items-center h-full">
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
        <div v-show="error_code != null && !loading_all" class="flex-auto h-full flex justify-center items-center">
            <div class="mx-auto flex items-center space-x-4">
                <font-awesome-icon :icon="['fas', 'circle-exclamation']" class="text-[72px] text-red-600" />
                <p class="text-[28px]">
                    เกิดข้อผิดพลาด HTTP {{ error_code }}
                </p>
            </div>
        </div>
        <div v-show="!loading_all && error_code == null" class="flex flex-col">

            <div class="flex-none flex justify-between items-center">
                <h1 class="text-4xl font-bold mb-4 dark:text-[#FEFEFE]">ข้อมูลของโจทย์</h1>

                <button
                    @click="openModalDelete"
                    class="flex items-center justify-center px-8 py-1 bg-red-500 hover:bg-red-600 border border-red-700 text-2xl text-[#FEFEFE] rounded-md"
                >
                    ลบโจทย์นี้
                </button>
            </div>

            <div class="border-t border-x border-gray-600 pt-10 px-12 mt-8 pb-8 rounded-t-lg h-fit">

                <div class="flex w-full space-x-4 mb-6">
                    <div class="flex w-fit items-center space-x-2">
                        <p class=" text-[#202020] dark:text-[#FEFEFE] text-[20px] font-medium">หัวข้อของโจทย์</p>
                        <DropdownCheckSelect 
                            block-class="w-fit"
                            customclass="w-[160px] border border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex items-center justify-between py-[2px] px-[8px] drop-shadow-md xl:text-[20px] lg:text-[16px] md:text-[16px] sm:text-[16px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
                            v-model="selectIndexTopic" 
                            :list_data="TopicListName" 
                            icon="caret-down"
                            icon-class="text-[#4F4F4F] dark:text-[#8A8A8A] lg:text-[24px] text-[20px]"
                        />
                    </div>
            
                    <div class="flex items-center space-x-2">
                        <label for="difficulty" class="block text-[#202020] dark:text-[#FEFEFE] text-[20px] font-medium">ระดับความยาก</label>
                        <DropdownCheckSelect 
                            block-class="w-fit"
                            customclass="w-[160px] border border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex items-center justify-between py-[2px] px-[8px] drop-shadow-md xl:text-[20px] lg:text-[16px] md:text-[16px] sm:text-[16px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
                            v-model="selectIndexLevel" 
                            :list_data="LevelListName" 
                            icon="caret-down"
                            icon-class="text-[#4F4F4F] dark:text-[#8A8A8A] lg:text-[24px] text-[20px]"
                        />
                    </div>
                </div>
        
                <div class="mb-6">
                <input
                    type="text"
                    v-model="problemName"
                    placeholder="ชื่อโจทย์"
                    class="dark:bg-[#2E2E2E] border dark:border-[#282828] border-gray-300 text-[20px] placeholder:text-[#8C8C8C] dark:placeholder:text-[#A9A9A9] rounded-lg w-full px-3 py-2 focus:outline-none"
                />
                </div>
        
                <!-- แถบเครื่องมือสีเขียว -->
                <div class="mb-6">
                    <RichText v-model="textEditor" />
                </div>

                <!-- LLM Promt -->
                <div class="flex items-center space-x-2" :class="isLLMChecked ? 'mb-1' : 'mb-6'">
                    <label for="llm" class="dark:text-[#FEFEFE] text-[20px]">LLM Prompt เงื่อนไขของโจทย์สำหรับตรวจสอบ Code </label>
                    <input
                        type="checkbox"
                        v-model="isLLMChecked"
                        class="h-[20px] w-[20px] border border-gray-300 rounded-lg"
                    />
                </div>
                <div v-if="isLLMChecked" class="mb-6">
                    <textarea
                        rows="4"
                        v-model="llmPrompt"
                        class="w-full min-h-[60px] dark:bg-[#2E2E2E] border dark:border-[#282828] border-gray-300 text-[20px] placeholder:text-[#8C8C8C] dark:placeholder:text-[#A9A9A9] shadow-inner shadow-black/5 rounded-lg px-3 py-2 focus:outline-none resize-none"
                        placeholder="LLM Prompt"
                    ></textarea>
                </div>
        
                <div class="flex h-fit items-center justify-between mb-4">
                    <h2 class="dark:text-[#FEFEFE] text-[24px] font-semibold ">สร้าง Test Case</h2>
                    <div class="flex items-center space-x-2">
                    <label for="countTestCase" class="dark:text-[#FEFEFE] text-[16px]">จำนวนการ Test</label>
                    <input @change="checkTestConut" min="1" type="number" class="rounded-md border border-gray-200 p-2 text-[16px] leading-5 w-[100px] focus:outline-none" v-model="countTestCases" />
                    <button
                        v-if="selectIndexTestType === 0"
                        @click="addTestCase"
                        class="dark:bg-[#3DD6BA] bg-[#00C7A3] border border-[#199c80] dark:border-[#066C5A] hover:bg-[#199c80] active:bg-[#199c80] text-[20px] leading-5 text-white dark:text-[#0F0F0F] py-2 px-6 rounded-lg"
                    >
                        เพิ่ม Test Case
                    </button>
                    <DropdownCheckSelect 
                        block-class="w-fit h-full"
                        customclass="w-[180px] h-full border border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex items-center justify-between py-[2px] px-[8px] drop-shadow-md xl:text-[20px] lg:text-[16px] md:text-[16px] sm:text-[16px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
                        v-model="selectIndexTestType" 
                        :list_data="['Random', 'Code Generate']" 
                        icon="caret-down"
                        icon-class="text-[#4F4F4F] dark:text-[#8A8A8A] lg:text-[24px] text-[20px]"
                    />
                    </div>
                </div>

                <div v-if="selectIndexTestType != 0" class="">
                    <div
                        class=" w-full h-fit border overflow-hidden rounded-lg bg-[#FEFEFE] dark:border-[#2E2E2E]"
                    >
                        <!-- Header with green background and "ลบ" button -->
                        <div class="flex items-center justify-between dark:text-[#FEFEFE] bg-[#E4F3F1]  dark:bg-[#262626] py-2 px-4">
                            <h2 class="text-[20px] leading-5 font-semibold">
                                Test Case 
                            </h2>
                        </div>
            
                        <!-- Form section -->
                        <div class="flex h-fit px-6 pt-4 pb-6 space-x-8 dark:bg-[#3D3D3D]">
                            <!-- Input Fields Section -->
                            <div class="w-[50%]">
                                <div class="flex items-center justify-between mb-2">
                                    <p class="dark:text-[#FEFEFE] text-[18px]">Code สำหรับสร้าง Input</p>
                                    <DropdownCheckSelect 
                                        block-class="w-fit h-full"
                                        customclass="w-[180px] h-full border border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex items-center justify-between py-[2px] px-[8px] drop-shadow-md xl:text-[16px] text-[12px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
                                        v-model="selectIndexLangGenInput" 
                                        :list_data="LangListName" 
                                        height-list="160px"
                                        icon="caret-down"
                                        icon-class="text-[#4F4F4F] dark:text-[#8A8A8A] xl:text-[20px] text-[16px]"
                                    />
                                </div>
                                <div class="w-full h-[240px]  bg-[#FEFEFE] dark:bg-[#2E2E2E] border border-gray-300 dark:border-[#1D1D1D] rounded-lg overflow-hidden">
                                    <MonacoEditor ref="editorInput" :options="{ minimap: { enabled: false }, theme: EditorMode, contextmenu: false, lineNumbersMinChars: 4, lineDecorationsWidth: 3  }" v-model="codeGenInput"
                                    :lang="LangData[selectIndexLangGenInput]['lang']" class="h-full border-[#000000] " />
                                </div>
                            </div>
                                
                            <!-- Textarea Section -->
                            <div class="w-[50%]">
                                <div class="flex items-center justify-between mb-2">
                                    <p class="dark:text-[#FEFEFE] text-[18px]">Code สำหรับสร้าง Output</p>
                                    <DropdownCheckSelect 
                                        block-class="w-fit h-full"
                                        customclass="w-[180px] h-full border border-[#BABABA] bg-[#FEFEFE] text-[#606060] rounded-lg flex items-center justify-between py-[2px] px-[8px] drop-shadow-md xl:text-[16px] text-[12px] dark:text-[#8A8A8A] dark:bg-[#282828] dark:border-[#222222]"
                                        v-model="selectIndexLangGenOutput" 
                                        :list_data="LangListName" 
                                        height-list="160px"
                                        icon="caret-down"
                                        icon-class="text-[#4F4F4F] dark:text-[#8A8A8A] xl:text-[20px] text-[16px]"
                                    />
                                </div>
                                <div class="w-full h-[240px]  bg-[#FEFEFE] dark:bg-[#2E2E2E] border border-gray-300 dark:border-[#1D1D1D] rounded-lg overflow-hidden">
                                    <MonacoEditor ref="editorOutput" :options="{ minimap: { enabled: false }, theme: EditorMode, contextmenu: false, lineNumbersMinChars: 4, lineDecorationsWidth: 3  }" v-model="codeGenOutput"
                                        :lang="LangData[selectIndexLangGenOutput]['lang']" class="h-full border-[#000000] " />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Test Case Random Section -->
                <div v-else class="flex flex-col space-y-6 ">
                    <div
                        v-for="(testCase, testCaseIndex) in testCases"
                        :key="testCaseIndex"
                        class=" w-full border overflow-hidden rounded-lg dark:border-[#2E2E2E]"
                    >
                        <!-- Header with green background and "ลบ" button -->
                        <div class="flex items-center justify-between dark:text-[#FEFEFE] bg-[#E4F3F1]  dark:bg-[#262626] py-2 px-4">
                            <h2 class="text-[20px] leading-5 font-semibold">
                                Test Case {{ testCaseIndex + 1 }}
                            </h2>
                            <button
                                @click="removeTestCase(testCaseIndex)"
                                class="dark:bg-[#CC2B2D] bg-red-500 hover:bg-red-700 text-white px-6 py-[4px] text-[20px] leading-5 rounded-lg"
                            >
                                ลบ
                            </button>
                        </div>
            
                        <!-- Form section -->
                        <div class="flex p-6 space-x-8 bg-[#FEFEFE] dark:bg-[#3D3D3D]">
                            <!-- Input Fields Section -->
                            <div class="w-[55%] flex flex-col space-y-2">
                                <div class="w-full flex">
                                    <div class="flex-none flex flex-col w-fit gap-y-2 mr-1">
                                        <label v-for="(input, inputIndex) in testCase.inputs" class="dark:text-[#FEFEFE] p-2 leading-[26px] w-fit text-[16px] font-medium">
                                            input line {{ inputIndex + 1 }} :
                                        </label>
                                    </div>
                                    <div class="flex-auto flex flex-col gap-y-2">
                                        <input
                                            v-for="(input, inputIndex) in testCase.inputs"
                                            v-model="testCase.inputs[inputIndex]"
                                            type="text"
                                            class="w-full text-[#202020] dark:text-[#FEFEFE] p-2 border border-gray-300 dark:border-[#1D1D1D] rounded-lg shadow-inner shadow-black/5 bg-[#FBFBFB] dark:bg-[#2E2E2E]"
                                        />
                                    </div>
                                    <!-- re input button aligned with the input fields -->
                                    <div class="flex-none flex flex-col space-y-2 ml-3">
                                        <button
                                            v-for="(input, inputIndex) in testCase.inputs"
                                            @click="removeInput(testCaseIndex, inputIndex)"
                                            class="w-[40px] h-[42px] bg-red-500 hover:bg-red-700 text-white text-[18px] py-2 rounded-md"
                                        >
                                            <font-awesome-icon :icon="['fas', 'trash']" />
                                        </button>
                                    </div>
                                </div>
                                <!-- Add input button aligned with the input fields -->
                                <div class="flex items-center space-x-1">
                                <label class="flex-none p-2 leading-[26px] w-fit text-[16px] font-medium opacity-0">input line 3 :</label>
                                <!-- Empty label to match the input label space -->
                                <button
                                    @click="addInput(testCaseIndex)"
                                    class="flex-auto w-full text-md leading-5 bg-[#606060] dark:bg-[#3DD6BA] hover:bg-[#4b4b4b] text-white dark:text-[#0F0F0F] py-3 rounded-lg"
                                >
                                    เพิ่ม input
                                </button>
                                </div>
                            </div>
                
                            <!-- Textarea Section -->
                            <div class="w-[45%]">
                                <textarea
                                rows="6"
                                v-model="testCase.answer"
                                class="w-full h-full p-2  dark:bg-[#2E2E2E] border border-gray-300 shadow-inner shadow-black/5 bg-[#FBFBFB] dark:border-[#1D1D1D] dark:placeholder:text-[#6b6b6b] rounded-lg resize-none"
                                placeholder="Output ที่คาดหวัง"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="flex justify-center items-center mt-8 space-x-4">
                    <button
                        @click="send"
                        class="border border-black bg-white hover:bg-[#00C7A3] hover:text-white active:bg-[#199c80] text-black rounded-lg px-6 py-2"
                    >
                        บันทึกโจทย์
                    </button>
                    <button
                        @click="openModalEnd"
                        class=" bg-red-500 hover:bg-red-600 border border-red-700 text-white rounded-lg px-6 py-2"
                    >
                        ยกเลิก
                    </button>
                </div>

            </div>
        </div>
        
    
        <div v-show="modelEnd" class="absolute min-w-full h-[100dvh] top-0 left-0">
            <ModalAlertEnd
                :message="statusMessage"
                :show="modelEnd"
                @closeModal="modelEnd = false"
                :icon="statusCreate"

                :linkToEdit="linkToEdit"
                :link-to-main="linkToEdit"

            />
        </div>

        <div v-show="modelCofirmDelete" class="absolute min-w-full h-[100dvh] top-0 left-0">
            <ModalComfirm 
                @closeModal="closeModalDelete"
                @comfirm="DeleteTopicById"
                :show="modelCofirmDelete"

                message="คุณต้องการลบ โจทย์ นี้ใช่หรือไม่ ?"
                icon="warning"

                :loading="loading_delete"
                loadingMessage="กำลังลบโจทย์ . . ."

            />
        </div>
    </NuxtLayout>
</template>
<script setup lang="ts">
import LangData from '~/assets/json/editor_lang.json'
import {v7 as uuidv7} from 'uuid'
import { set } from '@vueuse/core';

//////////////////////////////////// Auth  ////////////////////////////////////

definePageMeta({
    auth: true
})
const { status, data } = useAuth()
const router = useRouter()
const route = useRoute()

onMounted(() => {
    if (status.value === 'authenticated' && data.value) {
        let user_session: any = data.value;
        if (user_session?.type_level < 2) {
            router.push('/')
        }
    }
})


//////////////////////////////////// Topic  ////////////////////////////////////

const selectIndexTopic = ref<number>(0);
const TopicListName = ref<any>([]);
const TopicData = ref<any>([]);
TopicListName.value.push('Topic');

const load_topic = async () => {
  const config = useRuntimeConfig()
  const response = await fetch(config.public.backendApi + '/question/topic')

    if (!response.ok) {
        error_code.value = response.status;
        return;
    }

  const data = await response.json()
  
  const list_data = data.data.topic_list
  TopicData.value = list_data

  list_data.forEach((element: any) => {
    TopicListName.value.push(element['name']);
  });
}

//////////////////////////////////// Level  ////////////////////////////////////

const selectIndexLevel = ref<number>(0);
const LevelListName = ref<any>([]);
const LevelData = ref<any>([]);

LevelListName.value.push('ความยาก');
const load_level = async () => {
  const config = useRuntimeConfig()
  const response = await fetch(config.public.backendApi + '/question/level')
  
  if (!response.ok) {
    error_code.value = response.status;
    return;
  }
  
  const data = await response.json()

  const list_data = data.data.level_list
  LevelData.value = list_data

  list_data.forEach((element: any) => {
    LevelListName.value.push(element['name']);
  });
}


//////////////////////////////////// Lang  ////////////////////////////////////

const LangListName = ref<string[]>([]);

const load_lang = async () => {
    LangData.forEach((element: any) => {
        LangListName.value.push(element['name']);
    });
}


//////////////////////////////////// Load Data  ////////////////////////////////////
async function processNodeImageURL(node: any) {
    if (node.type === 'image'  && node.attrs.src !== null && !node.attrs.src.includes('question')) {
        DiscriptionListImage.value.push(node.attrs.src);
        node.attrs.src = "https://pub-3d57d68059384f598b7ac0875ccf93db.r2.dev/question/" + node.attrs.src;
    }

    if (node.content) {
        // วนซ้ำไปใน content ที่ซ้อนอยู่
        for (const childNode of node.content) {
        await processNodeImageURL(childNode);
        }
    }
}

const questionData = ref<any>({});
const DiscriptionListImage = ref<string[]>([]);
const load_data = async () => {
    const config = useRuntimeConfig()
    const user_data:any = data.value;
    const response = await fetch(config.public.backendApi + '/question/data_admin/'+route.params.id,{
        headers: {
            "Authorization": "Bearer "+user_data.sessionToken,
        }
    })

    const datajson = await response.json()
    if (response.status === 200) {

        problemName.value = datajson.data.name;
        questionData.value.name = datajson.data.name;

        questionData.value.point = datajson.data.point;


        const Discription = JSON.parse(datajson.data.description);
        await processNodeImageURL(Discription);
        textEditor.value.commands.setContent(Discription)

        questionData.value.description = JSON.parse(datajson.data.description);

        countTestCases.value = datajson.data.test_count;
        questionData.value.test_count = datajson.data.test_count;

        if (datajson.data.llm_prompt !== "") {
            isLLMChecked.value = true;
            llmPrompt.value = datajson.data.llm_prompt;
            questionData.value.llm_prompt = datajson.data.llm_prompt;
        }

        if (datajson.data.test_type === 'random') {

            questionData.value.test_type = 0;
            selectIndexTestType.value = 0;

            let listTest:any[] = [];
            datajson.data.list_testcase.forEach((element: any) => {
                listTest.push({
                    inputs: element.input.split('\n'),
                    answer: element.answer,
                    type: 'random',
                });
            });

            questionData.value.testcase = listTest;
            testCases.value = listTest;
        } else {
            questionData.value.test_type = 1;
            selectIndexTestType.value = 1;

            if (datajson.data.list_testcase[0].input != ""){
                const getGenInput = JSON.parse(datajson.data.list_testcase[0].input);
                
                const indexLangGenInput = LangData.findIndex((element: any) => element['lang'] === getGenInput.runtime);
                questionData.value.selectIndexLangGenInput = indexLangGenInput;
                selectIndexLangGenInput.value = indexLangGenInput;

                codeGenInput.value = getGenInput.code;
                questionData.value.codeGenInput = getGenInput.code;
            }

            const getGenOutput = JSON.parse(datajson.data.list_testcase[0].answer);

            const indexLangGenOutput = LangData.findIndex((element: any) => element['lang'] === getGenOutput.runtime);
            selectIndexLangGenOutput.value = indexLangGenOutput;
            questionData.value.selectIndexLangGenOutput = indexLangGenOutput;

            codeGenOutput.value = getGenOutput.code;
            questionData.value.codeGenOutput = getGenOutput.code;
        }

        const IndexTopic = await TopicData.value.findIndex((element: any) => element['id'] === datajson.data.topic_id) + 1;
        questionData.value.selectIndexTopic = IndexTopic;
        selectIndexTopic.value = IndexTopic;


        const IndexLevel = await LevelData.value.findIndex((element: any) => element['id'] === datajson.data.level_id) + 1;
        questionData.value.selectIndexLevel = IndexLevel;
        selectIndexLevel.value = IndexLevel;
    } else {
        alert(datajson.message);
        error_code.value = response.status;
    }

}

const loading_all = ref<boolean>(true);
const error_code = ref<number|null>(null);
onMounted(async () => {
    await load_topic();
    await load_lang();
    await load_level();
    
    await load_data();
    loading_all.value = false;
})

///////////////////////////////// Test Case //////////////////////////////////
const selectIndexTestType = ref<number>(0);
const testCases = ref<any>([]);

const addTestCase = () => {
  testCases.value.push({
    inputs: ['','',''],
    answer: '',
    type: 'random',
  });
};

const removeTestCase = (index: number) => {
    testCases.value.splice(index, 1);
    checkTestConut();
};

const addInput = (testCaseIndex: number) => {
  testCases.value[testCaseIndex].inputs.push('');
};

const removeInput = (testCaseIndex: number, inputIndex: number) => {
  testCases.value[testCaseIndex].inputs.splice(inputIndex, 1);
};

const GenerateTestCaseRandom = () => {
   let testData:any[] = [];

   testCases.value.forEach((Case:any) => {
        let inputValue:string[] = [];
        Case.inputs.forEach((inputLine: string) => {
            if (inputLine !== '') {
                inputValue.push(inputLine);
            }
        });

        testData.push({
            input: inputValue.join('\n'),
            answer: Case.answer,
            type: 'random',
        });
   });

   return testData;
};

const GenerateTestCaseByCode = () => {
    let testData:any[] = [];


    if (codeGenOutput.value === '') {
        statusMessage.value = 'กรุณาเขียน Code สำหรับสร้าง Output';
        statusCreate.value = 'warning';
        openModalEnd();
        return;
    }

    let payload_GenOutput = {
        runtime: LangData[selectIndexLangGenOutput.value]['lang'],
        version : LangData[selectIndexLangGenOutput.value]['version'][0],
        input: "",
        code: codeGenOutput.value,
    };

    if (codeGenInput.value === '') {
        testData.push({
        input: "",
        answer: JSON.stringify(payload_GenOutput),
        type: 'code',
        });
        return testData;
    }

    let payload_GenInput = {
        runtime: LangData[selectIndexLangGenInput.value]['lang'],
        version : LangData[selectIndexLangGenInput.value]['version'][0],
        input: "",
        code: codeGenInput.value,
    };

    testData.push({
        input: JSON.stringify(payload_GenInput),
        answer: JSON.stringify(payload_GenOutput),
        type: 'code',
    });

    return testData;
};

const checkTestConut = () => {
    console.log(countTestCases.value);
    if (countTestCases.value > testCases.value.length) {
        if (selectIndexTestType.value === 0) {
            countTestCases.value = testCases.value.length;
        }
    }
};


///////////////////////////////// Code Editor //////////////////////////////////
const selectIndexLangGenInput = ref<number>(0);
const selectIndexLangGenOutput = ref<number>(0);

const codeGenInput = ref<string>('');
const codeGenOutput = ref<string>('');

const EditorMode = ref<string>('vs-light')
onMounted(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        EditorMode.value = "vs-dark";
    }
})
onBeforeMount(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        EditorMode.value = event.matches ? "vs-dark" : "vs-light";
    });
})

// ตรวจสอบว่าเป็นการเปลี่ยน type ของ Test Case หรือไม่ ถ้ามีให้ล้างข้อมูล
watch(() => selectIndexTestType.value, (newValue) => {
    if (newValue === 0) {
        selectIndexLangGenInput.value = 0;
        selectIndexLangGenOutput.value = 0;

        codeGenInput.value = '';
        codeGenOutput.value = '';
    } else {
        testCases.value = [];
        addTestCase();
    }
});

///////////////////////////////// Rich Text Editor //////////////////////////////////

const isLLMChecked = ref<boolean>(false);
const problemName = ref<string>('');
const llmPrompt = ref<string>('');
const countTestCases = ref<number>(1);

const formdata = new FormData();
async function base64ToFile(base64Url: string) {
  try {
    // ตรวจสอบว่า URL เป็น base64 Data URL จริงหรือไม่
    if (!base64Url.startsWith('data:')) {
      throw new Error('URL ที่ให้มาไม่ใช่ base64 Data URL');
    }

    // ใช้ fetch เพื่อแปลง base64 Data URL เป็น Blob
    const response = await fetch(base64Url);
    const blob = await response.blob();

    // ดึง contentType ออกจาก Base64
    let contentType: RegExpMatchArray | null = base64Url.match(/data:(.*?);base64,/);

    if (!contentType) {
      throw new Error('ไม่สามารถระบุ contentType จาก base64 Data URL ได้');
    }

    let FileType = contentType[1];

    // สร้าง mapping ระหว่าง contentType กับนามสกุลไฟล์
    const extensionMapping: { [key: string]: string } = {
      "image/png": "png",
      "image/jpeg": "jpg",
      "image/gif": "gif",
      "image/webp": "webp",
      "image/svg+xml": "svg",
      // เพิ่ม contentType อื่นๆ ที่ต้องการได้ที่นี่
    };

    const extension: string = extensionMapping[FileType] || '';

    const fileName = `${uuidv7()}.${extension}`;

    // สร้าง File object จาก Blob และตั้งชื่อไฟล์
    const file = new File([blob], fileName, { type: blob.type });

    formdata.append('image_description', file, fileName);


    return fileName;
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
  }
}

const DiscriptionnewImage = ref<string[]>([]);
async function processNodeHasImage(node: any) {
  if (node.type === 'image' && node.attrs.src.startsWith('data:image/')) {
    let fileName = await base64ToFile(node.attrs.src);
    node.attrs.src = fileName;
    if (fileName){
        DiscriptionnewImage.value.push(fileName);
    }
    
  } else if (node.type === 'image' && node.attrs.src.startsWith('http')) {
    let remove_url = node.attrs.src.replace('https://pub-3d57d68059384f598b7ac0875ccf93db.r2.dev/question/', '');
    node.attrs.src = remove_url;
    if (remove_url){
        DiscriptionnewImage.value.push(remove_url);
    }
  }

  if (node.content) {
    // วนซ้ำไปใน content ที่ซ้อนอยู่
    for (const childNode of node.content) {
      await processNodeHasImage(childNode);
    }
  }
}

const textEditor = ref<any>(null);
const imageRemove = ref<string[]>([]);
async function getDescirption() {

    const datas = textEditor.value?.getJSON();
    await processNodeHasImage(datas);

    //เปรียบเทียบระหว่างรูปที่มีก่อนอยู่ก่อน
    DiscriptionListImage.value.forEach((element: string) => {
        if (!DiscriptionnewImage.value.includes(element)) {
            imageRemove.value.push(element);
        }
    });


    console.log(datas);

  return datas;
}

/////////////////////////////////// End Model ///////////////////////////////////

const modelEnd = ref<boolean>(false);


const openModalEnd = () => {
    modelEnd.value = true;
}

//////////////////////////////////// Save Question ////////////////////////////////////
const statusCreate = ref<string>('');
const statusMessage = ref<string>('');
const linkToEdit = ref<string>('');


const { deepEqualObject } = useDeepEqualObject() 

async function send() {

    let has_update:boolean = false;

    if (!textEditor.value) return;

    if (!problemName.value) {
        alert("กรุณากรอกชื่อ");
        return;
    }

    if (status.value != 'authenticated') return;

    const user_session: any = data.value;

    if (questionData.value.name !== problemName.value) {
        console.log('name');
        has_update = true;
        formdata.append('name', problemName.value);
    }
    const description = await getDescirption();
    if (!deepEqualObject(await questionData.value.description, description)) {
        console.log('description', description);
        console.log('description old', questionData.value.description);
        has_update = true;
        formdata.append('description', JSON.stringify(description));
    }

    if (imageRemove.value.length > 0 && deepEqualObject(questionData.value.description, description)) {
        console.log('del_image_des');
        has_update = true;
        formdata.append('del_image_des', imageRemove.value.join(','));
    }

    if (selectIndexTopic.value !== 0 ) {
        if (questionData.value.selectIndexTopic !== selectIndexTopic.value) {
            console.log('topic_id');
            has_update = true;
            formdata.append('topic_id', TopicData.value[selectIndexTopic.value - 1]['id']);
        }
    }

    if (selectIndexLevel.value !== 0) {
        if (questionData.value.selectIndexLevel !== selectIndexLevel.value) {
            console.log('level_id');
            has_update = true;
            formdata.append('level_id', LevelData.value[selectIndexLevel.value - 1]['id']);
        }
    }

    if (isLLMChecked.value) {
        if (questionData.value.llm_prompt !== llmPrompt.value) {
            console.log('llm_prompt');
            has_update = true;
            formdata.append('llm_prompt', llmPrompt.value);
        }
    }else{
        if (questionData.value.llm_prompt !== '') {
            console.log('llm_prompt del');
            has_update = true;
            formdata.append('llm_prompt', '');
        }
    }


    if (questionData.value.test_count !== countTestCases.value) {
        console.log('testcase count');
        has_update = true;
        formdata.append('test_count', countTestCases.value.toString());
    }

    if (selectIndexTestType.value === 0) {
        if (JSON.stringify(questionData.value.testcase) !== JSON.stringify(testCases.value)) {
            console.log('testcase random');
            has_update = true;

            formdata.append('test_type', 'random');
            formdata.append('testcase', JSON.stringify(GenerateTestCaseRandom()));
        }
    } else {
        if (questionData.value.selectIndexLangGenInput !== selectIndexLangGenInput.value) {
            console.log('testcase code');
            has_update = true;

            formdata.append('test_type', 'code');
            formdata.append('testcase', JSON.stringify(GenerateTestCaseByCode()));
        } else if (codeGenInput.value !== questionData.value.codeGenInput) {
            console.log('testcase code 2');
            has_update = true;

            formdata.append('test_type', 'code');
            formdata.append('testcase', JSON.stringify(GenerateTestCaseByCode()));
        }

        if (questionData.value.selectIndexLangGenOutput !== selectIndexLangGenOutput.value) {
            console.log('testcase code 3');
            has_update = true;

            formdata.append('test_type', 'code');
            formdata.append('testcase', JSON.stringify(GenerateTestCaseByCode()));
        } else if (codeGenOutput.value !== questionData.value.codeGenOutput) {
            console.log('testcase code 4');
            has_update = true;

            formdata.append('test_type', 'code');
            formdata.append('testcase', JSON.stringify(GenerateTestCaseByCode()));
        }
    }

    if (!has_update) {
        statusCreate.value = 'warning';
        statusMessage.value = 'ไม่มีการแก้ไขข้อมูล';
        linkToEdit.value = '';
        openModalEnd();
        return;
    }

    const config = useRuntimeConfig();
    const res = await fetch(config.public.backendApi+'/question/data/'+route.params.id, {
        method: 'PATCH',
        headers: {
            "Authorization": "Bearer "+user_session.sessionToken,
        },
        body: formdata,
    });

    if (!res.ok) {
        statusCreate.value = 'error';
        statusMessage.value = 'เกิดข้อผิดพลาดในการแก้ไขโจทย์';
        linkToEdit.value = '';
        openModalEnd();
        return;
    }
    const datas = await res.json();

    if (datas.success === true) {
        statusCreate.value = 'success';
        statusMessage.value = 'แก้ไขโจทย์ สำเร็จ';
        linkToEdit.value = '/dashboard/question/'+route.params.id;
        openModalEnd();
    } else {
        statusCreate.value = 'error';
        statusMessage.value = 'เกิดข้อผิดพลาดในการแก้ไขโจทย์';
        linkToEdit.value = '';
        openModalEnd();
    }

}

/////////////////////////////////// Delete Question ///////////////////////////////////
const modelCofirmDelete = ref<boolean>(false);
const showConfirm = ref<boolean>(false);

const loading_delete = ref<boolean>(false);


const {open_modal, close_modal} = useModalControl()


const openModalDelete = () => {
    modelCofirmDelete.value = true;
    showConfirm.value = true;
    open_modal();
}

const closeModalDelete = () => {
    showConfirm.value = false;
    loading_delete.value = false;
    setTimeout(() => {
        modelCofirmDelete.value = false;
    }, 300);
    close_modal();
}

async function DeleteTopicById() {
    const user_session: any = data.value;
    const config = useRuntimeConfig();

    loading_delete.value = true;
    const res = await fetch(config.public.backendApi+'/question/data/'+route.params.id, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer "+user_session.sessionToken,
        },
    });

    if (res.status !== 200) {
        statusCreate.value = 'error';
        statusMessage.value = 'เกิดข้อผิดพลาดในการลบโจทย์';
        
        loading_delete.value = false;

        openModalEnd();
        return;
    }

    if (res.status === 200) {
        closeModalDelete();
        setTimeout(() => {
            statusCreate.value = 'success';
            statusMessage.value = 'ลบโจทย์ สำเร็จ';
            linkToEdit.value = '/dashboard/collection';
            openModalEnd();
        }, 300);
    }

    loading_delete.value = false;
}   

</script>
<style>
/* CSS เพื่อลบกรอบสีฟ้า */
.monaco-editor {
  --vscode-focusBorder: transparent !important;
}


.monaco-editor {
    --vscode-editor-background: #FBFBFB !important;
    --vscode-editorGutter-background: #FBFBFB !important;
    --vscode-editorLineNumber-activeForeground: #000000 !important;
}

@media (prefers-color-scheme: dark) {
    .monaco-editor {
        --vscode-editor-background: #2E2E2E !important;
        --vscode-editorGutter-background: #2f2e2e !important;
        --vscode-editorLineNumber-activeForeground: #FFFFFF !important;
    }
}

</style>